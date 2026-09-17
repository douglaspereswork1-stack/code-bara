import { MercadoPagoConfig } from 'mercadopago'

export const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!
// unit_price da Preference é em REAIS (decimal), não em centavos.
// 89999 aqui cobrava R$ 89.999,00 no checkout.
export const MP_PRICE = 899.99
export const MP_TITLE = 'Code.Zen - Acesso Vitalício'
