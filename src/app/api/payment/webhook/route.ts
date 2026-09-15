import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { mp } from '@/lib/mercadopago'
import { Payment } from 'mercadopago'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    if (body.type === 'payment') {
      const paymentId = body.data?.id

      if (!paymentId) {
        return NextResponse.json({ received: true })
      }

      const payment = new Payment(mp)
      const paymentData = await payment.get({ id: paymentId })

      if (
        paymentData.status === 'approved' &&
        paymentData.external_reference
      ) {
        await prisma.user.update({
          where: { id: paymentData.external_reference },
          data: {
            isPaid: true,
            paidAt: new Date(),
            paymentId: String(paymentId),
          },
        })
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook error' }, { status: 500 })
  }
}
