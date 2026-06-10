import React from 'react';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  href: string;
  label: string;
  isMobile: boolean;
}

const ExportButton: React.FC<ExportButtonProps> = ({ href, label, isMobile }) => {
  return (
    <a
      href={href}
      download
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: isMobile ? '6px 12px' : '8px 16px',
        borderRadius: 8,
        background: 'var(--color-brand-shield-light)',
        color: 'var(--color-brand-shield)',
        fontSize: 13,
        fontWeight: 600,
        textDecoration: 'none',
        cursor: 'pointer',
        minHeight: 36,
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'color-mix(in srgb, var(--color-brand-shield) 20%, var(--color-brand-shield-light))'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-brand-shield-light)'; }}
    >
      <Download size={16} />
      {label}
    </a>
  );
};

export default ExportButton;