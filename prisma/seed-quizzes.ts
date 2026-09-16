import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

function Q(order: number, question: string, options: { text: string; correct: boolean }[], explanation: string) {
  return { order, question, options: JSON.stringify(options), explanation }
}

const quizData: { moduleSlug: string; title: string; questions: ReturnType<typeof Q>[] }[] = [
  {
    moduleSlug: 'js-basics', title: 'Quiz — JavaScript Basics',
    questions: [
      Q(1, 'Qual keyword declara uma variável que pode ser reatribuída?', [
        { text: 'const', correct: false },
        { text: 'let', correct: true },
        { text: 'var', correct: false },
        { text: 'define', correct: false },
      ], 'let permite reatribuição, const não.'),
      Q(2, 'Qual o resultado de: typeof null?', [
        { text: '"null"', correct: false },
        { text: '"object"', correct: true },
        { text: '"undefined"', correct: false },
        { text: '"boolean"', correct: false },
      ], 'Bug histórico do JavaScript — typeof null retorna "object".'),
      Q(3, 'Como declaraarrow function?', [
        { text: 'function => {}', correct: false },
        { text: '() => {}', correct: true },
        { text: 'function() => {}', correct: false },
        { text: '=> function {}', correct: false },
      ], 'Sintaxe correta: const fn = () => {}'),
      Q(4, 'O que console.log(0.1 + 0.2 === 0.3) imprime?', [
        { text: 'true', correct: false },
        { text: 'false', correct: true },
        { text: 'undefined', correct: false },
        { text: 'TypeError', correct: false },
      ], '0.1 + 0.2 = 0.30000000000000004 em ponto flutuante.'),
      Q(5, 'Qual método transforma string em array?', [
        { text: 'string.toArray()', correct: false },
        { text: 'string.split()', correct: true },
        { text: 'string.divide()', correct: false },
        { text: 'Array.from(string)', correct: true },
      ], 'split() é o mais comum. Array.from() também funciona.'),
    ],
  },
  {
    moduleSlug: 'html-css', title: 'Quiz — HTML & CSS',
    questions: [
      Q(1, 'Qual tag cria um link?', [
        { text: '<link>', correct: false },
        { text: '<a>', correct: true },
        { text: '<href>', correct: false },
        { text: '<url>', correct: false },
      ], '<link> é para CSS, <a> é para links.'),
      Q(2, 'Qual propriedade CSS cria espaço interno?', [
        { text: 'margin', correct: false },
        { text: 'padding', correct: true },
        { text: 'border', correct: false },
        { text: 'gap', correct: false },
      ], 'Margin é externo, padding é interno.'),
      Q(3, 'Display: flex torna o elemento...', [
        { text: 'Invisível', correct: false },
        { text: 'Um container flexível', correct: true },
        { text: 'Bloco', correct: false },
        { text: 'Inline', correct: false },
      ], 'Flex permite alinhar e distribuir filhos.'),
      Q(4, 'Qual seletor tem MAIS especificidade?', [
        { text: '.classe', correct: false },
        { text: '#id', correct: true },
        { text: 'elemento', correct: false },
        { text: '*', correct: false },
      ], '#id (100) > .classe (10) > elemento (1) > * (0).'),
      Q(5, 'O que faz position: sticky?', [
        { text: 'Fixo na tela', correct: false },
        { text: 'Fixo no scroll do pai', correct: true },
        { text: 'Absoluto', correct: false },
        { text: 'Relativo', correct: false },
      ], 'Sticky "gruda" no scroll até atingir o offset.'),
    ],
  },
  {
    moduleSlug: 'git-github', title: 'Quiz — Git & GitHub',
    questions: [
      Q(1, 'Qual comando cria um branch?', [
        { text: 'git branch', correct: true },
        { text: 'git checkout', correct: false },
        { text: 'git switch', correct: false },
        { text: 'git clone', correct: false },
      ], 'git branch cria. checkout/switch muda de branch.'),
      Q(2, 'git add . faz o quê?', [
        { text: 'Commita tudo', correct: false },
        { text: 'Adiciona arquivos ao stage', correct: true },
        { text: 'Deleta arquivos', correct: false },
        { text: 'Mostra status', correct: false },
      ], 'git add move para o stage. git commit salva.'),
      Q(3, 'Como ver o histórico de commits?', [
        { text: 'git log', correct: true },
        { text: 'git history', correct: false },
        { text: 'git show', correct: false },
        { text: 'git status', correct: false },
      ], 'git log mostra todos os commits.'),
      Q(4, 'O que resolve conflitos de merge?', [
        { text: 'git merge --fix', correct: false },
        { text: 'Editar os arquivos e fazer commit', correct: true },
        { text: 'git pull', correct: false },
        { text: 'git reset', correct: false },
      ], 'Conflitos precisam ser resolvidos manualmente no editor.'),
      Q(5, 'git pull faz quê?', [
        { text: 'Baixa e faz merge das mudanças', correct: true },
        { text: 'Sobe commits', correct: false },
        { text: 'Cria branch', correct: false },
        { text: 'Deleta branch', correct: false },
      ], 'git pull = git fetch + git merge.'),
    ],
  },
  {
    moduleSlug: 'js-advanced', title: 'Quiz — JavaScript Advanced',
    questions: [
      Q(1, 'O que é closure?', [
        { text: 'Uma função que acessa variáveis do escopo externo', correct: true },
        { text: 'Um tipo de loop', correct: false },
        { text: 'Um operador lógico', correct: false },
        { text: 'Uma forma de fechar o browser', correct: false },
      ], 'Closure: função que "lembra" do escopo onde foi criada.'),
      Q(2, 'O que Promise.all faz?', [
        { text: 'Resolve a primeira Promise', correct: false },
        { text: 'Aguarda TODAS as Promises resolverem', correct: true },
        { text: 'Rejeita se uma falhar', correct: false },
        { text: 'Nenhuma das anteriores', correct: false },
      ], 'Promise.all aguarda todas. Se uma falhar, rejeita todas.'),
      Q(3, 'async/await é syntactic sugar para...', [
        { text: 'Callbacks', correct: false },
        { text: 'Promises', correct: true },
        { text: 'Generators', correct: false },
        { text: 'Observables', correct: false },
      ], 'await para uma Promise. async retorna uma Promise.'),
      Q(4, 'O que hoisting?', [
        { text: 'Mover variáveis pro topo do escopo', correct: true },
        { text: 'Elevar o DOM', correct: false },
        { text: 'Criar闭包', correct: false },
        { text: 'Tipagem dinâmica', correct: false },
      ], 'var e function declarations são "elevados" no escopo.'),
      Q(5, 'Qual é o output: [1,2,3].map(x => x * 2)?', [
        { text: '[1,2,3]', correct: false },
        { text: '[2,4,6]', correct: true },
        { text: '6', correct: false },
        { text: 'undefined', correct: false },
      ], 'map transforma cada elemento e retorna novo array.'),
    ],
  },
  {
    moduleSlug: 'nodejs', title: 'Quiz — Node.js',
    questions: [
      Q(1, 'Node.js usa qual motor JS?', [
        { text: 'SpiderMonkey', correct: false },
        { text: 'V8', correct: true },
        { text: 'Chakra', correct: false },
        { text: 'JavaScriptCore', correct: false },
      ], 'V8 do Google Chrome, o mesmo do browser.'),
      Q(2, 'O que é npm?', [
        { text: 'Node Package Manager', correct: true },
        { text: 'New Project Manager', correct: false },
        { text: 'Node Program Manager', correct: false },
        { text: 'Network Package Manager', correct: false },
      ], 'npm gerencia pacotes/dependências do Node.'),
      Q(3, 'Express.js é um...', [
        { text: 'Framework web', correct: true },
        { text: 'Banco de dados', correct: false },
        { text: 'Frontend framework', correct: false },
        { text: 'Test runner', correct: false },
      ], 'Express é minimalista para criar APIs e sites.'),
      Q(4, 'Middleware no Express...', [
        { text: 'Roda antes da rota', correct: true },
        { text: 'Só roda em erro', correct: false },
        { text: 'Cria o HTML', correct: false },
        { text: 'Gerencia banco', correct: false },
      ], 'Middleware intercepta requests antes de chegar na rota.'),
      Q(5, 'Qual o método correto para rotas GET?', [
        { text: 'app.get()', correct: true },
        { text: 'app.route()', correct: false },
        { text: 'app.fetch()', correct: false },
        { text: 'app.listen()', correct: false },
      ], 'app.get() para GET, app.post() para POST, etc.'),
    ],
  },
  {
    moduleSlug: 'react-frontend', title: 'Quiz — React & Frontend',
    questions: [
      Q(1, 'O que JSX permite?', [
        { text: 'HTML dentro de JavaScript', correct: true },
        { text: 'JavaScript dentro de HTML', correct: false },
        { text: 'CSS dentro de JavaScript', correct: false },
        { text: 'Python dentro de JavaScript', correct: false },
      ], 'JSX = JavaScript XML — sintaxe que mistura HTML no JS.'),
      Q(2, 'useState retorna...', [
        { text: 'Um array com valor e setter', correct: true },
        { text: 'Um objeto com valor e setter', correct: false },
        { text: 'Apenas o valor', correct: false },
        { text: 'Uma Promise', correct: false },
      ], 'const [state, setState] = useState(initialValue)'),
      Q(3, 'useEffect com [] roda...', [
        { text: 'Em toda renderização', correct: false },
        { text: 'Uma vez, ao montar', correct: true },
        { text: 'Nunca', correct: false },
        { text: 'Ao desmontar', correct: false },
      ], 'Array vazio = sem dependências = roda uma vez.'),
      Q(4, 'Props são...', [
        { text: 'Dados passados de pai para filho', correct: true },
        { text: 'Dados internos do componente', correct: false },
        { text: 'Variáveis globais', correct: false },
        { text: 'Estado do componente', correct: false },
      ], 'Props são imutáveis. State é mutável pelo componente.'),
      Q(5, 'Next.js File Router significa...', [
        { text: 'Rotas baseadas em arquivos', correct: true },
        { text: 'Rotas manuais', correct: false },
        { text: 'Apenas SPA', correct: false },
        { text: 'Não usa rotas', correct: false },
      ], 'Cada arquivo em app/ vira uma rota automaticamente.'),
    ],
  },
  {
    moduleSlug: 'python', title: 'Quiz — Python',
    questions: [
      Q(1, 'Qual a saída de type(10)?', [
        { text: '<class \'int\'>', correct: true },
        { text: '<class \'float\'>', correct: false },
        { text: '<class \'number\'>', correct: false },
        { text: 'int', correct: false },
      ], 'type() retorna o tipo completo: <class \'int\'>'),
      Q(2, 'List comprehension correto:', [
        { text: '[x for x in range(5)]', correct: true },
        { text: '[x each x in range(5)]', correct: false },
        { text: '{x for x in range(5)}', correct: false },
        { text: '(x for x in range(5))', correct: false },
      ], '[expressão for item in iterable]. O {} cria set.'),
      Q(3, 'self em métodos de classe representa...', [
        { text: 'A instância atual', correct: true },
        { text: 'A classe', correct: false },
        { text: 'O módulo', correct: false },
        { text: 'O construtor', correct: false },
      ], 'self é a referência ao objeto que está chamando o método.'),
      Q(4, 'O que pip install faz?', [
        { text: 'Instala pacotes Python', correct: true },
        { text: 'Cria um ambiente virtual', correct: false },
        { text: 'Executa um script', correct: false },
        { text: 'Atualiza o Python', correct: false },
      ], 'pip é o gerenciador de pacotes do Python.'),
      Q(5, 'Qual a diferença entre append e extend?', [
        { text: 'append adiciona item, extend adiciona itens de iterable', correct: true },
        { text: 'São iguais', correct: false },
        { text: 'append remove, extend adiciona', correct: false },
        { text: 'extend é mais rápido', correct: false },
      ], 'append: [1].append([2]) = [1, [2]]. extend: [1].extend([2]) = [1, 2]'),
    ],
  },
  {
    moduleSlug: 'banco-dados', title: 'Quiz — Banco de Dados',
    questions: [
      Q(1, 'PRIMARY KEY é...', [
        { text: 'Identificador único de cada linha', correct: true },
        { text: 'Uma coluna que pode ser nula', correct: false },
        { text: 'Um tipo de dado', correct: false },
        { text: 'Um índice', correct: false },
      ], 'Chave primária identifica cada registro de forma única.'),
      Q(2, 'FOREIGN KEY referencia...', [
        { text: 'Outra tabela', correct: true },
        { text: 'A mesma tabela', correct: false },
        { text: 'O schema', correct: false },
        { text: 'O banco', correct: false },
      ], 'FK cria relacionamento entre tabelas.'),
      Q(3, 'O que WHERE faz?', [
        { text: 'Filtra linhas', correct: true },
        { text: 'Ordena resultados', correct: false },
        { text: 'Agrupa dados', correct: false },
        { text: 'Cria tabela', correct: false },
      ], 'WHERE filtra com condição: WHERE nome = \'Ana\''),
      Q(4, 'INNER JOIN retorna...', [
        { text: 'Apenas correspondentes em ambas tabelas', correct: true },
        { text: 'Todas as linhas da esquerda', correct: false },
        { text: 'Todas as linhas da direita', correct: false },
        { text: 'Todas as linhas', correct: false },
      ], 'INNER = interseção. LEFT = tudo da esquerda.'),
      Q(5, 'Prisma é um...', [
        { text: 'ORM para Node.js', correct: true },
        { text: 'Banco de dados', correct: false },
        { text: 'Frontend framework', correct: false },
        { text: 'Test runner', correct: false },
      ], 'Prisma mapeia tabelas para objetos JavaScript.'),
    ],
  },
  {
    moduleSlug: 'devops', title: 'Quiz — DevOps',
    questions: [
      Q(1, 'Docker container é...', [
        { text: 'Instância de uma image', correct: true },
        { text: 'Uma máquina virtual', correct: false },
        { text: 'Um sistema operacional', correct: false },
        { text: 'Um banco de dados', correct: false },
      ], 'Image = template. Container = instância rodando.'),
      Q(2, 'CI/CD significa...', [
        { text: 'Integracao e Entrega Continua', correct: true },
        { text: 'Code Insert/Code Delete', correct: false },
        { text: 'Central de Infraestrutura', correct: false },
        { text: 'Computação em Nuvem', correct: false },
      ], 'CI = build/testa a cada push. CD = deploy automático.'),
      Q(3, 'Dockerfile define...', [
        { text: 'Receita para criar uma image', correct: true },
        { text: 'Configuração do banco', correct: false },
        { text: 'Rotas da aplicação', correct: false },
        { text: 'Variáveis de ambiente', correct: false },
      ], 'FROM, COPY, RUN, EXPOSE, CMD são comandos do Dockerfile.'),
      Q(4, 'Vercel é...', [
        { text: 'Plataforma de deploy', correct: true },
        { text: 'Banco de dados', correct: false },
        { text: 'Editor de código', correct: false },
        { text: 'Sistema operacional', correct: false },
      ], 'Vercel faz deploy automático de apps frontend/fullstack.'),
      Q(5, 'O que mantém containers isolados?', [
        { text: 'Namespaces do Linux', correct: true },
        { text: 'Firewall', correct: false },
        { text: 'Antivírus', correct: false },
        { text: 'VPN', correct: false },
      ], 'Namespaces e cgroups do Linux isolam processos/containers.'),
    ],
  },
  {
    moduleSlug: 'carreira', title: 'Quiz — Carreira',
    questions: [
      Q(1, 'Um bom portfólio deve ter...', [
        { text: '3-5 projetos relevantes com descrição', correct: true },
        { text: '100 projetos pequenos', correct: false },
        { text: 'Apenas links de GitHub', correct: false },
        { text: 'Fotos pessoais', correct: false },
      ], 'Qualidade > quantidade. Mostre problema resolvido.'),
      Q(2, 'Na entrevista técnica, o mais importante é...', [
        { text: 'Pensar em voz alta', correct: true },
        { text: 'Saber tudo de cabeça', correct: false },
        { text: 'Rapididade na resposta', correct: false },
        { text: 'Adivinhar a resposta', correct: false },
      ], 'Entrevistadores querem ver seu processo de pensamento.'),
      Q(3, '80% dos problemas em projetos são...', [
        { text: 'De comunicação', correct: true },
        { text: 'Técnicos', correct: false },
        { text: 'Financeiros', correct: false },
        { text: 'De design', correct: false },
      ], 'Comunicação clara evita retrabalho e conflitos.'),
      Q(4, 'Estudo consistente é mais eficaz que...', [
        { text: 'Estudar 10h no fim de semana', correct: true },
        { text: 'Praticar projetos', correct: false },
        { text: 'Ler documentação', correct: false },
        { text: 'Assistir videoaulas', correct: false },
      ], '30 min/dia > 10h no sábado. Consistência vence intensidade.'),
      Q(5, 'roadmap.sh mostra...', [
        { text: 'Caminhos de carreira em tech', correct: true },
        { text: 'Tutoriais de Python', correct: false },
        { text: 'Vagas de emprego', correct: false },
        { text: 'Preços de cursos', correct: false },
      ], 'Mapas visuais dos caminhos: frontend, backend, DevOps, etc.'),
    ],
  },
]

