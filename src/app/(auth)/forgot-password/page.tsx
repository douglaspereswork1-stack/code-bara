'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Code, Mail, ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        setError('Erro ao processar solicitação')
      } else {
        setSent(true)
      }
    } catch {
      setError('Erro ao processar solicitação')
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Code className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">DevFullStack</span>
        </Link>
        <h1 className="text-2xl font-bold">Esqueceu a senha?</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Informe seu email para recuperar
        </p>
      </div>

      {sent ? (
        <div className="space-y-4">
          <div className="text-sm text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400 p-4 rounded-lg text-center">
            Se o email existir, você receberá um link de recuperação.
            <br />
            <span className="text-xs opacity-70">Verifique também o spam.</span>
          </div>
          <Link
            href="/login"
            className="w-full py-2.5 border border-border rounded-lg font-medium hover:bg-secondary transition flex items-center justify-center gap-2 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition disabled:opacity-50"
          >
            {loading ? 'Enviando...' : 'Enviar link de recuperação'}
          </button>
        </form>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Lembrou a senha?{' '}
        <Link href="/login" className="text-primary hover:underline">
          Entrar
        </Link>
      </p>
    </div>
  )
}
