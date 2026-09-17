import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 1. Criar usuário admin
  // Senha nunca no repo (é público). Sem SEED_ADMIN_PASS, gera uma aleatória
  // descartável — o admin existe, mas ninguém loga com senha conhecida.
  const adminPassword = await hash(process.env.SEED_ADMIN_PASS ?? crypto.randomUUID(), 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@codezen.dev' },
    update: {},
    create: {
      email: 'admin@codezen.dev',
      name: 'Admin Code.Zen',
      passwordHash: adminPassword,
      isPaid: true,
      paidAt: new Date(),
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // 2. Criar curso Dev Fullstack
  const course = await prisma.course.upsert({
    where: { slug: 'dev-fullstack' },
    update: {},
    create: {
      title: 'Dev Fullstack',
      slug: 'dev-fullstack',
      description: 'Do zero ao avançado — trilha completa pra virar dev fullstack de verdade.',
      totalHours: 750,
      published: true,
    },
  })
  console.log('✅ Course created:', course.title)

  // 3. Criar módulos e aulas
  const modulesData = [
    {
      order: 1,
      title: 'JavaScript Basics',
      slug: 'js-basics',
      description: 'Variáveis, tipos, operadores, funções e controle de fluxo',
      xpReward: 100,
      lessons: [
        { order: 1, title: 'Variáveis e Tipos', slug: 'variaveis-tipos', type: 'THEORY', durationMin: 15, xpReward: 15, content: '# Variáveis e Tipos em JavaScript\n\n## let, const e var\n\n`let` permite reatribuição, `const` não. `var` é legado.\n\n```javascript\nlet nome = "João"\nconst PI = 3.14\nvar antigo = true // evite\n```\n\n## Tipos Primitivos\n- **string**: "texto"\n- **number**: 42, 3.14\n- **boolean**: true, false\n- **null**: valor ausente\n- **undefined**: não definido\n- **symbol**: identificador único\n- **bigint**: números grandes\n\n## Exercício\nCrie uma variável `idade` com valor 25 e imprima no console.' },
        { order: 2, title: 'Operadores e Expressões', slug: 'operadores', type: 'THEORY', durationMin: 15, xpReward: 15, content: '# Operadores\n\n## Aritméticos\n`+`, `-`, `*`, `/`, `%`, `**`\n\n## Comparação\n`==` (igualdade loose), `===` (igualdadeade estrita), `!=`, `!==`, `>`, `<`\n\n## Lógicos\n`&&` (AND), `||` (OR), `!` (NOT)\n\n> Use sempre `===` em vez de `==`!' },
        { order: 3, title: 'Condicionais e Loops', slug: 'condicionais-loops', type: 'PRACTICE', durationMin: 20, xpReward: 15, content: '# Condicionais e Loops\n\n## if/else\n```javascript\nif (idade >= 18) {\n  console.log("Maior")\n} else {\n  console.log("Menor")\n}\n```\n\n## switch\n```javascript\nswitch(dia) {\n  case "seg": console.log("Segunda")\n  break\n  default: console.log("Outro")\n}\n```\n\n## for, while, do/while\n```javascript\nfor (let i = 0; i < 5; i++) { ... }\nwhile (condicao) { ... }\n```\n\n## for...of e for...in\n```javascript\nconst arr = [1,2,3]\nfor (const item of arr) { ... }\n```' },
        { order: 4, title: 'Funções e Escopo', slug: 'funcoes-escopo', type: 'THEORY', durationMin: 20, xpReward: 15, content: '# Funções e Escopo\n\n## Declaração\n```javascript\nfunction somar(a, b) { return a + b }\nconst somar2 = (a, b) => a + b\n```\n\n## Escopo\n- **Global**: acessível em todo lugar\n- **Local/Função**: só dentro da função\n- **Bloco**: só dentro de `{ }` (let/const)\n\n## Hoisting\nFunções declaradas com `function` são "movidas" pro topo.' },
        { order: 5, title: 'Exercícios Práticos', slug: 'exercicios-js', type: 'EXERCISE', durationMin: 30, xpReward: 20, content: '# Exercícios Práticos\n\n1. Crie uma função que receba um array e retorne a soma\n2. Crie uma função que verifique se um número é par\n3. Crie uma função que receba uma string e retorne ao contrário' },
        { order: 6, title: 'Quiz — JS Basics', slug: 'quiz-js-basics', type: 'CHALLENGE', durationMin: 10, xpReward: 25, content: '# Quiz: JavaScript Basics\n\nTeste seus conhecimentos sobre variáveis, tipos, operadores e funções.' },
      ],
    },
    {
      order: 2,
      title: 'HTML & CSS Basics',
      slug: 'html-css',
      description: 'Estrutura HTML, semântica, CSS Box Model, Flexbox e Grid',
      xpReward: 100,
      lessons: [
        { order: 1, title: 'Estrutura HTML', slug: 'estrutura-html', type: 'THEORY', durationMin: 15, xpReward: 15, content: '# Estrutura HTML\n\n```html\n<!DOCTYPE html>\n<html lang="pt-BR">\n<head>\n  <meta charset="UTF-8">\n  <title>Minha Página</title>\n</head>\n<body>\n  <h1>Olá!</h1>\n</body>\n</html>\n```\n\n## Tags Essenciais\n- `<header>`, `<nav>`, `<main>`, `<footer>`\n- `<section>`, `<article>`, `<aside>`\n- `<h1>` a `<h6>`\n- `<p>`, `<a>`, `<img>`' },
        { order: 2, title: 'Semântica e Acessibilidade', slug: 'semantica', type: 'THEORY', durationMin: 15, xpReward: 15, content: '# Semântica\n\nUse tags semânticas em vez de `<div>` para tudo:\n\n- `<nav>` — navegação\n- `<main>` — conteúdo principal\n- `<article>` — conteúdo independente\n- `<section>` — seção temática\n- `<aside>` — conteúdo complementar' },
        { order: 3, title: 'CSS Box Model', slug: 'box-model', type: 'THEORY', durationMin: 15, xpReward: 15, content: '# CSS Box Model\n\nTodo elemento tem:\n- **content**: o conteúdo\n- **padding**: espaço interno\n- **border**: borda\n- **margin**: espaço externo\n\n```css\n.box {\n  box-sizing: border-box;\n  padding: 20px;\n  border: 1px solid #ccc;\n  margin: 10px;\n}\n```' },
        { order: 4, title: 'Flexbox na Prática', slug: 'flexbox', type: 'PRACTICE', durationMin: 20, xpReward: 15, content: '# Flexbox\n\n```css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 10px;\n}\n```\n\n## Propriedades principais\n- `justify-content`: eixo principal\n- `align-items`: eixo cruzado\n- `flex-wrap`: quebra de linha\n- `flex-direction`: row/column' },
        { order: 5, title: 'Grid Layout', slug: 'grid', type: 'PRACTICE', durationMin: 20, xpReward: 15, content: '# CSS Grid\n\n```css\n.grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 20px;\n}\n```\n\n## Quando usar Grid vs Flexbox\n- **Grid**: layouts 2D\n- **Flexbox**: layouts 1D' },
        { order: 6, title: 'Projeto: Landing Page', slug: 'projeto-landing', type: 'EXERCISE', durationMin: 45, xpReward: 30, content: '# Projeto: Landing Page\n\nCrie uma landing page responsiva com:\n- Header com nav\n- Hero section\n- Features section\n- Footer\n\nUse Flexbox e Grid.' },
      ],
    },
    {
      order: 3,
      title: 'Git & GitHub',
      slug: 'git-github',
      description: 'Versionamento, branches, merge, rebase e colaboração',
      xpReward: 100,
      lessons: [
        { order: 1, title: 'Por que Git?', slug: 'por-que-git', type: 'THEORY', durationMin: 10, xpReward: 10, content: '# Por que Git?\n\n- Versionamento de código\n- Colaboração em equipe\n- Histórico completo\n- Branching seguro' },
        { order: 2, title: 'Comandos Essenciais', slug: 'comandos-git', type: 'DEMONSTRATION', durationMin: 20, xpReward: 15, content: '# Comandos Git\n\n```bash\ngit init\ngit add .\ngit commit -m "msg"\ngit status\ngit log --oneline\ngit diff\n```' },
        { order: 3, title: 'Branches e Merge', slug: 'branches-merge', type: 'THEORY', durationMin: 15, xpReward: 15, content: '# Branches\n\n```bash\ngit branch feature\ngit checkout feature\ngit checkout -b feature\ngit merge feature\n```' },
        { order: 4, title: 'GitHub e Pull Requests', slug: 'github-pr', type: 'PRACTICE', durationMin: 25, xpReward: 20, content: '# GitHub\n\n1. Criar repo no GitHub\n2. Conectar: `git remote add origin URL`\n3. Push: `git push -u origin main`\n4. Criar Pull Request' },
        { order: 5, title: 'Exercício: Primeiro Repo', slug: 'exercicio-repo', type: 'EXERCISE', durationMin: 30, xpReward: 20, content: '# Exercício\n\n1. Crie um repo no GitHub\n2. Faça o push do seu código\n3. Crie uma branch e um PR' },
      ],
    },
    {
      order: 4,
      title: 'JavaScript Advanced',
      slug: 'js-advanced',
      description: 'Async/Await, Promises, DOM, Events, Closures e Prototypes',
      xpReward: 150,
      lessons: [
        { order: 1, title: 'DOM e Seleção', slug: 'dom-selecao', type: 'THEORY', durationMin: 15, xpReward: 15, content: '# DOM\n\n```javascript\ndocument.querySelector(".btn")\ndocument.getElementById("app")\ndocument.querySelectorAll("p")\n```' },
        { order: 2, title: 'Events e Listeners', slug: 'events', type: 'PRACTICE', durationMin: 20, xpReward: 15, content: '# Events\n\n```javascript\nbtn.addEventListener("click", (e) => {\n  console.log(e.target)\n})\n```' },
        { order: 3, title: 'Promises e Async/Await', slug: 'promises-async', type: 'THEORY', durationMin: 25, xpReward: 20, content: '# Promises\n\n```javascript\nconst promise = fetch("/api")\npromise.then(res => res.json())\npromise.catch(err => console.error(err))\n\n// Async/Await\nconst res = await fetch("/api")\nconst data = await res.json()\n```' },
        { order: 4, title: 'Closures e Hoisting', slug: 'closures', type: 'THEORY', durationMin: 20, xpReward: 15, content: '# Closures\n\nUma função que "lembra" do escopo onde foi criada.\n\n```javascript\nfunction counter() {\n  let count = 0\n  return () => ++count\n}\n```' },
        { order: 5, title: 'Debugging no Browser', slug: 'debugging', type: 'DEBUG_CHALLENGE', durationMin: 25, xpReward: 20, content: '# Debugging\n\n- `console.log()`, `console.table()`, `console.dir()`\n- Breakpoints no DevTools\n- `debugger` statement' },
        { order: 6, title: 'Reading Code', slug: 'reading-code', type: 'READING', durationMin: 20, xpReward: 15, content: '# Reading Code\n\nPratique ler código de outros desenvolvedores no GitHub.' },
        { order: 7, title: 'Exercícios Async', slug: 'exercicios-async', type: 'EXERCISE', durationMin: 40, xpReward: 25, content: '# Exercícios Async\n\n1. Crie uma função que busque dados de uma API\n2. Trate erros com try/catch\n3. Use Promise.all para múltiplas requisições' },
        { order: 8, title: 'Quiz — JS Advanced', slug: 'quiz-js-advanced', type: 'CHALLENGE', durationMin: 15, xpReward: 30, content: '# Quiz: JavaScript Advanced' },
      ],
    },
    {
      order: 5,
      title: 'Node.js Fundamentals',
      slug: 'nodejs',
      description: 'Runtime, módulos, npm, Express e APIs REST',
      xpReward: 150,
      lessons: [
        { order: 1, title: 'O que é Node.js?', slug: 'o-que-e-node', type: 'THEORY', durationMin: 10, xpReward: 10, content: '# Node.js\n\nRuntime JavaScript no servidor.\n- Event-driven\n- Non-blocking I/O\n- npm (package manager)' },
        { order: 2, title: 'Módulos e npm', slug: 'modulos-npm', type: 'THEORY', durationMin: 15, xpReward: 15, content: '# Módulos\n\n```javascript\nconst fs = require("fs")\nimport fs from "fs"\n```\n\n## npm\n```bash\nnpm init\nnpm install express\n```' },
        { order: 3, title: 'Express na Prática', slug: 'express', type: 'DEMONSTRATION', durationMin: 25, xpReward: 20, content: '# Express\n\n```javascript\nimport express from "express"\nconst app = express()\n\napp.get("/", (req, res) => {\n  res.json({ msg: "Hello" })\n})\n\napp.listen(3000)\n```' },
        { order: 4, title: 'REST API Completa', slug: 'rest-api', type: 'PRACTICE', durationMin: 40, xpReward: 25, content: '# REST API\n\n- GET /api/users\n- POST /api/users\n- PUT /api/users/:id\n- DELETE /api/users/:id' },
        { order: 5, title: 'Middleware e Erros', slug: 'middleware-erros', type: 'THEORY', durationMin: 20, xpReward: 15, content: '# Middleware\n\n```javascript\napp.use((req, res, next) => {\n  console.log(req.method)\n  next()\n})\n```\n\n## Error handling\n```javascript\napp.use((err, req, res, next) => {\n  res.status(500).json({ error: err.message })\n})\n```' },
        { order: 6, title: 'Projeto: API de Tarefas', slug: 'projeto-api', type: 'EXERCISE', durationMin: 60, xpReward: 35, content: '# Projeto: API de Tarefas\n\nCrie uma API REST com CRUD de tarefas usando Express e SQLite.' },
        { order: 7, title: 'Testando sua API', slug: 'testando-api', type: 'EXERCISE', durationMin: 30, xpReward: 20, content: '# Testando sua API\n\nUse Thunder Client (VS Code) ou curl para testar seus endpoints.' },
      ],
    },
  ]

  for (const modData of modulesData) {
    const { lessons, ...moduleFields } = modData
    
    const module = await prisma.module.upsert({
      where: { courseId_slug: { courseId: course.id, slug: modData.slug } },
      update: {},
      create: {
        courseId: course.id,
        ...moduleFields,
        published: true,
      },
    })
    console.log(`  ✅ Module ${module.order}: ${module.title}`)

    for (const lessonData of lessons) {
      await prisma.lesson.upsert({
        where: { moduleId_slug: { moduleId: module.id, slug: lessonData.slug } },
        update: {},
        create: {
          moduleId: module.id,
          ...lessonData,
          published: true,
        },
      })
    }
    console.log(`    → ${lessons.length} lessons created`)
  }

  // 4. Criar matrícula do admin no curso
  await prisma.enrollment.upsert({
    where: { userId_courseId: { userId: admin.id, courseId: course.id } },
    update: {},
    create: {
      userId: admin.id,
      courseId: course.id,
      active: true,
    },
  })
  console.log('✅ Admin enrolled in course')

  console.log('\n🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
