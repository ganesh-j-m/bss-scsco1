import React from 'react';

interface CollegeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'badge';
  className?: string;
  showSubtitle?: boolean;
}

export const CollegeLogo: React.FC<CollegeLogoProps> = ({
  size = 'md',
  variant = 'full',
  className = '',
  showSubtitle = true,
}) => {
  const iconSizeClass = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  }[size];

  // Authentic circular seal SVG representing Bharat Shikshan Sanstha, Omerga (Estd. 1941)
  const LogoIcon = (
    <div
      className={`relative rounded-full flex items-center justify-center shrink-0 shadow-xs border-2 border-amber-400 bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-amber-300 ${iconSizeClass}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full p-1 drop-shadow"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Circular Rim */}
        <circle cx="50" cy="50" r="46" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="41" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2,2" />

        {/* Central Sunrays / Flame of Knowledge */}
        <path
          d="M50 16 L53 26 L50 23 L47 26 Z M74 26 L66 33 L69 31 L68 28 Z M26 26 L32 28 L31 31 L34 33 Z"
          fill="#fbbf24"
        />

        {/* Chhatrapati Shivaji Maharaj Royal Seal / Fort Crest */}
        <path
          d="M40 34 L60 34 L63 42 L50 48 L37 42 Z"
          fill="#f59e0b"
          opacity="0.9"
        />

        {/* Open Book of Education (विद्यापीठ ग्रंथ) */}
        <path
          d="M32 52 C40 50 48 52 50 56 C52 52 60 50 68 52 L68 70 C60 68 52 70 50 74 C48 70 40 68 32 70 Z"
          fill="#ffffff"
          stroke="#0f172a"
          strokeWidth="1.5"
        />
        {/* Book Spine & Pages Lines */}
        <line x1="50" y1="56" x2="50" y2="74" stroke="#0f172a" strokeWidth="1.5" />
        <path d="M36 57 Q43 56 47 58 M36 62 Q43 61 47 63 M53 58 Q57 56 64 57 M53 63 Q57 61 64 62" stroke="#64748b" strokeWidth="1" />

        {/* Torch / Flame (मशाल) */}
        <path d="M47 38 Q50 31 53 38 Q55 42 50 45 Q45 42 47 38 Z" fill="#ef4444" />
        <path d="M49 39 Q50 35 51 39 Q52 41 50 43 Q48 41 49 39 Z" fill="#fde047" />

        {/* Estd Banner */}
        <rect x="36" y="78" width="28" height="8" rx="2" fill="#1e3a8a" stroke="#f59e0b" strokeWidth="0.8" />
        <text x="50" y="84" fontSize="5.5" fontWeight="bold" fill="#ffffff" textAnchor="middle" fontFamily="sans-serif">
          ESTD 1959
        </text>

        {/* Curved Circular Arch Labels */}
        <path id="curve" d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
        <text fontSize="4.8" fill="#fde047" fontWeight="bold" letterSpacing="0.5">
          <textPath href="#curve" startOffset="50%" textAnchor="middle">
            BHARAT SHIKSHAN SANSTHA
          </textPath>
        </text>
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return <div className={className}>{LogoIcon}</div>;
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {LogoIcon}
      <div className="flex flex-col">
        <span className="text-[10px] text-amber-600 font-semibold uppercase tracking-wider leading-none mb-0.5">
          Bharat Shikshan Sanstha's
        </span>
        <span className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight leading-tight">
          Shri Chhatrapati Shivaji College, Omerga
        </span>
        {showSubtitle && (
          <span className="text-[11px] text-slate-500 font-medium leading-tight">
            Dist. Dharashiv - 413606 · NAAC 'A' Grade (CGPA 3.14) · Affiliated to BAMU
          </span>
        )}
      </div>
    </div>
  );
};
