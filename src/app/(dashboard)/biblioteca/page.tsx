import { BookOpen, ExternalLink, Code2, Globe, Database, Terminal, Shield, Lightbulb } from 'lucide-react'

const REPO = 'https://github.com/Difnandes/Livros-Programao-TI/raw/main'

type Book = { title: string; file: string }

const categories = [
  {
    icon: Code2,
    color: '#FACC15',
    name: 'JavaScript & Frontend',
    books: [
      { title: 'Aprendendo Javascript', file: 'Aprendendo Javascript.pdf' },
      { title: 'Dominando JavaScript com jQuery', file: 'Dominando JavaScript com jQuery.pdf' },
      { title: 'ECMAScript 6 — O futuro do JavaScript', file: 'ECMAScript 6 Entre de cabeça no futuro do JavaScript.pdf' },
      { title: 'HTML5 e CSS3 — Com Farinha e Pimenta', file: 'HTML5 e CSS3 Com Farinha e Pimenta.pdf' },
      { title: 'HTML5 e CSS3 — Domine a web do futuro', file: 'HTML5 e CSS3 Domine a web do futuro.pdf' },
      { title: 'CSS Eficiente', file: 'CSS Eficiente Técnicas e ferramentas que fazem diferença nos seus estilos.pdf' },
      { title: 'Guia Front-End', file: 'Guia Front-End O caminho das pedras para ser um dev Front-End.pdf' },
      { title: 'Coletânea Front-end Brasil', file: 'Coletânea Front-end Uma antologia da comunidade front-end brasileira.pdf' },
      { title: 'Frontend Web com ReactJS', file: 'Frontend Web com ReactJS - Integração com Backend (Parte 2)pdf.pdf' },
      { title: 'Desenvolva jogos com HTML5 Canvas', file: 'Desenvolva jogos com HTML5 Canvas e JavaScript.pdf' },
    ] as Book[],
  },
  {
    icon: Globe,
    color: '#3B82F6',
    name: 'Backend & APIs',
    books: [
      { title: 'Construindo APIs REST com Node.js', file: 'Construindo APIs REST com Node.js.pdf' },
      { title: 'Desenvolvimento web com PHP e MySQL', file: 'Desenvolvimento web com PHP e MySQL.pdf' },
      { title: 'Curso de linguagem PHP', file: 'Curso de linguagem PHP.pdf' },
      { title: 'Desenvolvimento web com ASP.NET MVC', file: 'Desenvolvimento web com ASP.NET MVC.pdf' },
      { title: 'CodeIgniter — Produtividade em PHP', file: 'CodeIgniter Produtividade na criação de aplicações web em PHP.pdf' },
    ] as Book[],
  },
  {
    icon: Database,
    color: '#8B5CF6',
    name: 'Banco de Dados & Dados',
    books: [
      { title: 'Modelagem de Dados', file: 'Modelagem de Dados' },
      { title: 'Armazenando dados com Redis', file: 'Armazenando dados com Redis.pdf' },
      { title: 'Business Intelligence — Do jeito certo', file: 'Business Intelligence Implementar do jeito certo e a custo zero.pdf' },
      { title: 'Big Data — Extração de valor dos dados', file: 'Big Data Técnicas e tecnologias para extração de valor dos dados.pdf' },
      { title: 'Elasticsearch — Dados real-time com ELK', file: 'Elasticsearch Consumindo dados real-time com ELK.pdf' },
    ] as Book[],
  },
  {
    icon: Terminal,
    color: '#10B981',
    name: 'DevOps & Infraestrutura',
    books: [
      { title: 'Controlando versões com Git e GitHub', file: 'Controlando versões com Git e Github.pdf' },
      { title: 'Containers com Docker', file: 'Containers com Docker Do desenvolvimento à producão.pdf' },
      { title: 'Amazon AWS — Computação na nuvem', file: 'Amazon AWS Descomplicando a computação na nuvem.pdf' },
      { title: 'Caixa de Ferramentas DevOps', file: 'Caixa de Ferramentas DevOps Um guia para construção, administração e arquitetura de sistemas modernos.pdf' },
      { title: 'DevOps Na prática', file: 'DevOps Na prática - entrega de software confiável e automatizada.pdf' },
      { title: 'Começando com Linux', file: 'Começando com Linux Comandos, serviços e administração.pdf' },
      { title: 'Comandos Linux', file: 'Comandos Linux.pdf' },
    ] as Book[],
  },
  {
    icon: Shield,
    color: '#F97316',
    name: 'Python & Outras Linguagens',
    books: [
      { title: 'Apostila Python', file: 'Apostila_Python.pdf' },
      { title: 'Python — Curso Intensivo', file: 'Curso_Intensivo_de_Python_–_Uma.pdf' },
      { title: 'Fluent Python', file: 'Fluent_Python_Clear_Concise_and_Effective_Programming.pdf' },
      { title: 'Black Hat Python', file: 'Black Hat Python.pdf' },
      { title: 'Introdução à programação em C', file: 'Introdução à programação em C Os primeiros passos de um desenvolvedor.pdf' },
      { title: 'Introdução à Computação com Ruby', file: 'Introdução à Computação Da lógica aos jogos com Ruby.pdf' },
    ] as Book[],
  },
  {
    icon: Lightbulb,
    color: '#22D3EE',
    name: 'Carreira & Conceitos',
    books: [
      { title: 'Como se tornar um Desenvolvedor Full-Stack', file: 'Como se tornar um Desenvolvedor Full-Stack.pdf' },
      { title: 'Desconstruindo a Web', file: 'Desconstruindo a Web As tecnologias por trás de uma requisição.pdf' },
      { title: 'Guia do mestre programador', file: 'Guia do mestre programador Pensando como pirata, evoluindo como jedi.pdf' },
      { title: 'Fragmentos de um programador', file: 'Fragmentos de um programador Artigos e insights da carreira de um profissional.pdf' },
      { title: 'Agile — Desenvolvimento de software', file: 'Agile Desenvolvimento de software com entregas frequentes e foco no valor de negócio.pdf' },
      { title: 'Introdução e boas práticas em UX Design', file: 'Introdução e boas práticas em UX Design.pdf' },
      { title: 'Gestão de produtos', file: 'Gestão de produtos Como aumentar as chances de sucesso do seu software.pdf' },
    ] as Book[],
  },
]

