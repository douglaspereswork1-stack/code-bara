import { Resend } from 'resend'

type SendResetEmailParams = {
  to: string
  resetUrl: string
}

export async function sendResetEmail({ to, resetUrl }: SendResetEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[email] RESEND_API_KEY ausente. Reset link para ${to}: ${resetUrl}`)
    return { ok: false, skipped: true }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Code.Zen <noreply@codezen.dev>',
      to,
      subject: 'Recupere sua senha - Code.Zen',
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f172a; color: #e2e8f0; padding: 32px;">
          <div style="max-width: 480px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="display: inline-block; background: #8b5cf6; color: white; width: 48px; height: 48px; border-radius: 12px; line-height: 48px; font-size: 24px; font-weight: bold;">CZ</div>
            </div>
            <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 8px; color: white;">Recupere sua senha</h1>
            <p style="color: #94a3b8; margin-bottom: 24px; line-height: 1.6;">
              Você solicitou a recuperação da sua senha no Code.Zen. Clique no botão abaixo para criar uma nova senha.
            </p>
            <a href="${resetUrl}" style="display: block; text-align: center; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 14px 24px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px; margin-bottom: 24px;">
              Redefinir Senha
            </a>
            <p style="color: #64748b; font-size: 13px; line-height: 1.6;">
              Se você não solicitou a recuperação, ignore este email. O link expira em 1 hora.
            </p>
            <hr style="border: none; border-top: 1px solid #1e293b; margin: 24px 0;">
            <p style="color: #475569; font-size: 12px; text-align: center;">
              Code.Zen — Plataforma de Estudos FullStack
            </p>
          </div>
        </body>
        </html>
      `,
    })

    return { ok: true }
  } catch (err) {
    console.error('[email] Erro ao enviar reset email:', err)
    return { ok: false, error: err }
  }
}
