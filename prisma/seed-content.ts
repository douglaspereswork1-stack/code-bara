import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function L(order: number, title: string, slug: string, type: string, durationMin: number, xpReward: number, content: string) {
  return { order, title, slug, type: type as any, durationMin, xpReward, content, published: true }
}

const JS_REACT = [
  L(1, "O que e React?", "o-que-e-react", "THEORY", 15, 15,
    "# O que e React?\n\nReact e uma biblioteca JavaScript para criar interfaces de usuario, criada pelo Facebook (Meta).\n\n## Por que React?\n- Componentizacao: UI dividida em pedacos reutilizaveis\n- Virtual DOM: atualizacoes rapidas e eficientes\n- Ecossistema enorme: milhares de bibliotecas\n- Mercado: mais pedida no mercado de trabalho\n\n## Conceitos-Chave\n- JSX: HTML dentro do JavaScript\n- Componentes: funcoes que retornam JSX\n- Props: dados passados de pai pra filho\n- State: dados internos do componente\n\n## Hello World\n```jsx\nfunction App() {\n  return <h1>Ola, Mundo!</h1>\n}\n```"),
  L(2, "Componentes e JSX", "componentes-jsx", "THEORY", 20, 15,
    "# Componentes e JSX\n\n## JSX\n```jsx\nconst nome = \"Ana\"\nconst element = <h1>Ola, {nome}!</h1>\n```\n\n## Componente Funcao\n```jsx\nfunction Saudacao({ nome }) {\n  return <h1>Ola, {nome}!</h1>\n}\n<Saudacao nome=\"Joao\" />\n```\n\n## Componente com Filhos\n```jsx\nfunction Card({ titulo, children }) {\n  return (\n    <div className=\"card\">\n      <h2>{titulo}</h2>\n      {children}\n    </div>\n  )\n}\n```\n\n## Regras JSX\n- Retornar apenas um elemento pai\n- Usar className em vez de class\n- Fechar tags auto-fechantantes"),
  L(3, "Props e Estado (State)", "props-state", "THEORY", 25, 20,
    "# Props e Estado\n\n## Props\nDados passados de pai para filho:\n```jsx\nfunction Usuario({ nome, email }) {\n  return <div><h2>{nome}</h2><p>{email}</p></div>\n}\n<Usuario nome=\"Ana\" email=\"ana@email.com\" />\n```\n\n## State (useState)\n```jsx\nimport { useState } from 'react'\n\nfunction Contador() {\n  const [count, setCount] = useState(0)\n  return (\n    <div>\n      <p>Voce clicou {count} vezes</p>\n      <button onClick={() => setCount(count + 1)}>Clique</button>\n    </div>\n  )\n}\n```\n\n## Regras\n- Props sao somente leitura\n- State e privado do componente\n- Sempre use useState para dados que mudam"),
  L(4, "useEffect e Ciclo de Vida", "useeffect", "THEORY", 25, 20,
    "# useEffect\n\nuseEffect executa efeitos colaterais:\n```jsx\nimport { useState, useEffect } from 'react'\n\nfunction Timer() {\n  const [segundos, setSegundos] = useState(0)\n  useEffect(() => {\n    const interval = setInterval(() => {\n      setSegundos(s => s + 1)\n    }, 1000)\n    return () => clearInterval(interval)\n  }, [])\n  return <p>Tempo: {segundos}s</p>\n}\n```\n\n## Dependencias\n```jsx\nuseEffect(() => {\n  fetch(`/api/users/${id}`).then(r => r.json()).then(d => setUsuario(d))\n}, [id])\n```\n\n## Quando usar\n- Fetch de dados\n- Subscriptions\n- Timers e intervals"),
  L(5, "Rotas com Next.js", "rotas-nextjs", "PRACTICE", 30, 25,
    "# Rotas com Next.js\n\n## App Router\n```\napp/\n  page.tsx          -> /\n  sobre/page.tsx    -> /sobre\n  cursos/[id]/page.tsx -> /cursos/123\n```\n\n## Navegacao\n```jsx\nimport Link from 'next/link'\nimport { useRouter } from 'next/navigation'\n\n<Link href=\"/sobre\">Sobre</Link>\n<Link href={`/cursos/${id}`}>Ver curso</Link>\n\nconst router = useRouter()\nrouter.push('/dashboard')\n```\n\n## Rotas Dinamicas\n```jsx\nexport default async function CursoPage({ params }) {\n  const { id } = await params\n}\n```"),
  L(6, "Projeto: Mini SPA React", "projeto-spa", "EXERCISE", 45, 35,
    "# Projeto: Mini SPA React\n\n## Objetivo\nCriar uma aplicacao com:\n- Tela de listagem de usuarios\n- Tela de detalhes\n- Navegacao entre telas\n\n## Requisitos\n1. Listar 5 usuarios em cards\n2. Ao clicar, ir pra detalhes\n3. Voltar pra listagem\n4. Usar componentes React\n\n## Dica\n```jsx\nconst usuarios = [\n  { id: 1, nome: 'Ana', email: 'ana@test.com' },\n  { id: 2, nome: 'Joao', email: 'joao@test.com' },\n]\n```"),
  L(7, "Quiz — React", "quiz-react", "CHALLENGE", 15, 30,
    "# Quiz: React & Frontend\n\nTeste seus conhecimentos sobre:\n- JSX e sintaxe\n- Componentes e props\n- useState e useEffect\n- Rotas com Next.js"),
]

