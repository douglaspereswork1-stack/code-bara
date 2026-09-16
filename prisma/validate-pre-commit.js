#!/usr/bin/env node

/**
 * Pré-commit validator
 * Roda: node prisma/validate-pre-commit.js
 * 
 * Verifica:
 * 1. Arquivos de debug não foram staged
 * 2. Quiz JSON está válido
 * 3. Nenhum secret foi commitado
 */

const { execSync } = require('child_process')
const { readFileSync, existsSync } = require('fs')
const { join } = require('path')

const ROOT = join(__dirname, '..')
const errors = []
const warnings = []

// 1. Check for debug files in staging
try {
  const staged = execSync('git diff --cached --name-only', { cwd: ROOT, encoding: 'utf-8' })
  const debugPatterns = [/prisma\/check-/, /prisma\/debug-/, /prisma\/test-/]
  const debugFiles = staged.split('\n').filter(f => debugPatterns.some(p => p.test(f)))
  if (debugFiles.length > 0) {
    errors.push(`Arquivos de debug staged: ${debugFiles.join(', ')}\n  → Remova com: git reset HEAD <arquivo>`)
  }
} catch { /* not in git repo */ }

// 2. Validate quiz JSON
const quizPath = join(__dirname, 'data', 'quizzes.json')
if (existsSync(quizPath)) {
  try {
    const raw = readFileSync(quizPath, 'utf-8')
    const quizzes = JSON.parse(raw)
    
    for (const quiz of quizzes) {
      if (!quiz.moduleSlug) errors.push('Quiz sem moduleSlug')
      if (!quiz.title) errors.push('Quiz sem title')
      
      quiz.questions?.forEach((q, i) => {
        if (!q.question) errors.push(`Pergunta ${i + 1} em ${quiz.moduleSlug}: sem question`)
        const correctCount = q.options?.filter(o => o.correct).length ?? 0
        if (correctCount !== 1) errors.push(`Pergunta ${i + 1} em ${quiz.moduleSlug}: ${correctCount} respostas corretas (deve ser 1)`)
        if (!q.explanation) warnings.push(`Pergunta ${i + 1} em ${quiz.moduleSlug}: sem explanation`)
      })
    }
  } catch (e) {
    errors.push(`Erro ao ler quizzes.json: ${e.message}`)
  }
}

// 3. Check for secrets in staged files
try {
  const staged = execSync('git diff --cached --name-only', { cwd: ROOT, encoding: 'utf-8' })
  const secretPatterns = [
    /DATABASE_URL/,
    /NEXTAUTH_SECRET/,
    /OPENAI_API_KEY/,
    /sk-[a-zA-Z0-9]{20,}/,
    /ghp_[a-zA-Z0-9]{36}/,
  ]
  
  for (const file of staged.split('\n')) {
    if (!file.endsWith('.ts') && !file.endsWith('.tsx') && !file.endsWith('.js')) continue
    try {
      const content = execSync(`git show :${file}`, { cwd: ROOT, encoding: 'utf-8' })
      for (const pattern of secretPatterns) {
        if (pattern.test(content)) {
          errors.push(`Possível secret em ${file}: ${pattern.source}`)
        }
      }
    } catch { /* file not found in staging */ }
  }
} catch { /* not in git repo */ }

// Report
if (warnings.length > 0) {
  console.log('\n⚠️  Warnings:')
  warnings.forEach(w => console.log(`  - ${w}`))
}

if (errors.length > 0) {
  console.log('\n❌ Erros encontrados:')
  errors.forEach(e => console.log(`  - ${e}`))
  console.log('\n❌ Commit bloqueado. Corrija os erros acima.')
  process.exit(1)
}

console.log('✅ Validação pré-commit OK')
process.exit(0)
