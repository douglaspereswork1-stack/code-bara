import { createHmac, timingSafeEqual } from 'crypto'
import { MercadoPagoConfig } from 'mercadopago'

export const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!
// unit_price da Preference é em REAIS (decimal), não em centavos.
// 89999 aqui cobrava R$ 89.999,00 no checkout.
// Mudou o preço? Trocar também o texto em app/page.tsx, unlock/PriceDisplay, unlock/FinalCTA e curso/dev-fullstack.
export const MP_PRICE = 299.9
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

// Validação da assinatura do Mercado Pago:
// x-signature: "ts=<unix>,v1=<hmac-sha256-hex>"
// manifest:    "id:<data.id>;request-id:<x-request-id>;ts:<ts>;"
// (data.id vem da QUERY STRING, minúsculo se alfanumérico; segmentos ausentes são omitidos)
// Segredo: painel MP → Suas integrações → Webhooks → "Assinatura secreta".
export function isValidSignature(
  headers: Headers,
  dataId: string | null,
  secret = process.env.MP_WEBHOOK_SECRET
): boolean {
  if (!secret) {
    // fail-closed: sem segredo não dá pra provar que veio do MP → POST responde 401
    console.error('[webhook] MP_WEBHOOK_SECRET ausente — webhook rejeitado')
    return false
  }

  const xSignature = headers.get('x-signature') ?? ''
  const xRequestId = headers.get('x-request-id') ?? ''
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