const PYTHON = [
  L(1, "Introducao ao Python", "intro-python", "THEORY", 15, 15,
    "# Introducao ao Python\n\nPython e versatil, simples e poderosa.\n\n## Por que Python?\n- Sintaxe limpa e legivel\n- Usado em: web, dados, IA, automacao\n- Grande comunidade\n\n## Seu primeiro programa\n```python\nprint(\"Ola, Mundo!\")\n\nnome = \"Ana\"\nidade = 25\npi = 3.14\nativo = True\n\nprint(f\"Meu nome e {nome}, tenho {idade} anos\")\n```"),
  L(2, "Tipos de Dados e Variaveis", "tipos-dados", "THEORY", 20, 15,
    "# Tipos de Dados\n\n```python\n# String\nnome = \"Ana\"\n\n# Inteiro\nidade = 25\n\n# Float\naltura = 1.75\n\n# Booleano\nativo = True\n\n# None\nresultado = None\n```\n\n## Conversao\n```python\nidade = int(\"25\")\npreco = float(\"19.99\")\n```\n\n## Operadores\n```python\nprint(10 + 3)   # 13\nprint(10 // 3)  # 3\nprint(10 ** 3)  # 1000\nprint(10 > 5)   # True\nprint(True and False)  # False\n```"),
  L(3, "Listas, Tuplas e Dicionarios", "estruturas-dados", "THEORY", 25, 20,
    "# Estruturas de Dados\n\n## Listas\n```python\nfrutas = [\"maca\", \"banana\", \"laranja\"]\nfrutas.append(\"uva\")\nfrutas.remove(\"banana\")\nfor fruta in frutas:\n    print(fruta)\n\nquadrados = [x**2 for x in range(10)]\n```\n\n## Tuplas\n```python\ncoordenadas = (10, 20)\n```\n\n## Dicionarios\n```python\npessoa = {\"nome\": \"Ana\", \"idade\": 25}\nprint(pessoa[\"nome\"])\npessoa[\"email\"] = \"ana@test.com\"\nfor k, v in pessoa.items():\n    print(f\"{k}: {v}\")\n```"),
  L(4, "Funcoes e Modulos", "funcoes-modulos", "THEORY", 20, 15,
    "# Funcoes e Modulos\n\n## Funcoes\n```python\ndef saudacao(nome):\n    return f\"Ola, {nome}!\"\n\ndef potencia(base, exp=2):\n    return base ** exp\n\nprint(potencia(3))      # 9\nprint(potencia(3, 3))   # 27\n```\n\n## Lambda\n```python\nquadrado = lambda x: x ** 2\nusuarios.sort(key=lambda u: u[\"idade\"])\n```\n\n## Imports\n```python\nimport math\nprint(math.pi)\n\nfrom datetime import datetime\nprint(datetime.now())\n```"),
  L(5, "POO em Python", "poo-python", "THEORY", 30, 25,
    "# POO em Python\n\n## Classes\n```python\nclass Animal:\n    def __init__(self, nome, especie):\n        self.nome = nome\n        self.especie = especie\n\n    def falar(self):\n        return f\"{self.nome} faz um som\"\n\ngato = Animal(\"Miau\", \"Gato\")\nprint(gato.falar())\n```\n\n## Heranca\n```python\nclass Cachorro(Animal):\n    def __init__(self, nome, raca):\n        super().__init__(nome, \"Cachorro\")\n        self.raca = raca\n\n    def falar(self):\n        return f\"{self.nome} late: Au au!\"\n```"),
  L(6, "Trabalhando com APIs", "python-apis", "PRACTICE", 30, 25,
    "# APIs com Python\n\n## Requests\n```python\nimport requests\n\nresponse = requests.get(\"https://jsonplaceholder.typicode.com/users\")\nusuarios = response.json()\nfor u in usuarios:\n    print(u[\"name\"])\n```\n\n## POST\n```python\nnovo_post = {\"title\": \"Meu Post\", \"body\": \"Conteudo\", \"userId\": 1}\nresponse = requests.post(\"https://jsonplaceholder.typicode.com/posts\", json=novo_post)\nprint(response.status_code)  # 201\n```\n\n## FastAPI\n```python\nfrom fastapi import FastAPI\napp = FastAPI()\n\n@app.get(\"/\")\ndef root():\n    return {\"message\": \"Ola, API!\"}\n\n@app.get(\"/usuarios/{id}\")\ndef get_usuario(id: int):\n    return {\"id\": id, \"nome\": \"Ana\"}\n```"),
  L(7, "Exercicio: API de Tarefas", "exercicio-api-python", "EXERCISE", 45, 30,
    "# Exercicio: API de Tarefas com FastAPI\n\n## Objetivo\nCriar uma API REST para gerenciar tarefas.\n\n## Endpoints\n- GET /tarefas — listar todas\n- POST /tarefas — criar nova\n- PUT /tarefas/{id} — atualizar\n- DELETE /tarefas/{id} — remover\n\n## Modelo\n```python\n{\"id\": 1, \"titulo\": \"Estudar Python\", \"concluida\": false}\n```\n\n## Dica\nArmazene as tarefas em uma lista."),
  L(8, "Quiz — Python", "quiz-python", "CHALLENGE", 15, 30,
    "# Quiz: Python\n\nTeste seus conhecimentos sobre:\n- Sintaxe e tipos de dados\n- Estruturas de dados\n- Funcoes e modulos\n- POO\n- APIs"),
]

