import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isValidSignature, mp, paymentUnlocks } from '@/lib/mercadopago'
import { Payment } from 'mercadopago'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const dataId = req.nextUrl.searchParams.get('data.id') ?? (body?.data?.id ? String(body.data.id) : null)

    if (!isValidSignature(req.headers, dataId)) {
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
