import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { mp, MP_PRICE, MP_TITLE } from '@/lib/mercadopago'
import { Preference } from 'mercadopago'

export async function POST() {
  const session = await getServerSession(authOptions)
  const userId = (session?.user as unknown as { id: string })?.id

  if (!userId) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) {
    return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 })
  }

  if (user.isPaid) {
    return NextResponse.json({ error: 'Já possui acesso' }, { status: 400 })
  }

  const preference = new Preference(mp)

  const result = await preference.create({
    body: {
      items: [
        {
          id: 'codezen-vitalicio',
          title: MP_TITLE,
          quantity: 1,
          unit_price: MP_PRICE,
          currency_id: 'BRL',
        },
      ],
      external_reference: userId,
      // A landing anuncia 12x — o checkout precisa oferecer até 12 parcelas.
      // "Sem juros" depende da configuração da conta MP, não daqui.
      payment_methods: { installments: 12 },
      back_urls: {
        success: `${process.env.NEXTAUTH_URL}/pagamento/sucesso`,
        failure: `${process.env.NEXTAUTH_URL}/pagamento/erro`,
        pending: `${process.env.NEXTAUTH_URL}/pagamento/pendente`,
      },
      auto_return: 'approved',
      notification_url: `${process.env.NEXTAUTH_URL}/api/payment/webhook`,
    },
  })

  return NextResponse.json({ init_point: result.init_point })
}