const BANCO_DADOS = [
  L(1, "Introducao a Bancos de Dados", "intro-bd", "THEORY", 15, 15,
    "# Bancos de Dados\n\n## O que e?\nSistema para armazenar, gerenciar e recuperar dados.\n\n## Por que usar?\n- Persistencia de dados\n- Integridade e consistencia\n- Consultas eficientes\n- Seguranca\n\n## Tipos\n- Relacional (SQL): PostgreSQL, MySQL, SQLite\n- NoSQL: MongoDB, Redis\n\n## Modelagem\n- Entidade: algo do mundo real (Usuario)\n- Atributo: propriedade (nome, email)\n- Relacao: como entidades se conectam"),
  L(2, "SQL Basico", "sql-basico", "THEORY", 25, 20,
    "# SQL — Linguagem de Consulta\n\n## Criar tabela\n```sql\nCREATE TABLE usuarios (\n  id SERIAL PRIMARY KEY,\n  nome VARCHAR(100) NOT NULL,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  criado_em TIMESTAMP DEFAULT NOW()\n);\n```\n\n## Inserir\n```sql\nINSERT INTO usuarios (nome, email) VALUES ('Ana', 'ana@email.com');\n```\n\n## Consultar\n```sql\nSELECT * FROM usuarios WHERE nome = 'Ana';\nSELECT * FROM usuarios ORDER BY nome ASC;\nSELECT * FROM usuarios LIMIT 10;\n```\n\n## Atualizar e Deletar\n```sql\nUPDATE usuarios SET nome = 'Ana Maria' WHERE id = 1;\nDELETE FROM usuarios WHERE id = 1;\n```"),
  L(3, "JOINs e Relacionamentos", "joins", "THEORY", 30, 25,
    "# JOINs\n\n## Tipos\n```sql\n-- INNER JOIN\nSELECT u.nome, p.titulo\nFROM usuarios u\nINNER JOIN posts p ON u.id = p.usuario_id;\n\n-- LEFT JOIN\nSELECT u.nome, p.titulo\nFROM usuarios u\nLEFT JOIN posts p ON u.id = p.usuario_id;\n```\n\n## Exemplo\n```sql\nCREATE TABLE cursos (id SERIAL PRIMARY KEY, nome VARCHAR(100));\nCREATE TABLE matriculas (\n  id SERIAL PRIMARY KEY,\n  usuario_id INT REFERENCES usuarios(id),\n  curso_id INT REFERENCES cursos(id)\n);\n\nSELECT c.nome\nFROM cursos c\nINNER JOIN matriculas m ON c.id = m.curso_id\nWHERE m.usuario_id = 1;\n```"),
  L(4, "Prisma ORM", "prisma-orm", "THEORY", 25, 20,
    "# Prisma — ORM para Node.js\n\n## Schema\n```prisma\nmodel User {\n  id    String @id @default(cuid())\n  email String @unique\n  name  String?\n  posts Post[]\n}\n\nmodel Post {\n  id       String @id @default(cuid())\n  title    String\n  author   User   @relation(fields: [authorId], references: [id])\n  authorId String\n}\n```\n\n## Queries\n```javascript\nawait prisma.user.create({ data: { email: 'ana@test.com', name: 'Ana' } })\nawait prisma.user.findUnique({ where: { email: 'ana@test.com' } })\nawait prisma.user.update({ where: { id }, data: { name: 'Ana Maria' } })\nawait prisma.user.delete({ where: { id } })\n```"),
  L(5, "Exercicio: Modelagem e Queries", "exercicio-sql", "EXERCISE", 40, 30,
    "# Exercicio: Modelagem e Queries\n\n## Cenario\nSistema para escola com:\n- Professores\n- Alunos\n- Cursos\n- Matriculas\n\n## Tarefas\n1. Modele as tabelas no Prisma\n2. Crie 5 queries SQL:\n   - Listar alunos de um curso\n   - Contar alunos por curso\n   - Listar cursos de um professor\n   - Buscar alunos por nome\n   - Deletar uma matricula"),
  L(6, "Quiz — Banco de Dados", "quiz-bd", "CHALLENGE", 15, 25,
    "# Quiz: Banco de Dados\n\nTeste seus conhecimentos sobre:\n- Modelagem de dados\n- SQL basico\n- JOINs\n- Prisma ORM"),
]

