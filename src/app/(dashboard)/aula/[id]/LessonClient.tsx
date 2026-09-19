'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { LessonMarkdown, parseInteractiveBlocks } from '@/components/lesson/LessonMarkdown'
import { InteractiveConsole } from '@/components/lesson/InteractiveConsole'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Zap, ExternalLink, BookOpen, Dumbbell } from 'lucide-react'

type Exercise = {
  id: string
  title: string
  description: string
  starterCode: string
  xpReward: number
  language: string
}

type LessonProps = {
  lesson: {
    id: string
    title: string
    type: string
    content: string
    durationMin: number
    xpReward: number
  }
  exercises: Exercise[]
  courseSlug: string
  prevLessonId: string | null
  nextLessonId: string | null
  initialCompleted: boolean
}

export default function LessonClient({ lesson, exercises, courseSlug, prevLessonId, nextLessonId, initialCompleted }: LessonProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [loading, setLoading] = useState(false)

  const { cleanContent, interactiveBlocks } = useMemo(() => {
    const { clean, blocks } = parseInteractiveBlocks(lesson.content)
    return { cleanContent: clean, interactiveBlocks: blocks }
  }, [lesson.content])

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
      <div className="prose prose-invert max-w-none text-[#E2E8F0] leading-relaxed">
        <LessonMarkdown content={cleanContent} interactiveBlocks={interactiveBlocks} />
      </div>

      {/* Database exercises */}
      {exercises.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-[#8B5CF6]">
            <Dumbbell className="w-5 h-5" />
            <h2 className="text-lg font-bold">Exercícios Práticos</h2>
          </div>
          {exercises.map((exercise, i) => (
            <div key={exercise.id} className="rounded-xl border border-[#8B5CF6]/20 bg-[#0D1528] overflow-hidden">
              <div className="px-5 py-3 border-b border-white/[0.06] bg-[#8B5CF6]/[0.04]">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8B5CF6]">
                      Exercício {i + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{exercise.title}</h3>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[#FACC15]">
                    <Zap className="w-3 h-3" /> +{exercise.xpReward} XP
                  </span>
                </div>
                {exercise.description && (
                  <p className="text-[13px] text-[#94A3B8] mt-1">{exercise.description}</p>
                )}
              </div>
              <div className="p-1">
                <InteractiveConsole
                  code={exercise.starterCode}
                  language={exercise.language}
                  exerciseId={exercise.id}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* References section */}
      {cleanContent.includes('## Referências') && (
        <div className="rounded-xl border border-[#22D3EE]/20 bg-[#22D3EE]/[0.03] p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-[#22D3EE]" />
            <h3 className="text-sm font-bold text-[#22D3EE]">Referências</h3>
          </div>
          <div className="space-y-2">
            {extractReferences(cleanContent).map((ref, i) => (
              <a
                key={i}
                href={ref.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#94A3B8] hover:text-[#22D3EE] transition"
              >
                <ExternalLink className="w-3 h-3 shrink-0" />
                {ref.text}
              </a>
            ))}
          </div>
        </div>
      )}

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

function extractReferences(content: string): { text: string; url?: string }[] {
  const refs: { text: string; url?: string }[] = []
  const lines = content.split('\n')
  let inRefs = false
  for (const line of lines) {
    if (line.includes('## Referências')) { inRefs = true; continue }
    if (inRefs && line.startsWith('#')) break
    if (inRefs && line.startsWith('- Livro:')) {
      const bookName = line.replace('- Livro:', '').trim()
      const slug = bookName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      refs.push({ text: `${bookName} (Biblioteca)`, url: `/biblioteca?search=${encodeURIComponent(slug)}` })
    } else if (inRefs && line.startsWith('- ')) {
      refs.push({ text: line.replace('- ', '').trim() })
    }
  }
  return refs
}
