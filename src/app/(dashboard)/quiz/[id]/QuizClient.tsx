'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw, Zap } from 'lucide-react'

type Question = {
  id: string
  question: string
  options: string[]
  explanation: string | null
  order: number
}

type QuizData = {
  id: string
  title: string
  passingScore: number
  xpReward: number
  questions: Question[]
}

type Props = {
  quiz: QuizData
  moduleSlug: string
  courseSlug: string
}

export default function QuizClient({ quiz, moduleSlug, courseSlug }: Props) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(quiz.questions.length).fill(null))
  const [showResult, setShowResult] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [xpEarned, setXpEarned] = useState(0)
  const [saved, setSaved] = useState(false)

  const q = quiz.questions[current]
  const total = quiz.questions.length
  const answered = answers.filter(a => a !== null).length

  const calcScore = useCallback(() => {
    let correct = 0
    quiz.questions.forEach((question, i) => {
      const correctIdx = JSON.parse(question.options as unknown as string).findIndex((o: { correct: boolean }) => o.correct)
      if (answers[i] === correctIdx) correct++
    })
    return Math.round((correct / total) * 100)
  }, [quiz.questions, answers, total])

  async function submitQuiz() {
    const s = calcScore()
    setScore(s)
    const passed = s >= quiz.passingScore
    const xp = passed ? quiz.xpReward : Math.round(quiz.xpReward * 0.3)
    setXpEarned(xp)
    setShowResult(true)
    setSubmitted(true)

    try {
      await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quizId: quiz.id, score: s, answers, xpEarned: xp }),
      })
      setSaved(true)
    } catch { /* ignore */ }
  }

  function selectOption(idx: number) {
    if (submitted) return
    setSelected(idx)
    const newAnswers = [...answers]
    newAnswers[current] = idx
    setAnswers(newAnswers)
  }

  function next() {
    if (current < total - 1) {
      setCurrent(current + 1)
      setSelected(answers[current + 1])
    }
  }

  function prev() {
    if (current > 0) {
      setCurrent(current - 1)
      setSelected(answers[current - 1])
    }
  }

  if (showResult) {
    const passed = score >= quiz.passingScore
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${passed ? 'bg-[#10B981]/10' : 'bg-[#F97316]/10'}`}>
            {passed ? <Trophy className="w-10 h-10 text-[#10B981]" /> : <XCircle className="w-10 h-10 text-[#F97316]" />}
          </div>
          <h1 className="text-3xl font-black text-white">{passed ? 'Parabéns!' : 'Não desista!'}</h1>
          <p className="text-[#94A3B8]">
            {passed ? 'Você passou no quiz!' : `Você precisa de ${quiz.passingScore}% para passar.`}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-[#0D1528] border border-white/[0.06] p-4 text-center">
            <div className="text-3xl font-black text-white">{score}%</div>
            <div className="text-xs text-[#64748B] mt-1">Sua nota</div>
          </div>
          <div className="rounded-xl bg-[#0D1528] border border-white/[0.06] p-4 text-center">
            <div className="text-3xl font-black text-[#FACC15]">+{xpEarned}</div>
            <div className="text-xs text-[#64748B] mt-1">XP ganho</div>
          </div>
          <div className="rounded-xl bg-[#0D1528] border border-white/[0.06] p-4 text-center">
            <div className="text-3xl font-black text-white">{answers.filter((a, i) => {
              const correctIdx = JSON.parse(quiz.questions[i].options as unknown as string).findIndex((o: { correct: boolean }) => o.correct)
              return a === correctIdx
            }).length}/{total}</div>
            <div className="text-xs text-[#64748B] mt-1">Corretas</div>
          </div>
        </div>

        {/* Review answers */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white">Revisão</h2>
          {quiz.questions.map((question, i) => {
            const options = JSON.parse(question.options as unknown as string)
            const correctIdx = options.findIndex((o: { correct: boolean }) => o.correct)
            const wasCorrect = answers[i] === correctIdx
            return (
              <div key={question.id} className={`rounded-xl border p-4 ${wasCorrect ? 'border-[#10B981]/20 bg-[#10B981]/5' : 'border-[#F97316]/20 bg-[#F97316]/5'}`}>
                <div className="flex items-start gap-3">
                  {wasCorrect ? <CheckCircle className="w-5 h-5 text-[#10B981] mt-0.5 shrink-0" /> : <XCircle className="w-5 h-5 text-[#F97316] mt-0.5 shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{question.question}</p>
                    {!wasCorrect && (
                      <p className="text-xs text-[#94A3B8] mt-1">
                        Sua resposta: <span className="text-[#F97316]">{options[answers[i]]?.text ?? 'Nenhuma'}</span>
                        {' • '}Correta: <span className="text-[#10B981]">{options[correctIdx]?.text}</span>
                      </p>
                    )}
                    {question.explanation && (
                      <p className="text-xs text-[#22D3EE] mt-1 italic">{question.explanation}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-between">
          <Link href={`/curso/${courseSlug}`} className="px-4 py-2 rounded-lg border border-white/[0.06] text-white hover:bg-white/[0.06] transition">
            Voltar ao Curso
          </Link>
          {!passed && (
            <button onClick={() => { setCurrent(0); setSelected(null); setAnswers(new Array(total).fill(null)); setShowResult(false); setSubmitted(false); setScore(0) }} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white hover:brightness-110 transition flex items-center gap-2">
              <RotateCcw className="w-4 h-4" /> Tentar Novamente
            </button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/curso/${courseSlug}`} className="p-2 rounded-lg hover:bg-white/[0.06] transition">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{quiz.title}</h1>
          <p className="text-sm text-[#94A3B8]">{answered}/{total} respondidas</p>
        </div>
        <div className="flex items-center gap-1 text-[#FACC15] text-sm font-bold">
          <Zap className="w-4 h-4" /> +{quiz.xpReward} XP
        </div>
      </div>

      {/* Progress */}
      <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] transition-all" style={{ width: `${((current + 1) / total) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6 space-y-4">
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span className="px-2 py-1 rounded-full bg-white/[0.06]">Pergunta {current + 1}/{total}</span>
        </div>
        <h2 className="text-lg font-semibold text-white">{q.question}</h2>

        <div className="space-y-3">
          {(() => {
            const options = JSON.parse(q.options as unknown as string)
            return options.map((opt: { text: string; correct: boolean }, i: number) => (
              <button
                key={i}
                onClick={() => selectOption(i)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                  selected === i
                    ? 'border-[#3B82F6] bg-[#3B82F6]/10 text-white'
                    : 'border-white/[0.06] text-[#94A3B8] hover:border-white/10 hover:bg-white/[0.04]'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 ${
                    selected === i ? 'border-[#3B82F6] bg-[#3B82F6] text-white' : 'border-white/10'
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt.text}
                </span>
              </button>
            ))
          })()}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={prev} disabled={current === 0} className="px-4 py-2 rounded-lg border border-white/[0.06] text-white hover:bg-white/[0.06] transition disabled:opacity-30">
          Anterior
        </button>
        {current === total - 1 ? (
          <button
            onClick={submitQuiz}
            disabled={answered < total}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#10B981] to-[#22D3EE] text-white font-bold hover:brightness-110 transition disabled:opacity-30"
          >
            Finalizar Quiz
          </button>
        ) : (
          <button onClick={next} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white hover:brightness-110 transition">
            Próxima
          </button>
        )}
      </div>
    </div>
  )
}