const DEVOPS = [
  L(1, "Introducao a DevOps", "intro-devops", "THEORY", 15, 15,
    "# DevOps\n\n## O que e?\nCultura que une desenvolvimento e operacoes.\n\n## Principios\n- Automatizacao\n- Integracao Continua\n- Entrega Continua\n- Monitoramento\n\n## Ferramentas\n- Git, GitHub\n- GitHub Actions, GitLab CI\n- Docker\n- Vercel, AWS\n- Grafana, Sentry"),
  L(2, "Docker Basico", "docker-basico", "THEORY", 25, 20,
    "# Docker\n\n## Conceitos\n- Image: template da aplicacao\n- Container: instancia rodando\n- Dockerfile: receita pra criar image\n- Docker Compose: multiplos containers\n\n## Dockerfile\n```dockerfile\nFROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD [\"npm\", \"start\"]\n```\n\n## Comandos\n```bash\ndocker build -t meu-app .\ndocker run -p 3000:3000 meu-app\ndocker ps\ndocker logs <container>\n```"),
  L(3, "CI/CD com GitHub Actions", "ci-cd", "THEORY", 25, 20,
    "# CI/CD\n\n## O que e?\n- CI: builda e testa automaticamente a cada push\n- CD: deploy automatico aprovado\n\n## GitHub Actions\n```yaml\nname: Deploy\non:\n  push:\n    branches: [main]\njobs:\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm install\n      - run: npm test\n      - run: npm run build\n```\n\n## Fluxo\n1. Push -> GitHub Actions\n2. Roda testes\n3. Builda\n4. Deploy automatico"),
  L(4, "Deploy na Vercel", "deploy-vercel", "PRACTICE", 20, 15,
    "# Deploy na Vercel\n\n## Passo a passo\n1. Acesse vercel.com\n2. Conecte seu repo GitHub\n3. Configure env vars\n4. Clique em Deploy\n\n## Env Vars\nConfigure no painel:\n- DATABASE_URL\n- NEXTAUTH_SECRET\n- API keys\n\n## Dominio\nSettings -> Domains -> Adicione seu dominio"),
  L(5, "Exercicio: Deploy Completo", "exercicio-deploy", "EXERCISE", 30, 25,
    "# Exercicio: Deploy Completo\n\n## Objetivo\nDeploy de uma app Next.js na Vercel:\n\n1. Crie repo no GitHub\n2. Conecte na Vercel\n3. Configure env vars\n4. Deploy automatico\n5. Teste em producao\n\n## Bonus\n- Dominio personalizado\n- HTTPS\n- Monitoramento"),
  L(6, "Quiz — DevOps", "quiz-devops", "CHALLENGE", 15, 25,
    "# Quiz: DevOps\n\nTeste seus conhecimentos sobre:\n- Conceitos DevOps\n- Docker\n- CI/CD\n- Deploy na Vercel"),
]

