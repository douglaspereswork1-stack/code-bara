import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getSessionUser } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const metadata: Metadata = { title: 'Admin — Code.Zen', robots: { index: false, follow: false } }

// Não existe papel de admin no schema: quem entra é quem está em ADMIN_EMAILS (vírgula).
// Sem a var, ninguém entra — 404 em vez de 403 pra não anunciar que a rota existe.
const ADMINS = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim().toLowerCase()).filter(Boolean)

const data = (d: Date | null) => (d ? d.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }) : '—')

export default async function AdminPage() {
  const sessao = await getSessionUser()
  if (!sessao) notFound()
  const eu = await prisma.user.findUnique({ where: { id: sessao.id }, select: { email: true } })
  if (!eu || !ADMINS.includes(eu.email.toLowerCase())) notFound()

  const [usuarios, pagos, modulos, aulas, quizzes, exercicios, ultimos] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { isPaid: true } }),
    prisma.module.count(),
    prisma.lesson.count(),
    prisma.quiz.count(),
    prisma.exercise.count(),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      select: { id: true, email: true, name: true, isPaid: true, paidAt: true, paymentId: true, createdAt: true },
    }),
  ])

  const cards = [
    ['Alunos', usuarios], ['Pagantes', pagos], ['Módulos', modulos],
    ['Aulas', aulas], ['Quizzes', quizzes], ['Exercícios', exercicios],
  ] as const

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Painel admin</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {cards.map(([rotulo, valor]) => (
            <div key={rotulo} className="rounded-xl bg-slate-900 border border-slate-800 p-4">
              <div className="text-xs text-slate-400">{rotulo}</div>
              <div className="text-2xl font-bold text-white">{valor}</div>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-white mb-3">
          Últimos cadastros {usuarios > ultimos.length && <span className="text-slate-400 text-sm">({ultimos.length} de {usuarios})</span>}
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900 text-slate-400 text-left">
              <tr>
                <th className="p-3">E-mail</th><th className="p-3">Nome</th><th className="p-3">Cadastro</th>
                <th className="p-3">Pago</th><th className="p-3">Pago em</th><th className="p-3">ID pagamento MP</th>
              </tr>
            </thead>
            <tbody>
              {ultimos.map(u => (
                <tr key={u.id} className="border-t border-slate-800">
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.name ?? '—'}</td>
                  <td className="p-3 whitespace-nowrap">{data(u.createdAt)}</td>
                  <td className="p-3">{u.isPaid ? <span className="text-green-400">sim</span> : <span className="text-slate-500">não</span>}</td>
                  <td className="p-3 whitespace-nowrap">{data(u.paidAt)}</td>
                  <td className="p-3 font-mono text-xs">{u.paymentId ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
