export function Capybara({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-label="capivara">
      {/* corpo */}
      <ellipse cx="50" cy="68" rx="34" ry="22" fill="#C49A6C" stroke="#8B6F47" strokeWidth="2.5" />
      {/* barriga clara */}
      <ellipse cx="50" cy="74" rx="22" ry="12" fill="#E8D5B7" />
      {/* cabeça */}
      <ellipse cx="50" cy="38" rx="28" ry="22" fill="#C49A6C" stroke="#8B6F47" strokeWidth="2.5" />
      {/* focinho */}
      <ellipse cx="50" cy="48" rx="16" ry="12" fill="#E8D5B7" stroke="#8B6F47" strokeWidth="1.5" />
      <ellipse cx="50" cy="52" rx="5" ry="4" fill="#3D2B1F" />
      <ellipse cx="50" cy="51" rx="1.5" ry="1" fill="white" opacity="0.7" />
      {/* narinas */}
      <circle cx="47" cy="48" r="1.2" fill="#3D2B1F" />
      <circle cx="53" cy="48" r="1.2" fill="#3D2B1F" />
      {/* olhos */}
      <circle cx="36" cy="32" r="5" fill="white" stroke="#3D2B1F" strokeWidth="1.2" />
      <circle cx="36" cy="32" r="2.5" fill="#3D2B1F" />
      <circle cx="37" cy="31" r="1" fill="white" />
      <circle cx="64" cy="32" r="5" fill="white" stroke="#3D2B1F" strokeWidth="1.2" />
      <circle cx="64" cy="32" r="2.5" fill="#3D2B1F" />
      <circle cx="65" cy="31" r="1" fill="white" />
      {/* orelhas */}
      <ellipse cx="30" cy="22" rx="8" ry="10" fill="#A67C52" stroke="#8B6F47" strokeWidth="1.8" />
      <ellipse cx="30" cy="24" rx="4" ry="5" fill="#E8B4A0" />
      <ellipse cx="70" cy="22" rx="8" ry="10" fill="#A67C52" stroke="#8B6F47" strokeWidth="1.8" />
      <ellipse cx="70" cy="24" rx="4" ry="5" fill="#E8B4A0" />
      {/* bochechas rosadas */}
      <ellipse cx="32" cy="44" rx="5" ry="3" fill="#E8A0A0" opacity="0.5" />
      <ellipse cx="68" cy="44" rx="5" ry="3" fill="#E8A0A0" opacity="0.5" />
      {/* patinhas */}
      <ellipse cx="28" cy="84" rx="10" ry="7" fill="#A67C52" stroke="#8B6F47" strokeWidth="1.5" />
      <ellipse cx="72" cy="84" rx="10" ry="7" fill="#A67C52" stroke="#8B6F47" strokeWidth="1.5" />
    </svg>
  )
}

export function CapybaraSmall({ size = 28 }: { size?: number }) {
  return <Capybara size={size} />
}
