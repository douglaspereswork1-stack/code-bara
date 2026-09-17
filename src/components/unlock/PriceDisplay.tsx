export function PriceDisplay() {
  return (
    <div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-black text-[#25E7F7] leading-none pb-2">12x</span>
        <span className="text-6xl sm:text-7xl font-black text-[#F8FAFC] leading-none tracking-tight">R$ 75</span>
      </div>
      <p className="mt-3 text-sm text-[#94A3B8]">ou <span className="text-[#F8FAFC] font-semibold">R$ 899,99</span> no Pix</p>
      <p className="mt-1 text-xs text-[#64748B]">Pagamento único • Acesso vitalício</p>
    </div>
  )
}
