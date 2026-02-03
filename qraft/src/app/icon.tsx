import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#2563eb" stop-opacity="1" />
              <stop offset="100%" stop-color="#2563eb" stop-opacity="0.7" />
            </linearGradient>
          </defs>

          {/* QR Code inspired square pattern - All four corners */}
          <rect x="10" y="10" width="25" height="25" rx="4" fill="url(#iconGradient)" />
          <rect x="65" y="10" width="25" height="25" rx="4" fill="url(#iconGradient)" />
          <rect x="10" y="65" width="25" height="25" rx="4" fill="url(#iconGradient)" />
          <rect x="65" y="65" width="25" height="25" rx="4" fill="#2563eb" opacity="0.85" />

          {/* Center accent */}
          <rect x="42" y="42" width="16" height="16" rx="4" fill="#2563eb" />

          {/* Connecting dots - Cardinal directions only */}
          <circle cx="50" cy="22.5" r="4" fill="#2563eb" />
          <circle cx="22.5" cy="50" r="4" fill="#2563eb" />
          <circle cx="77.5" cy="50" r="4" fill="#2563eb" />
          <circle cx="50" cy="77.5" r="4" fill="#2563eb" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