async function main() {
  console.log('🎯 Criando quizzes com perguntas reais...\n')

  for (const qd of quizData) {
    const mod = await prisma.module.findFirst({ where: { slug: qd.moduleSlug } })
    if (!mod) { console.log(`⚠️  Módulo "${qd.moduleSlug}" não encontrado`); continue }

    const existing = await prisma.quiz.findFirst({ where: { moduleId: mod.id } })
    if (existing) {
      // Delete old questions and recreate
      await prisma.quizQuestion.deleteMany({ where: { quizId: existing.id } })
      await prisma.quiz.update({
        where: { id: existing.id },
        data: { title: qd.title, passingScore: 60, xpReward: 30, timeLimitMin: 10 },
      })
      for (const q of qd.questions) {
        await prisma.quizQuestion.create({ data: { quizId: existing.id, ...q } })
      }
      console.log(`🔄 Quiz atualizado: ${qd.title} (${qd.questions.length} perguntas)`)
      continue
    }

    const quiz = await prisma.quiz.create({
      data: { moduleId: mod.id, title: qd.title, passingScore: 60, xpReward: 30, timeLimitMin: 10 },
    })
    for (const q of qd.questions) {
      await prisma.quizQuestion.create({ data: { quizId: quiz.id, ...q } })
    }
    console.log(`✅ Quiz criado: ${qd.title} (${qd.questions.length} perguntas)`)
  }

  console.log('\n🎉 Quizzes prontos!')
}

main().catch(console.error).finally(() => prisma.$disconnect())
