export function PriceDisplay() {
  return (
    <div>
      <div className="flex items-end gap-2">
        <span className="text-6xl sm:text-7xl font-black text-[#F8FAFC] leading-none tracking-tight">R$ 299,90</span>
      </div>
      <p className="mt-3 text-sm text-[#94A3B8]">no Pix ou em até <span className="text-[#F8FAFC] font-semibold">12x</span> no cartão</p>
      <p className="mt-1 text-xs text-[#64748B]">Pagamento único • Acesso vitalício</p>
    </div>
  )
}
