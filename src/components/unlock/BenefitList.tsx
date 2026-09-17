import { CheckCircle2 } from 'lucide-react'

const BENEFITS = ['25 módulos completos', '433+ exercícios práticos', '8+ projetos reais', 'Suporte da comunidade', '750h de conteúdo']

export function BenefitList() {
  return (
    <ul className="space-y-2.5" aria-label="O que está incluído">
      {BENEFITS.map((b) => (
        <li key={b} className="flex items-center gap-3 text-sm text-[#CBD5E1]">
          <CheckCircle2 className="w-4.5 h-4.5 text-[#5EF2A3] shrink-0" aria-hidden />
          {b}
        </li>
      ))}
    </ul>
  )
}
