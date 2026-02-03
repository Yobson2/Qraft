interface LogoProps {
  className?: string;
  size?: number;
}

interface LogoWithTextProps {
  className?: string;
  logoSize?: number;
}

export function Logo({ className = '', size = 40 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient for premium feel */}
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: 'currentColor', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'currentColor', stopOpacity: 0.7 }} />
        </linearGradient>
      </defs>

      {/* QR Code inspired square pattern - All four corners (consistent) */}
      <rect x="10" y="10" width="25" height="25" rx="4" fill="url(#logoGradient)" />
      <rect x="65" y="10" width="25" height="25" rx="4" fill="url(#logoGradient)" />
      <rect x="10" y="65" width="25" height="25" rx="4" fill="url(#logoGradient)" />
      <rect x="65" y="65" width="25" height="25" rx="4" fill="currentColor" opacity="0.85" />

      {/* Center accent - "Qraft" signature element */}
      <rect x="42" y="42" width="16" height="16" rx="4" fill="currentColor" />

      {/* Connecting dots - Cardinal directions only (clean hierarchy) */}
      <circle cx="50" cy="22.5" r="4" fill="currentColor" />
      <circle cx="22.5" cy="50" r="4" fill="currentColor" />
      <circle cx="77.5" cy="50" r="4" fill="currentColor" />
      <circle cx="50" cy="77.5" r="4" fill="currentColor" />
    </svg>
  );
}

export function LogoWithText({ className = '', logoSize = 40 }: LogoWithTextProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo size={logoSize} />
      <span className="text-3xl font-bold bg-linear-to-r from-blue-600 to-black bg-clip-text text-transparent">
        Qraft
      </span>
    </div>
  );
}
