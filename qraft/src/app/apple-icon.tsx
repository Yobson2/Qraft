import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="appleIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="white" stop-opacity="1" />
              <stop offset="100%" stop-color="white" stop-opacity="0.85" />
            </linearGradient>
          </defs>

          {/* QR Code inspired square pattern - All four corners */}
          <rect x="10" y="10" width="25" height="25" rx="4" fill="url(#appleIconGradient)" />
          <rect x="65" y="10" width="25" height="25" rx="4" fill="url(#appleIconGradient)" />
          <rect x="10" y="65" width="25" height="25" rx="4" fill="url(#appleIconGradient)" />
          <rect x="65" y="65" width="25" height="25" rx="4" fill="white" opacity="0.9" />

          {/* Center accent */}
          <rect x="42" y="42" width="16" height="16" rx="4" fill="white" />

          {/* Connecting dots - Cardinal directions only */}
          <circle cx="50" cy="22.5" r="4" fill="white" />
          <circle cx="22.5" cy="50" r="4" fill="white" />
          <circle cx="77.5" cy="50" r="4" fill="white" />
          <circle cx="50" cy="77.5" r="4" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
