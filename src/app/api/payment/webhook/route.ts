import { NextRequest, NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'crypto'
import { prisma } from '@/lib/db'
import { mp, paymentUnlocks } from '@/lib/mercadopago'
import { Payment } from 'mercadopago'

// Validação da assinatura do Mercado Pago:
// x-signature: "ts=<unix>,v1=<hmac-sha256-hex>"
// manifest:    "id:<data.id>;request-id:<x-request-id>;ts:<ts>;"
// (data.id vem da QUERY STRING, minúsculo se alfanumérico; segmentos ausentes são omitidos)
// Segredo: painel MP → Suas integrações → Webhooks → "Assinatura secreta".
function isValidSignature(req: NextRequest, dataId: string | null): boolean {
  const secret = process.env.MP_WEBHOOK_SECRET
  if (!secret) {
    console.warn('[webhook] MP_WEBHOOK_SECRET ausente — assinatura NÃO validada')
    return true
  }

  const xSignature = req.headers.get('x-signature') ?? ''
  const xRequestId = req.headers.get('x-request-id') ?? ''
  const parts = Object.fromEntries(
    xSignature.split(',').map((p) => {
      const [k, ...v] = p.trim().split('=')
      return [k, v.join('=')]
    })
  )
  const ts = parts['ts']
  const v1 = parts['v1']
  if (!ts || !v1) return false

  let manifest = ''
  if (dataId) manifest += `id:${/^[a-zA-Z0-9]+$/.test(dataId) ? dataId.toLowerCase() : dataId};`
  if (xRequestId) manifest += `request-id:${xRequestId};`
  manifest += `ts:${ts};`

  const expected = createHmac('sha256', secret).update(manifest).digest('hex')
  const a = Buffer.from(expected, 'hex')
  const b = Buffer.from(v1, 'hex')
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const dataId = req.nextUrl.searchParams.get('data.id') ?? (body?.data?.id ? String(body.data.id) : null)

    if (!isValidSignature(req, dataId)) {
      console.warn('[webhook] assinatura inválida', { dataId })
      return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
    }

    if (body.type === 'payment') {
      const paymentId = body.data?.id

      if (!paymentId) {
        return NextResponse.json({ received: true })
      }

      const payment = new Payment(mp)
      const paymentData = await payment.get({ id: paymentId })

      if (paymentUnlocks(paymentData)) {
        // updateMany: usuário inexistente/já pago vira count 0 em vez de exceção → 500 → MP reenviando pra sempre.
        // isPaid:false no where preserva o paidAt/paymentId da primeira aprovação nos reenvios.
        const { count } = await prisma.user.updateMany({
          where: { id: paymentData.external_reference, isPaid: false },
          data: { isPaid: true, paidAt: new Date(), paymentId: String(paymentId) },
        })
        if (count === 0) console.warn('[webhook] nada liberado (já pago ou usuário inexistente)', { paymentId })
      } else if (paymentData.status === 'approved') {
        console.warn('[webhook] aprovado mas NÃO libera (moeda/valor/referência)', {
          paymentId,
          currency: paymentData.currency_id,
          amount: paymentData.transaction_amount,
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
