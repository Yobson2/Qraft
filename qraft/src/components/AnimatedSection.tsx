'use client';

import { useScrollAnimation, AnimationType } from '@/hooks/useScrollAnimation';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

export function AnimatedSection({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className = '',
}: AnimatedSectionProps) {
  const ref = useScrollAnimation<HTMLDivElement>({ animation, delay });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
