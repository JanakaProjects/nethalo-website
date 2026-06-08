import React from 'react';
import cn from 'clsx';

export type GlassVariant = 'base' | 'elevated' | 'panel' | 'input' | 'button';

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLElement> {
  variant?: GlassVariant;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  variant = 'base',
  as: Component = 'div',
  children,
  className,
  ...rest
}) => {
  const variantClasses = {
    base: 'glass-base rounded-2xl',
    elevated: 'glass-elevated rounded-[2rem]',
    panel: 'glass-panel rounded-none',
    input: 'glass-input rounded-xl',
    button: 'glass-button rounded-xl px-4 py-2',
  };

  return (
    <Component
      className={cn(variantClasses[variant], className)}
      {...rest}
    >
      {children}
    </Component>
  );
};