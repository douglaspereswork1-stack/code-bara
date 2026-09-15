import { Settings, User, Bell, Shield } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="p-4 lg:p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-white flex items-center gap-2"><Settings className="w-6 h-6 text-[#94A3B8]" /> Configurações</h1>
      <div className="space-y-3">
        {[
          { icon: User, title: 'Perfil', desc: 'Nome, avatar e bio' },
          { icon: Bell, title: 'Notificações', desc: 'Streak, revisões e conquistas' },
          { icon: Shield, title: 'Conta e segurança', desc: 'Email, senha e sessões' },
        ].map(s => (
          <div key={s.title} className="rounded-2xl bg-[#0D1528] border border-white/[0.06] p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center"><s.icon className="w-5 h-5 text-[#94A3B8]" /></div>
            <div><div className="font-semibold text-white text-sm">{s.title}</div><div className="text-xs text-[#94A3B8]">{s.desc}</div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
