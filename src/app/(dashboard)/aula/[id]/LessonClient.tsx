'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Zap } from 'lucide-react'

type LessonProps = {
  lesson: {
    id: string
    title: string
    type: string
    content: string
    durationMin: number
    xpReward: number
  }
  courseSlug: string
  prevLessonId: string | null
  nextLessonId: string | null
  initialCompleted: boolean
}

export default function LessonClient({ lesson, courseSlug, prevLessonId, nextLessonId, initialCompleted }: LessonProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [loading, setLoading] = useState(false)

  async function toggleComplete() {
    setLoading(true)
    try {
      const newCompleted = !completed
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lesson.id, completed: newCompleted }),
      })
      if (res.ok) {
        setCompleted(newCompleted)
      }
    } catch { /* ignore */ }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/curso/${courseSlug}`} className="p-2 rounded-lg hover:bg-white/[0.06] transition">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>
          <div className="flex items-center gap-4 text-sm text-[#94A3B8] mt-1">
            <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {lesson.durationMin} min</span>
            <span className="flex items-center gap-1"><Zap className="w-4 h-4" /> +{lesson.xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert max-w-none text-[#E2E8F0] leading-relaxed" dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.content) }} />

      {/* Mark complete */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-white/[0.06] bg-[#0D1528]">
        <div className="flex items-center gap-3">
          <CheckCircle className={`w-5 h-5 ${completed ? 'text-[#10B981]' : 'text-[#64748B]'}`} />
          <span className="text-sm font-medium text-white">
            {completed ? 'Aula concluída!' : 'Marcar como concluída'}
          </span>
        </div>
        <button
          onClick={toggleComplete}
          disabled={loading}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
            completed
              ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20'
              : 'bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white hover:brightness-110'
          } disabled:opacity-50`}
        >
          {loading ? '...' : completed ? '✓ Concluída' : 'Concluir Aula'}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        {prevLessonId ? (
          <Link href={`/aula/${prevLessonId}`} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/[0.06] text-white hover:bg-white/[0.06] transition">
            <ArrowLeft className="w-4 h-4" /> Aula Anterior
          </Link>
        ) : <div />}
        {nextLessonId ? (
          <Link href={`/aula/${nextLessonId}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white hover:brightness-110 transition">
            Próxima Aula <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link href={`/curso/${courseSlug}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10B981] text-white hover:brightness-110 transition">
            Módulo Concluído 🎉
          </Link>
        )}
      </div>
    </div>
  )
}

function renderMarkdown(md: string): string {
  return md
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 overflow-x-auto my-4"><code class="text-sm">$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code class="bg-white/[0.06] px-1.5 py-0.5 rounded text-sm text-[#22D3EE]">$1</code>')
    .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold mt-6 mb-2 text-white">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-xl font-bold mt-8 mb-3 text-white">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold mb-4 text-white">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/\| (.+) \|/g, (match) => {
      const cells = match.split('|').filter(Boolean).map(c => c.trim())
      return '<tr>' + cells.map(c => `<td class="px-3 py-1 border border-white/[0.08]">${c}</td>`).join('') + '</tr>'
    })
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-[#CBD5E1]">$1</li>')
    .replace(/\n\n/g, '<br/><br/>')
}