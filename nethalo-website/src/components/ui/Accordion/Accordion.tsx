import React, { useState } from 'react';
import cn from 'clsx';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
}) => {
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(defaultOpen)
  );

  const toggle = (id: string) => {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (allowMultiple) {
        next.has(id) ? next.delete(id) : next.add(id);
      } else {
        next.clear();
        if (!prev.has(id)) next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map(item => (
        <details
          key={item.id}
          className={cn('glass-base', 'rounded-xl', 'overflow-hidden')}
          open={openIds.has(item.id)}
          onToggle={() => toggle(item.id)}
        >
          <summary className={cn(
            'flex items-center justify-between p-5 cursor-pointer list-none',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary'
          )}>
            <span className="font-medium text-lg">{item.title}</span>
            <ChevronDown
              className={cn(
                'w-5 h-5 text-muted transition-transform duration-300',
                openIds.has(item.id) && 'rotate-180'
              )}
              aria-hidden="true"
            />
          </summary>
          <div className="px-5 pb-5 pt-2 text-secondary animate-slide-down">
            {item.content}
          </div>
        </details>
      ))}
    </div>
  );
};