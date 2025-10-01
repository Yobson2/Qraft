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
      {/* QR Code inspired square pattern */}
      <rect x="10" y="10" width="25" height="25" rx="4" fill="currentColor" />
      <rect x="65" y="10" width="25" height="25" rx="4" fill="currentColor" />
      <rect x="10" y="65" width="25" height="25" rx="4" fill="currentColor" />

      {/* Center accent */}
      <rect x="42" y="42" width="16" height="16" rx="3" fill="currentColor" />

      {/* Connecting dots */}
      <circle cx="50" cy="22.5" r="4" fill="currentColor" />
      <circle cx="22.5" cy="50" r="4" fill="currentColor" />
      <circle cx="77.5" cy="50" r="4" fill="currentColor" />
      <circle cx="50" cy="77.5" r="4" fill="currentColor" />

      {/* Small accent dots */}
      <circle cx="65" cy="42" r="3" fill="currentColor" />
      <circle cx="42" cy="65" r="3" fill="currentColor" />
      <circle cx="77.5" cy="77.5" r="3" fill="currentColor" />
    </svg>
  );
}

export function LogoWithText({ className = '', logoSize = 40 }: LogoWithTextProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo size={logoSize} />
      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-black bg-clip-text text-transparent">
        Qraft
      </span>
    </div>
  );
}
