import React, { useState } from 'react';
import cn from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  onChange?: (id: string) => void;
  variant?: 'line' | 'enclosed' | 'soft';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultTab,
  onChange,
  variant = 'soft',
  className,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  const tabVariants = {
    soft: cn(
      'px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
      'hover:bg-white/5',
      'data-[state=active]:bg-brand-blue/10 data-[state=active]:text-brand-blue data-[state=active]:border-brand-blue/30',
      'border border-transparent'
    ),
    line: cn(
      'px-4 py-2 text-sm font-medium relative transition-colors',
      'text-muted hover:text-primary',
      'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-blue after:scale-x-0 after:origin-center after:transition-transform',
      'data-[state=active]:text-primary data-[state=active]:after:scale-x-100'
    ),
    enclosed: cn(
      'px-4 py-2 rounded-lg text-sm font-medium transition-all',
      'bg-white/5 text-muted hover:text-primary',
      'data-[state=active]:bg-brand-blue data-[state=active]:text-white data-[state=active]:shadow-lg'
    ),
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn(
          'flex flex-wrap gap-2 mb-6',
          variant === 'enclosed' && 'bg-white/5 p-1 rounded-xl'
        )}
        role="tablist"
        aria-label="Tabs"
      >
        {items.map(item => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeTab === item.id}
            aria-controls={`panel-${item.id}`}
            id={`tab-${item.id}`}
            className={cn(
              tabVariants[variant],
              'flex items-center gap-2',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary'
            )}
            onClick={() => handleTabChange(item.id)}
            data-state={activeTab === item.id ? 'active' : 'inactive'}
          >
            {item.icon && <span aria-hidden="true">{item.icon}</span>}
            {item.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {items.map(item =>
          activeTab === item.id && (
            <motion.div
              key={item.id}
              id={`panel-${item.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
              className="animate-fade-in"
            >
              {item.content}
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
};