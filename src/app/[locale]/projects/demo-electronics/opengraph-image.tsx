import { ImageResponse } from 'next/og';
export const alt = 'Electronic Parts Intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
// Brand-only typography avoids unsupported CJK glyphs in the image renderer;
// page and social descriptions remain fully localized in metadata.
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0b172d',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 85,
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 22,
          letterSpacing: 5,
          color: '#a1baff',
          marginBottom: 35,
        }}
      >
        DEMO ELECTRONICS / B2B
      </div>
      <div style={{ display: 'flex', fontSize: 80, lineHeight: 1.1, letterSpacing: -4 }}>
        Electronic Parts
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 94,
          lineHeight: 1.1,
          color: '#8fb0ff',
          letterSpacing: -4,
        }}
      >
        Intelligence.
      </div>
      <div style={{ display: 'flex', fontSize: 23, color: '#aabbd7', marginTop: 55 }}>
        Sebastián Solórzano
      </div>
    </div>,
    size,
  );
}
