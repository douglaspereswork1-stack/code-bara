'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, ArrowRight, Trophy } from 'lucide-react'

type Question = {
  id: string
  question: string
  options: { text: string; isCorrect: boolean }[]
  explanation: string
}

const QUESTIONS: Question[] = [
  {
    id: 'q1',
    question: 'Qual é a diferença entre `let` e `const`?',
    options: [
      { text: 'let é mais rápido que const', isCorrect: false },
      { text: 'const não pode ser reatribuído, let pode', isCorrect: true },
      { text: 'let só funciona em objetos', isCorrect: false },
      { text: 'Não há diferença', isCorrect: false },
    ],
    explanation: 'const declara uma constante que não pode ser reatribuída. let permite reatribuição.',
  },
  {
    id: 'q2',
    question: 'Qual é o resultado de `typeof null`?',
    options: [
      { text: '"null"', isCorrect: false },
      { text: '"undefined"', isCorrect: false },
      { text: '"object"', isCorrect: true },
      { text: '"boolean"', isCorrect: false },
    ],
    explanation: 'typeof null retorna "object" — é um bug antigo do JavaScript que nunca foi corrigido.',
  },
  {
    id: 'q3',
    question: 'O que `===` faz diferente de `==`?',
    options: [
      { text: 'Nada, são iguais', isCorrect: false },
      { text: '=== compara valor e tipo (sem coerção)', isCorrect: true },
      { text: '=== é mais lento', isCorrect: false },
      { text: '== é mais seguro', isCorrect: false },
    ],
    explanation: '=== é igualdade estrita: compara valor E tipo. == faz coerção de tipo antes de comparar.',
  },
]

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResult, setShowResult] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const q = QUESTIONS[current]
  const isLast = current === QUESTIONS.length - 1
  const selectedOption = q.options.find(o => o.text === selected)

  const handleSelect = (text: string) => {
    if (submitted) return
    setSelected(text)
  }

  const handleNext = () => {
    if (!selected) return

    setAnswers(prev => ({ ...prev, [current]: selected }))

    if (isLast) {
      setShowResult(true)
      return
    }

    setCurrent(c => c + 1)
    setSelected(answers[current + 1] || null)
    setSubmitted(false)
  }

  const handleSubmit = () => {
    setSubmitted(true)
  }

  // Results
  if (showResult) {
    const allAnswers = { ...answers, [current]: selected }
    let correct = 0
    QUESTIONS.forEach((q, i) => {
      const ans = allAnswers[i]
      if (q.options.find(o => o.text === ans)?.isCorrect) correct++
    })
    const score = Math.round((correct / QUESTIONS.length) * 100)
    const passed = score >= 70

    return (
      <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
        <div className="text-6xl">{passed ? '🎉' : '📚'}</div>
        <h1 className="text-3xl font-bold">
          {passed ? 'Parabéns!' : 'Continue estudando!'}
        </h1>
        <div className="text-5xl font-bold text-primary">{score}%</div>
        <p className="text-muted-foreground">
          {correct}/{QUESTIONS.length} perguntas corretas
        </p>

        <div className="p-4 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-center gap-2 text-xl">
            <Trophy className="w-6 h-6 text-primary" />
            <span>{passed ? '+25 XP ganhos!' : '+0 XP'}</span>
          </div>
        </div>

        {/* Review */}
        <div className="text-left space-y-4">
          <h2 className="font-semibold">Revisão</h2>
          {QUESTIONS.map((q, i) => {
            const ans = allAnswers[i]
            const correct = q.options.find(o => o.isCorrect)
            const isCorrect = ans === correct?.text
            return (
              <div key={q.id} className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                  )}
                  <div>
                    <div className="text-sm font-medium">{q.question}</div>
                    {!isCorrect && (
                      <div className="text-xs text-muted-foreground mt-1">
                        Sua resposta: <span className="text-destructive">{ans}</span>
                        <br />
                        Correto: <span className="text-success">{correct?.text}</span>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1 italic">
                      {q.explanation}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={() => {
            setCurrent(0)
            setSelected(null)
            setAnswers({})
            setShowResult(false)
            setSubmitted(false)
          }}
          className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
        >
          Tentar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Pergunta {current + 1} de {QUESTIONS.length}</span>
        <div className="flex-1 bg-secondary rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h2 className="text-lg font-semibold mb-4">{q.question}</h2>

        <div className="space-y-3">
          {q.options.map((opt) => {
            const isSelected = selected === opt.text
            let styles = 'border-border hover:border-primary/50'
            if (submitted && isSelected) {
              styles = opt.isCorrect
                ? 'border-success bg-success/10'
                : 'border-destructive bg-destructive/10'
            } else if (isSelected) {
              styles = 'border-primary bg-primary/10'
            }

            return (
              <button
                key={opt.text}
                onClick={() => handleSelect(opt.text)}
                className={`w-full text-left p-4 rounded-lg border transition ${styles}`}
              >
                <span className="text-sm">{opt.text}</span>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {submitted && (
          <div className="mt-4 p-3 rounded-lg bg-secondary text-sm text-muted-foreground">
            💡 {q.explanation}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <div />
        <div className="flex gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selected}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50"
            >
              Responder
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition"
            >
              {isLast ? 'Ver Resultado' : 'Próxima'}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
