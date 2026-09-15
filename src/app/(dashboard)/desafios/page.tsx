import { Code2, Trophy, Clock, Zap } from 'lucide-react'
import Link from 'next/link'

const challenges = [
  { id: 'c1', title: 'FizzBuzz — Clássico', diff: 'Fácil', xp: 25, done: true, tag: 'Lógica' },
  { id: 'c2', title: 'Debugar carrinho quebrado', diff: 'Médio', xp: 40, done: false, tag: 'Debug' },
  { id: 'c3', title: 'Escreva testes para API', diff: 'Médio', xp: 50, done: false, tag: 'TDD' },
  { id: 'c4', title: 'Clone do layout Figma', diff: 'Difícil', xp: 80, done: false, tag: 'Frontend' },
]

export default function DesafiosPage() {
  return (
    <div className="p-4 lg:p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2"><Code2 className="w-6 h-6 text-[#22D3EE]" /> Desafios</h1>
        <p className="text-sm text-[#94A3B8]">Pratique com problemas reais — ganhe XP e suba no ranking.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {challenges.map(c => (
          <div key={c.id} className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-5 hover:border-white/10 hover:-translate-y-0.5 transition">
            <div className="flex items-center justify-between">
              <span className={`text-[11px] font-bold tracking-widest uppercase px-2 py-1 rounded-full border ${c.diff==='Fácil'?'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20':c.diff==='Médio'?'bg-[#FACC15]/10 text-[#FACC15] border-[#FACC15]/20':'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20'}`}>{c.diff}</span>
              <span className="text-xs font-bold text-[#FACC15]">+{c.xp} XP</span>
            </div>
            <div className="font-semibold text-white mt-3">{c.title}</div>
            <div className="text-xs text-[#64748B] mt-1">{c.tag} • {c.done ? '✓ Concluído' : 'Disponível'}</div>
            <Link href={c.done ? '#' : '/curso/dev-fullstack'} className={`mt-4 inline-flex text-xs font-semibold px-3 py-1.5 rounded-full border transition ${c.done ? 'bg-white/[0.04] text-[#64748B] border-white/[0.06]' : 'bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white border-transparent'}`}>
              {c.done ? 'Revisar' : 'Começar →'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
