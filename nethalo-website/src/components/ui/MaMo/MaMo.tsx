import React from 'react';

export type MaMoPose = 'hero' | 'portal' | 'talking' | 'zen' | 'brand';

export interface MaMoProps {
  pose?: MaMoPose;
  size?: number;
  className?: string;
}

const colors: Record<MaMoPose, { body: string; accent: string }> = {
  hero: { body: '#fce7f3', accent: '#e91e8c' },
  portal: { body: '#ffe4e6', accent: '#db2777' },
  talking: { body: '#fce7f3', accent: '#be185d' },
  zen: { body: '#d1fae5', accent: '#10b981' },
  brand: { body: '#fce7f3', accent: '#e91e8c' },
};

export const MaMo: React.FC<MaMoProps> = ({ pose = 'hero', size = 80, className }) => {
  const c = colors[pose];

  return (
    <div className={className} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size} role="img" aria-label="Ma-Mo, the NETHALO guardian dragon">
        <ellipse cx="100" cy="115" rx="45" ry="50" fill={c.body} />
        <ellipse cx="100" cy="65" rx="35" ry="32" fill="white" />
        <ellipse cx="85" cy="60" rx="8" ry="10" fill="#1a1a2e" />
        <ellipse cx="115" cy="60" rx="8" ry="10" fill="#1a1a2e" />
        <ellipse cx="87" cy="58" rx="3" ry="4" fill="white" />
        <ellipse cx="117" cy="58" rx="3" ry="4" fill="white" />
        <ellipse cx="70" cy="72" rx="10" ry="6" fill={c.accent} opacity="0.3" />
        <ellipse cx="130" cy="72" rx="10" ry="6" fill={c.accent} opacity="0.3" />
        <path d="M90 78 Q100 85 110 78" stroke={c.accent} strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M70 45 L60 25 L75 40" fill={c.accent} opacity="0.8" />
        <path d="M130 45 L140 25 L125 40" fill={c.accent} opacity="0.8" />
        <path d="M55 90 Q20 60 30 100 Q25 80 55 110Z" fill={c.accent} opacity="0.4" />
        <path d="M145 90 Q180 60 170 100 Q175 80 145 110Z" fill={c.accent} opacity="0.4" />
        <path d="M140 140 Q170 160 175 150 Q180 140 170 145" stroke={c.accent} strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="100" cy="130" rx="20" ry="15" fill="white" opacity="0.5" />
      </svg>
    </div>
  );
};
