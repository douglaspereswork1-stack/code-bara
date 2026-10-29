import { createHmac } from 'crypto'
import { describe, expect, it } from 'vitest'
import { isValidSignature, MP_PRICE, paymentUnlocks } from './mercadopago'

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

describe('isValidSignature', () => {
  it('sem MP_WEBHOOK_SECRET → false (fail-closed)', () => {
    const headers = new Headers({ 'x-signature': 'ts=1,v1=abcd', 'x-request-id': 'r1' })
    expect(isValidSignature(headers, '123', undefined)).toBe(false)
    expect(isValidSignature(headers, '123', '')).toBe(false)
  })

  it('assinatura HMAC válida → true; segredo errado → false', () => {
    const v1 = createHmac('sha256', 's3cr3t').update('id:abc123;request-id:r1;ts:1700000000;').digest('hex')
    const headers = new Headers({ 'x-signature': `ts=1700000000,v1=${v1}`, 'x-request-id': 'r1' })
    expect(isValidSignature(headers, 'ABC123', 's3cr3t')).toBe(true) // data.id alfanumérico vai minúsculo no manifest
    expect(isValidSignature(headers, 'ABC123', 'outro')).toBe(false)
  })
})
