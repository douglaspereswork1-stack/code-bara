// Regra única de acesso ao conteúdo.
// Módulos em FREE_MODULE_ORDERS abrem pra qualquer usuário logado (funil: experimenta antes de pagar).
// O resto exige isPaid. Middleware NÃO decide isso (não enxerga o banco) — quem decide é a
// página/rota, com esta função.

export const FREE_MODULE_ORDERS: readonly number[] = [1]

export function isFreeModule(order: number): boolean {
  return FREE_MODULE_ORDERS.includes(order)
}

export function canAccessModule(order: number, isPaid: boolean): boolean {
  return isPaid || isFreeModule(order)
}

// Rotas que continuam 100% atrás do pagamento (não têm "amostra grátis")
export const PAID_ONLY_PREFIXES = ['/desafios', '/rankings', '/projetos', '/comunidade'] as const
