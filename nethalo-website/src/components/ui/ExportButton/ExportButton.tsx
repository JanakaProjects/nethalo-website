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
        background: '#f0f7ff',
        color: '#0071e3',
        fontSize: 13,
        fontWeight: 600,
        textDecoration: 'none',
        cursor: 'pointer',
        minHeight: 36,
        transition: 'all 0.2s',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#e0efff'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#f0f7ff'; }}
    >
      <Download size={16} />
      {label}
    </a>
  );
};

export default ExportButton;