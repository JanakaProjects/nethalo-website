import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isMobile?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, isMobile = false }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = (): (number | '...')[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | '...')[] = [];
    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const btnStyle: React.CSSProperties = {
    width: isMobile ? 36 : 40, height: isMobile ? 36 : 40, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '1px solid var(--color-border-light)', background: 'var(--color-bg-elevated)',
    color: 'var(--color-text-primary)', cursor: 'pointer', fontSize: isMobile ? 13 : 14,
    fontWeight: 500, transition: 'all 0.15s', minWidth: isMobile ? 36 : 40,
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 4 : 6, marginTop: 20 }}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}
        style={{ ...btnStyle, opacity: currentPage === 1 ? 0.4 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>
        <ChevronLeft size={16} />
      </button>
      {getVisiblePages().map((page, i) => (
        page === '...' ? <span key={`dots-${i}`} style={{ color: 'var(--color-text-muted)', fontSize: 14, padding: '0 4px' }}>...</span> :
        <button key={page} onClick={() => onPageChange(page)}
          style={{ ...btnStyle, background: page === currentPage ? 'var(--color-brand-shield)' : 'var(--color-bg-elevated)', color: page === currentPage ? '#ffffff' : 'var(--color-text-primary)', fontWeight: page === currentPage ? 600 : 500 }}>
          {page}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}
        style={{ ...btnStyle, opacity: currentPage === totalPages ? 0.4 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>
        <ChevronRight size={16} />
      </button>
    </div>
  );
};