const CARREIRA = [
  L(1, "Montando seu Portfolio", "portfolio", "THEORY", 20, 15,
    "# Portfolio\n\n## O que mostrar\n- 3-5 projetos relevantes\n- Descricao do problema resolvido\n- Tecnologias usadas\n- Link do codigo e deploy\n\n## Estrutura\n```\nNome do Projeto\n  Descricao (1-2 frases)\n  Tecnologias\n  Link deploy\n  Link GitHub\n  Screenshot\n```\n\n## Onde hospedar\n- GitHub Pages\n- Vercel\n- Netlify\n\n## Dicas\n- Codigo limpo e organizado\n- Documente bem\n- Destaque resultados"),
  L(2, "Entrevista Tecnica", "entrevista", "THEORY", 25, 20,
    "# Entrevista Tecnica\n\n## Tipos\n1. Algoritmos: problemas de logica\n2. Sistemas: como projetar solucoes\n3. Comportamentais: experiencia\n\n## Preparacao\n- Revise conceitos basicos\n- Pratique em leetcode/hackerrank\n- Estude seus projetos\n- Prepare perguntas sobre a empresa\n\n## Dicas\n- Pense em voz alta\n- Faca perguntas antes\n- Teste inputs e outputs\n- Nao desista se errar\n\n## Exemplos\n- Ordene 1 milhao de numeros\n- Como faria um sistema de cache?\n- Conte sobre um projeto dificil"),
  L(3, "Comunicacao e Equipe", "comunicacao", "THEORY", 20, 15,
    "# Comunicacao\n\n## Por que importa?\n80% dos problemas sao de comunicacao.\n\n## Habilidades\n- Escuta ativa\n- Feedback util\n- Documentacao\n- Reunioes eficientes\n\n## Ferramentas\n- Slack/Discord: comunicacao\n- Notion/Confluence: docs\n- Jira/Linear: tarefas\n- GitHub: codigo"),
  L(4, "Estudo Continuado", "estudo-continuado", "THEORY", 15, 15,
    "# Estudo Continuado\n\n## Como nao parar\n- 30 minutos por dia\n- Escolha um topic por vez\n- Faca projetos reais\n- Compartilhe o que aprendeu\n\n## Recursos\n- Udemy, Alura, Rocketseat\n- MDN, docs oficial\n- dev.to, stackoverflow\n- roadmap.sh"),
  L(5, "Exercicio: Portfolio Pessoal", "exercicio-portfolio", "EXERCISE", 45, 30,
    "# Exercicio: Portfolio Pessoal\n\n## Objetivo\nCrie uma pagina de portfolio:\n\n1. Header: nome, titulo, links\n2. Sobre: mini-bio\n3. Projetos: 3-5 cards\n4. Contato: formulario\n\n## Tecnologias\nHTML + CSS ou React/Next.js\n\n## Bonus\n- Animacoes\n- Responsivo\n- Publique na Vercel"),
  L(6, "Quiz — Carreira", "quiz-carreira", "CHALLENGE", 10, 20,
    "# Quiz: Carreira\n\nReflexoes sobre:\n- Portfolio\n- Entrevista tecnica\n- Comunicacao\n- Estudo continuado"),
]

