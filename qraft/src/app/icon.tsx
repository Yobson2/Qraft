import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

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
          background: 'linear-gradient(135deg, #2563eb 0%, #9333ea 100%)',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="10" y="10" width="25" height="25" rx="4" fill="white" />
          <rect x="65" y="10" width="25" height="25" rx="4" fill="white" />
          <rect x="10" y="65" width="25" height="25" rx="4" fill="white" />
          <rect x="42" y="42" width="16" height="16" rx="3" fill="white" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
