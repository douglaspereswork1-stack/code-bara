'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Code, Lock, ArrowLeft, CheckCircle } from 'lucide-react'

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('As senhas não coincidem')
      setLoading(false)
      return
    }

    if (password.length < 8) {
      setError('Senha deve ter no mínimo 8 caracteres')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Erro ao redefinir senha')
      } else {
        setSuccess(true)
      }
    } catch {
      setError('Erro ao redefinir senha')
    }
    setLoading(false)
  }

  if (!token) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">DevFullStack</span>
          </Link>
          <h1 className="text-2xl font-bold">Link inválido</h1>
          <p className="text-muted-foreground text-sm mt-1">
            O link de recuperação está incompleto ou inválido.
          </p>
        </div>
        <Link
          href="/forgot-password"
          className="w-full py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2"
        >
          Solicitar novo link
        </Link>
      </div>
    )
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
        <h1 className="text-2xl font-bold">Redefinir senha</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Crie uma nova senha para sua conta
        </p>
      </div>

      {success ? (
        <div className="space-y-4">
          <div className="text-sm text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400 p-4 rounded-lg text-center flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Senha redefinida com sucesso!
          </div>
          <Link
            href="/login"
            className="w-full py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Ir para o login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Nova senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Confirmar senha</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
                minLength={8}
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
            {loading ? 'Redefinindo...' : 'Redefinir senha'}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div className="text-center">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center mx-auto mb-4">
            <Code className="w-6 h-6 text-white" />
          </div>
          <p className="text-muted-foreground text-sm">Carregando...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
