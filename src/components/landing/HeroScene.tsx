"use client"
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Cena da hero em camadas: cenário com a boia (boia-sol.png) + capivara recortada
// (capivara-removebg-preview.png) por cima, pra ela poder boiar sem mexer o cenário.
// O recorte é uma peça só: patas, cabeça e olhos NÃO se mexem separados — os efeitos
// abaixo são o corpo boiando, a luz do fone e da tela, a água e o reflexo do sol.
// Posições em % da cena (1347×1167), medidas sobre a composição — ver cz-* no globals.css.
export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null)
  const [pausado, setPausado] = useState(false)

  // Pausa as animações quando a hero sai da tela.
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setPausado(!e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      data-paused={pausado || undefined}
      className="cz-scene absolute top-0 right-0 w-[75%] h-full overflow-hidden pointer-events-none opacity-80 [container-type:size]"
    >
      {/* bg-cover ancorado no topo; na horizontal o foco é a capivara (66% da cena), não o
          centro — em tela estreita o centro da cena é só céu. O clamp impede sobrar faixa vazia. */}
      <div className="absolute top-0 [--w:max(100cqw,calc(100cqh*1347/1167))] w-[var(--w)] left-[clamp(calc(100cqw-var(--w)),calc(50cqw-0.66*var(--w)),0px)] aspect-[1347/1167]">
        <Image src="/boia-sol.png" alt="" fill priority sizes="75vw" className="object-cover" />

        {/* reflexo do sol tremulando na água */}
        <div className="absolute left-[21%] top-[40%] w-[19%] h-[44%] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_70%,transparent)]">
          <div className="cz-shimmer absolute inset-x-0 -top-full h-[200%] bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_9px,rgba(255,196,110,0.35)_11px,transparent_14px)] mix-blend-screen" />
        </div>

        {/* ondulações em volta da boia */}
        {[0, 2, 4].map(d => (
          <span
            key={d}
            className="cz-ripple absolute left-[32%] top-[71%] w-[66%] h-[19%] rounded-[50%] border border-[#7DD3FC]/50"
            style={{ animationDelay: `${d}s` }}
          />
        ))}

        {/* capivara + luzes que vão junto com ela */}
        <div className="cz-bob absolute left-[31%] top-[15%] w-[64%] aspect-[537/465]">
          <Image src="/capivara-removebg-preview.png" alt="" fill sizes="50vw" className="object-contain" />
          <span className="cz-glow absolute left-[88%] top-[34%] w-[16%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.85)_0%,rgba(34,211,238,0.25)_40%,transparent_70%)] mix-blend-screen" />
          <span className="cz-screen absolute left-[34%] top-[54%] w-[28%] h-[22%] -translate-x-1/2 -translate-y-1/2 rounded-[40%] bg-[radial-gradient(ellipse,rgba(56,189,248,0.6)_0%,transparent_70%)] mix-blend-screen" />
        </div>
      </div>
    </div>
  )
}
