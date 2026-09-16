import { Flame, Star, TrendingUp, Target } from 'lucide-react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { ContinueLearning } from '@/components/dashboard/ContinueLearning'
import { XpChart } from '@/components/dashboard/XpChart'
import { RightWidgets } from '@/components/dashboard/RightWidgets'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as unknown as { id: string })?.id

  let stats = {
    streak: 0,
    xp: 0,
    level: 1,
    levelName: 'Iniciante',
    progress: 0,
    completedLessons: 0,
    totalLessons: 0,
  }

  if (userId) {
    const [streak, xpRecord, course, completedCount] = await Promise.all([
      prisma.streak.findUnique({ where: { userId }, select: { current: true } }),
      prisma.xpRecord.findUnique({ where: { userId }, select: { total: true } }),
      prisma.course.findUnique({
        where: { slug: 'dev-fullstack' },
        include: { modules: { include: { lessons: { select: { id: true } } } } },
      }),
      prisma.progress.count({ where: { userId, completed: true } }),
    ])

    const totalLessons = course?.modules.reduce((acc, m) => acc + m.lessons.length, 0) ?? 0
    const xp = xpRecord?.total ?? 0
    const level = Math.floor(xp / 500) + 1
    const levelNames = ['Iniciante', 'Aprendiz', 'Praticante', 'Desenvolvedor', 'Pleno', 'Sênior', 'Master', 'Lenda']
    const levelName = levelNames[Math.min(level - 1, levelNames.length - 1)]
    const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

    stats = {
      streak: streak?.current ?? 0,
      xp,
      level,
      levelName,
      progress,
      completedLessons: completedCount,
      totalLessons,
    }
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      <div className="grid lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-6 min-w-0">
          <WelcomeBanner />

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            <StatsCard
              icon={<Flame className="w-4 h-4" />}
              label="Streak"
              value={String(stats.streak)}
              sublabel="dias seguidos"
              accent="orange"
            />
            <StatsCard
              icon={<Star className="w-4 h-4" />}
              label="XP"
              value={stats.xp.toLocaleString('pt-BR')}
              sublabel={`Nível ${stats.level} — ${stats.levelName}`}
              accent="violet"
              progress={Math.min((stats.xp % 500), 100)}
            />
            <StatsCard
              icon={<TrendingUp className="w-4 h-4" />}
              label="Progresso"
              value={`${stats.progress}%`}
              sublabel="do curso completo"
              accent="cyan"
              progress={stats.progress}
            />
            <StatsCard
              icon={<Target className="w-4 h-4" />}
              label="Aulas"
              value={`${stats.completedLessons}/${stats.totalLessons}`}
              sublabel="concluídas"
              accent="green"
            />
          </div>

          <ContinueLearning userId={userId} completed={stats.completedLessons} total={stats.totalLessons} progress={stats.progress} />

          <XpChart currentXp={stats.xp} level={stats.level} />
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-[80px]">
            <RightWidgets />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <RightWidgets />
      </div>
    </div>
  )
}
