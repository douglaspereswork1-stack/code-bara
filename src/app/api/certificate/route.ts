import { type NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as unknown as { id: string })?.id
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const moduleId = searchParams.get('moduleId')
  if (!moduleId) return NextResponse.json({ error: 'moduleId required' }, { status: 400 })

  const module = await prisma.module.findUnique({
    where: { id: moduleId },
    include: {
      course: { select: { title: true } },
      lessons: { select: { id: true } },
    },
  })
  if (!module) return NextResponse.json({ error: 'Module not found' }, { status: 404 })

  const completedCount = await prisma.progress.count({
    where: {
      userId,
      lessonId: { in: module.lessons.map(l => l.id) },
      completed: true,
    },
  })

  if (completedCount < module.lessons.length) {
    return NextResponse.json({ error: 'Module not completed' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { name: true, email: true } })

  // Generate HTML certificate
  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @page { size: A4 landscape; margin: 0; }
  body { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; }
  .cert {
    width: 1122px; height: 794px;
    background: linear-gradient(135deg, #0A1020 0%, #0D1528 50%, #111A32 100%);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    position: relative; overflow: hidden;
  }
  .border { position: absolute; inset: 20px; border: 2px solid rgba(34,211,238,0.3); border-radius: 16px; }
  .glow { position: absolute; width: 300px; height: 300px; border-radius: 50%; filter: blur(100px); }
  .glow1 { top: -100px; right: -50px; background: rgba(59,130,246,0.15); }
  .glow2 { bottom: -100px; left: -50px; background: rgba(139,92,246,0.15); }
  .content { text-align: center; z-index: 1; }
  .logo { font-size: 24px; font-weight: 800; color: white; letter-spacing: -0.5px; }
  .logo span { color: #FACC15; }
  .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; background: rgba(34,211,238,0.1); border: 1px solid rgba(34,211,238,0.2); color: #22D3EE; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-top: 16px; }
  h1 { font-size: 42px; font-weight: 900; color: white; margin: 24px 0 8px; letter-spacing: -1px; }
  .subtitle { font-size: 16px; color: #94A3B8; margin: 0; }
  .name { font-size: 28px; font-weight: 700; color: #22D3EE; margin: 32px 0 8px; }
  .module { font-size: 18px; color: white; font-weight: 600; }
  .date { font-size: 13px; color: #64748B; margin-top: 24px; }
  .footer { position: absolute; bottom: 36px; display: flex; gap: 60px; }
  .sig { text-align: center; }
  .sig-line { width: 160px; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 6px; font-size: 12px; color: #94A3B8; }
</style>
</head>
<body>
<div class="cert">
  <div class="border"></div>
  <div class="glow glow1"></div>
  <div class="glow glow2"></div>
  <div class="content">
    <div class="logo">Code.<span>Zen</span></div>
    <div class="badge">Certificado de Conclusão</div>
    <h1>Parabéns!</h1>
    <p class="subtitle">Você completou todas as aulas do módulo</p>
    <div class="name">${user?.name || user?.email || 'Aluno'}</div>
    <div class="module">${module.title} — ${module.course.title}</div>
    <div class="date">${new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
  </div>
  <div class="footer">
    <div class="sig"><div class="sig-line">Code.Zen Plataforma</div></div>
    <div class="sig"><div class="sig-line">Automático — ${new Date().toLocaleDateString('pt-BR')}</div></div>
  </div>
</div>
</body>
</html>`

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `inline; filename="certificado-${module.slug}.html"`,
    },
  })
}
