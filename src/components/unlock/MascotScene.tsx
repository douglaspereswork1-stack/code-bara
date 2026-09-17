"use client"
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const TOKENS = [
  { t: '</>', x: '4%', y: '10%', rot: '-8deg', dur: '7s', delay: '0s' },
  { t: '{ }', x: '78%', y: '6%', rot: '6deg', dur: '8s', delay: '1.2s' },
  { t: '=>', x: '88%', y: '46%', rot: '-4deg', dur: '6.5s', delay: '0.6s' },
  { t: 'const', x: '2%', y: '58%', rot: '5deg', dur: '9s', delay: '2s' },
  { t: '( )', x: '66%', y: '84%', rot: '-6deg', dur: '7.5s', delay: '0.3s' },
  { t: 'function', x: '10%', y: '86%', rot: '3deg', dur: '8.5s', delay: '1.6s' },
]

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  x: `${(i * 7.3 + 5) % 96}%`,
  size: i % 3 === 0 ? 4 : 3,
  dur: `${7 + (i % 5) * 1.3}s`,
  delay: `${(i * 0.9) % 6}s`,
  color: i % 4 === 0 ? '#5EF2A3' : i % 4 === 1 ? '#8B5CF6' : '#25E7F7',
}))

const DOTS: Array<[number, number]> = [[120, 386], [220, 346], [332, 282], [430, 224], [508, 132]]

export function MascotScene() {
  const reduce = useReducedMotion()
  return (
    <div className="relative w-full aspect-[5/4] max-w-[680px] mx-auto select-none">
      {/* BACKGROUND: céu / sol / horizonte / água */}
      <div aria-hidden className="absolute inset-0 rounded-[40px] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,#24105A_0%,#151047_35%,#08152D_70%,transparent_100%)]" />
        <div className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 w-[46%] aspect-square rounded-full bg-[radial-gradient(circle,#FDBA74_0%,#F97316_28%,rgba(249,115,22,0.25)_55%,transparent_72%)] blur-[2px] opacity-90" />
        <div className="absolute inset-x-0 top-[52%] h-[26%] bg-[radial-gradient(ellipse_at_20%_100%,#0E2A4A_0%,transparent_60%),radial-gradient(ellipse_at_80%_100%,#0B2A3A_0%,transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-[#0A2A44]/70 via-[#071C33] to-[#050816]" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[6%] w-[26%] h-[28%] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.35)_0%,transparent_65%)] blur-md" />
      </div>

      {/* MIDGROUND: trilha luminosa (a jornada) + tokens de código */}
      <svg aria-hidden viewBox="0 0 560 448" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="cz-trail" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#25E7F7" stopOpacity="0" />
            <stop offset="45%" stopColor="#25E7F7" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path d="M60 400 C 180 380, 250 330, 300 300 S 460 200, 520 120" fill="none" stroke="url(#cz-trail)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="10 12" opacity="0.95" />
        {DOTS.map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i === 4 ? 6 : 4} fill={i === 4 ? '#F8FAFC' : '#25E7F7'} opacity={i === 4 ? 1 : 0.8} />
        ))}
      </svg>
      {TOKENS.map((k) => (
        <span
          key={k.t}
          aria-hidden
          className="cz-token absolute font-mono text-[13px] sm:text-sm font-semibold text-[#25E7F7]/70 pointer-events-none"
          style={{ left: k.x, top: k.y, ['--rot' as string]: k.rot, ['--dur' as string]: k.dur, ['--delay' as string]: k.delay }}
        >
          {k.t}
        </span>
      ))}

      {/* FOREGROUND: ilha + glow + capivara + reflexo + partículas */}
      <div aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-[8%] w-[74%] h-[16%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,#1B3A2F_0%,#0F2A3A_45%,rgba(15,42,58,0)_72%)] shadow-[0_30px_60px_-10px_rgba(0,0,0,0.7)]" />
      <div aria-hidden className="absolute left-1/2 -translate-x-1/2 bottom-[12%] w-[60%] h-[8%] rounded-[50%] bg-[#25E7F7]/25 blur-2xl" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
        className="absolute left-1/2 -translate-x-1/2 bottom-[13%] w-[80%]"
      >
        <div className="cz-float relative">
          <Image
            src="/capivara-removebg-preview.png"
            alt="Capivara do Code.Zen, de moletom azul e fones, programando no notebook — sua guia na jornada"
            width={537}
            height={465}
            priority
            sizes="(max-width: 640px) 78vw, 420px"
            className="w-full h-auto drop-shadow-[0_24px_40px_rgba(0,0,0,0.6)]"
          />
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[90%] h-[40%] overflow-hidden opacity-25 [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.7),transparent_70%)]">
            <Image src="/capivara-removebg-preview.png" alt="" width={537} height={465} className="w-full h-auto scale-y-[-1] blur-[3px]" />
          </div>
        </div>
      </motion.div>

      {PARTICLES.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="cz-particle absolute bottom-[14%] rounded-full pointer-events-none"
          style={{ left: p.x, width: p.size, height: p.size, background: p.color, boxShadow: `0 0 8px ${p.color}`, ['--dur' as string]: p.dur, ['--delay' as string]: p.delay }}
        />
      ))}
    </div>
  )
}
