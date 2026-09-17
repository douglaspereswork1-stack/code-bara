import { Gamepad2, FolderKanban, Users, MonitorSmartphone, Infinity as InfinityIcon } from 'lucide-react'
import { BenefitCard } from './BenefitCard'

const ITEMS = [
  { index: '01', title: 'Aprendizado gamificado', text: 'Progrida através de desafios, conquistas e recompensas.', icon: Gamepad2 },
  { index: '02', title: 'Projetos reais', text: 'Construa projetos para praticar e desenvolver seu portfólio.', icon: FolderKanban },
  { index: '03', title: 'Comunidade', text: 'Aprenda, compartilhe e evolua junto com outros desenvolvedores.', icon: Users },
  { index: '04', title: 'Em qualquer lugar', text: 'Estude no computador, tablet ou celular.', icon: MonitorSmartphone },
  { index: '05', title: 'Acesso vitalício', text: 'Uma única compra para continuar evoluindo.', icon: InfinityIcon },
]

export function ExperienceSection() {
  return (
    <section aria-labelledby="exp-title" className="relative z-10 max-w-7xl mx-auto w-full px-5 lg:px-8 py-16 lg:py-24">
      <h2 id="exp-title" className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#F8FAFC]">
        Mais que um curso,<br />
        <span className="bg-gradient-to-r from-[#25E7F7] to-[#8B5CF6] bg-clip-text text-transparent">é uma experiência.</span>
      </h2>
      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {ITEMS.map((it) => <BenefitCard key={it.index} {...it} />)}
      </ul>
    </section>
  )
}
