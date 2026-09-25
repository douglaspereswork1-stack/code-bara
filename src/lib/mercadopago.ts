import { MercadoPagoConfig } from 'mercadopago'

export const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!
// unit_price da Preference é em REAIS (decimal), não em centavos.
// 89999 aqui cobrava R$ 89.999,00 no checkout.
export const MP_PRICE = 899.99
export const MP_TITLE = 'Code.Zen - Acesso Vitalício'

type PaymentLike = {
  status?: string
  currency_id?: string
  transaction_amount?: number
  external_reference?: string
}

// "approved" sozinho não basta: o pagamento tem que ser em BRL e pelo valor cheio.
// `>=` porque quem pagou antes de uma baixa de preço continua válido num reenvio do webhook.
// Juros de parcelamento ficam em total_paid_amount; transaction_amount é o preço do item.
export function paymentUnlocks(p: PaymentLike): boolean {
  return (
    p.status === 'approved' &&
    p.currency_id === 'BRL' &&
    typeof p.transaction_amount === 'number' &&
    p.transaction_amount >= MP_PRICE &&
    Boolean(p.external_reference)
  )
}