const allModules = [
  { order: 6, title: 'React & Frontend Moderno', slug: 'react-frontend', description: 'Componentes, hooks, estado, rotas e aplicações React completas', xpReward: 200, lessons: JS_REACT },
  { order: 7, title: 'Python Fundamentals', slug: 'python', description: 'Sintaxe, tipos, funcoes, POO, APIs e automacao com Python', xpReward: 200, lessons: PYTHON },
  { order: 8, title: 'Banco de Dados & SQL', slug: 'banco-dados', description: 'Modelagem, SQL, PostgreSQL, Prisma ORM e noSQL', xpReward: 180, lessons: BANCO_DADOS },
  { order: 9, title: 'DevOps & Deploy', slug: 'devops', description: 'Docker, CI/CD, cloud, monitoramento e boas praticas de deploy', xpReward: 180, lessons: DEVOPS },
  { order: 10, title: 'Carreira & Soft Skills', slug: 'carreira', description: 'Portfolio, entrevistas, comunicacao e crescimento na carreira', xpReward: 150, lessons: CARREIRA },
]

async function main() {
  console.log('📚 Adicionando novos módulos...\n')

  const course = await prisma.course.findUnique({ where: { slug: 'dev-fullstack' } })
  if (!course) { console.error('Curso não encontrado'); return }

  for (const modData of allModules) {
    const { lessons, ...moduleFields } = modData

    const existingModule = await prisma.module.findFirst({
      where: { courseId: course.id, slug: modData.slug },
    })

    if (existingModule) {
      console.log(`⚠️  Modulo "${modData.title}" ja existe, pulando...`)
      continue
    }

    const module = await prisma.module.create({
      data: { courseId: course.id, ...moduleFields, published: true },
    })
    console.log(`✅ Modulo ${module.order}: ${module.title}`)

    for (const lessonData of lessons) {
      await prisma.lesson.create({
        data: { moduleId: module.id, ...lessonData },
      })
    }
    console.log(`   → ${lessons.length} aulas criadas`)
  }

  const allModulesDb = await prisma.module.findMany({
    where: { courseId: course.id },
    include: { lessons: { select: { durationMin: true } } },
  })
  const totalMinutes = allModulesDb.reduce((acc, m) => acc + m.lessons.reduce((a, l) => a + l.durationMin, 0), 0)
  await prisma.course.update({
    where: { id: course.id },
    data: { totalHours: Math.round(totalMinutes / 60) },
  })

  const totalLessons = allModulesDb.reduce((acc, m) => acc + m.lessons.length, 0)
  console.log(`\n🎉 Total: ${allModulesDb.length} modulos, ${totalLessons} aulas, ~${Math.round(totalMinutes / 60)}h`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
