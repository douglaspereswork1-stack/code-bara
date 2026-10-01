import { CheckCircle2 } from 'lucide-react'

// Números conferidos no banco (01/10/2026) — atualizar junto com o conteúdo, nunca à frente dele.
export const BENEFITS = ['10 módulos', '65 aulas', '35 exercícios com correção automática', '3 projetos guiados', 'Quizzes, XP e certificado']

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
