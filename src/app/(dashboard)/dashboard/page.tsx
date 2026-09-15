import { Flame, Star, TrendingUp, Target } from 'lucide-react'
import { WelcomeBanner } from '@/components/dashboard/WelcomeBanner'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { ContinueLearning } from '@/components/dashboard/ContinueLearning'
import { SpacedReviews, RecentAchievements } from '@/components/dashboard/ReviewsAchievements'
import { RightWidgets } from '@/components/dashboard/RightWidgets'

export default function DashboardPage() {
  const stats = {
    streak: 12,
    xp: 2450,
    level: 3,
    levelName: 'Praticante',
    progress: 34,
    completedLessons: 28,
    totalLessons: 82,
    quizScore: 76,
  }

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* grid: main (2 cols) + right */}
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
              trend="+2"
            />
            <StatsCard
              icon={<Star className="w-4 h-4" />}
              label="XP"
              value={stats.xp.toLocaleString('pt-BR')}
              sublabel={`Nível ${stats.level} — ${stats.levelName}`}
              accent="violet"
              trend="+250"
              progress={68}
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
              label="Quiz Score"
              value={`${stats.quizScore}%`}
              sublabel="média geral"
              accent="green"
              ring={stats.quizScore}
            />
          </div>

          <ContinueLearning completed={stats.completedLessons} total={stats.totalLessons} progress={stats.progress} />

          <div className="grid md:grid-cols-2 gap-6">
            <SpacedReviews />
            <RecentAchievements />
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-[80px]">
            <RightWidgets />
          </div>
        </div>
      </div>

      {/* mobile right widgets below */}
      <div className="lg:hidden">
        <RightWidgets />
      </div>
    </div>
  )
}
