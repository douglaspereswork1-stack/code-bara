import { describe, expect, it } from 'vitest'
import { MP_PRICE, paymentUnlocks } from './mercadopago'

const ok = { status: 'approved', currency_id: 'BRL', transaction_amount: MP_PRICE, external_reference: 'user1' }

describe('paymentUnlocks', () => {
  it('libera pagamento aprovado, BRL, valor cheio, com referência', () => {
    expect(paymentUnlocks(ok)).toBe(true)
  })
  it('libera valor acima do preço (pagou antes de baixa de preço)', () => {
    expect(paymentUnlocks({ ...ok, transaction_amount: MP_PRICE + 100 })).toBe(true)
  })
  it.each([
    ['pendente', { status: 'pending' }],
    ['valor menor', { transaction_amount: 1 }],
    ['um centavo a menos', { transaction_amount: MP_PRICE - 0.01 }],
    ['outra moeda', { currency_id: 'USD' }],
    ['sem referência', { external_reference: '' }],
    ['sem valor', { transaction_amount: undefined }],
  ])('NÃO libera: %s', (_, patch) => {
    expect(paymentUnlocks({ ...ok, ...patch })).toBe(false)
  })
})
