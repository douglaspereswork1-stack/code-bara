'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Zap, Play } from 'lucide-react'

type LessonData = {
  id: string
  title: string
  type: string
  content: string
  durationMin: number
  xpReward: number
  nextLessonId: string | null
  prevLessonId: string | null
  exercises?: { id: string; title: string; starterCode: string }[]
}

// Mock lesson data — in production, fetch from DB
const LESSON: LessonData = {
  id: 'l1',
  title: 'Variáveis e Tipos em JavaScript',
  type: 'THEORY',
  durationMin: 15,
  xpReward: 15,
  nextLessonId: 'l2',
  prevLessonId: null,
  content: `
# Variáveis e Tipos em JavaScript

## O que são variáveis?

Variáveis são **containers** para armazenar dados. Em JavaScript, existem três formas de declarar variáveis:

### \`var\` (evitar)
\`\`\`javascript
var nome = "João"   // escopo de função (hoisting)
var idade = 25
\`\`\`

### \`let\` (recomendado para reatribuição)
\`\`\`javascript
let nome = "João"   // escopo de bloco
nome = "Maria"      // pode reatribuir
\`\`\`

### \`const\` (recomendado por padrão)
\`\`\`javascript
const PI = 3.14159  // escopo de bloco
// PI = 3.14        // ERRO: não pode reatribuir
\`\`\`

## Tipos de Dados

JavaScript tem 8 tipos de dados:

| Tipo | Exemplo | Descrição |
|------|---------|-----------|
| \`string\` | \`"Olá"\` | Texto |
| \`number\` | \`42\`, \`3.14\` | Números |
| \`boolean\` | \`true\`, \`false\` | Verdadeiro/Falso |
| \`null\` | \`null\` | Valor ausente intencional |
| \`undefined\` | \`undefined\` | Valor não definido |
| \`object\` | \`{ nome: "Jo" }\` | Coleção de pares chave-valor |
| \`symbol\` | \`Symbol("id")\` | Identificador único |
| \`bigint\` | \`9007199254740991n\` | Inteiros grandes |

## Exemplo Prático

\`\`\`javascript
// Tipos primitivos
const nome = "Ana"           // string
const idade = 28             // number
const estudante = true       // boolean
const salario = null         // null
const telefone = undefined   // undefined

// Objeto
const pessoa = {
  nome: "Ana",
  idade: 28,
  estudante: true
}

// Array (é um objeto)
const notas = [9.5, 8.0, 7.5]

// Verificando tipos
console.log(typeof nome)        // "string"
console.log(typeof idade)       // "number"
console.log(typeof estudante)   // "boolean"
console.log(typeof pessoa)      // "object"
\`\`\`

## ⚠️ Cuidados Comuns

\`\`\`javascript
// Comparação solta (NÃO usar)
"5" == 5        // true (converte tipos)
"5" === 5       // false (comparação estrita) ✓

// NaN não é igual a si mesmo
NaN === NaN     // false
Number.isNaN(NaN) // true ✓

// null e undefined
null == undefined   // true
null === undefined  // false
\`\`\`

## 🎯 Resumo

- Use \`const\` por padrão, \`let\` quando precisar reatribuir
- Nunca use \`var\` em código novo
- Prefira \`===\` ao invés de \`==\`
- Cuidado com \`typeof\` para arrays e null
`,
}

export default function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const [completed, setCompleted] = useState(false)

  // In production, fetch lesson by params.id
  const lesson = LESSON

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/curso/dev-fullstack"
          className="p-2 rounded-lg hover:bg-secondary transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {lesson.durationMin} min
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-4 h-4" /> +{lesson.xpReward} XP
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none">
        <div
          className="text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }}
        />
      </div>

      {/* Mark complete */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-3">
          <CheckCircle className={`w-5 h-5 ${completed ? 'text-success' : 'text-muted-foreground'}`} />
          <span className="text-sm font-medium">
            {completed ? 'Aula concluída!' : 'Marcar como concluída'}
          </span>
        </div>
        <button
          onClick={() => setCompleted(!completed)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
            completed
              ? 'bg-success/10 text-success border border-success/20'
              : 'bg-primary text-white hover:bg-primary/90'
          }`}
        >
          {completed ? '✓ Concluída' : 'Concluir Aula'}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        {lesson.prevLessonId ? (
          <Link
            href={`/aula/${lesson.prevLessonId}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-secondary transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Aula Anterior
          </Link>
        ) : (
          <div />
        )}
        {lesson.nextLessonId ? (
          <Link
            href={`/aula/${lesson.nextLessonId}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition"
          >
            Próxima Aula
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href="/curso/dev-fullstack"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success text-white hover:bg-success/90 transition"
          >
            Módulo Concluído 🎉
          </Link>
        )}
      </div>
    </div>
  )
}

function renderMarkdown(md: string): string {
  // Simple markdown → HTML for demo. In production use remark/rehype.
  return md
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-secondary px-1.5 py-0.5 rounded text-sm">$1</code>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\| (.+) \|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(c => c.trim())
      return '<tr>' + cells.map(c => `<td class="px-3 py-1 border border-border">${c}</td>`).join('') + '</tr>'
    })
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '<br/><br/>')
}
