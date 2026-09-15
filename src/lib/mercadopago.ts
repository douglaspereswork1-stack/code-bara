import { MercadoPagoConfig } from 'mercadopago'

export const mp = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
})

export const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY!
export const MP_PRICE = 89999 // R$ 899,99 em centavos
export const MP_TITLE = 'Code.Zen - Acesso Vitalício'