export default function BibliotecaPage() {
  const totalBooks = categories.reduce((acc, c) => acc + c.books.length, 0)

  return (
    <div className="p-4 lg:p-6 max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#FACC15]" /> Biblioteca
        </h1>
        <p className="text-sm text-[#94A3B8]">{totalBooks} livros gratuitos de programação e TI.</p>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}25` }}>
                <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
              </div>
              <h2 className="font-bold text-white">{cat.name}</h2>
              <span className="text-xs text-[#64748B] ml-1">({cat.books.length})</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.books.map((book) => (
                <a
                  key={book.file}
                  href={`${REPO}/${encodeURIComponent(book.file)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 p-4 rounded-xl bg-[#0D1528] border border-white/[0.06] hover:border-white/10 hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${cat.color}10`, border: `1px solid ${cat.color}20` }}>
                    <BookOpen className="w-4 h-4" style={{ color: cat.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white group-hover:text-[#22D3EE] transition truncate">{book.title}</div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">PDF • Acesso livre</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#64748B] group-hover:text-[#22D3EE] transition shrink-0 mt-1" />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6 text-center">
        <p className="text-xs text-[#64748B]">Livros cortesia de <a href="https://github.com/Difnandes/Livros-Programacao-TI" target="_blank" rel="noopener noreferrer" className="text-[#22D3EE] hover:underline">Difnandes/Livros-Programacao-TI</a> • Conteúdo para estudo</p>
      </div>
    </div>
  )
}