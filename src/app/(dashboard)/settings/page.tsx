'use client'

import { useState } from 'react'
import { Settings, Shield, Eye, EyeOff, Check, AlertCircle } from 'lucide-react'

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'As senhas não coincidem' })
      return
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Nova senha deve ter no mínimo 6 caracteres' })
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/settings/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage({ type: 'error', text: data.error || 'Erro ao alterar senha' })
        return
      }

      setMessage({ type: 'success', text: 'Senha alterada com sucesso!' })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch {
      setMessage({ type: 'error', text: 'Erro de conexão' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-white flex items-center gap-2">
        <Settings className="w-6 h-6 text-[#94A3B8]" /> Configurações
      </h1>

      {/* Trocar Senha */}
      <div className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#94A3B8]" />
          </div>
          <div>
            <div className="font-semibold text-white text-sm">Conta e segurança</div>
            <div className="text-xs text-[#94A3B8]">Altere sua senha</div>
          </div>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4">
          {/* Senha Atual */}
          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">Senha Atual</label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#3B82F6]/50 transition"
                placeholder="Digite sua senha atual"
                required
              />
              <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition">
                {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Nova Senha */}
          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">Nova Senha</label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#3B82F6]/50 transition"
                placeholder="Mínimo 6 caracteres"
                required
              />
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-white transition">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">Confirmar Nova Senha</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-[#64748B] focus:outline-none focus:border-[#3B82F6]/50 transition"
              placeholder="Repita a nova senha"
              required
            />
          </div>

          {/* Mensagem */}
          {message && (
            <div className={`flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl ${message.type === 'success' ? 'bg-[#10B981]/10 text-[#10B981]' : 'bg-[#EF4444]/10 text-[#EF4444]'}`}>
              {message.type === 'success' ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !currentPassword || !newPassword || !confirmPassword}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white font-semibold text-sm hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? 'Alterando...' : 'Alterar Senha'}
          </button>
        </form>
      </div>
    </div>
  )
}