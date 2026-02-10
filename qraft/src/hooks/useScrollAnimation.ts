'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animationPresets } from '@/lib/animations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export type AnimationType =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'scaleInBounce'
  | 'slideInUp'
  | 'slideInDown';

interface UseScrollAnimationOptions {
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  disabled?: boolean;
}

export function useScrollAnimation<T extends HTMLElement>(
  options: UseScrollAnimationOptions = {}
) {
  const {
    animation = 'fadeInUp',
    delay = 0,
    duration,
    start = 'top 85%',
    end,
    scrub = false,
    once = true,
    disabled = false,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || disabled) return;

    const preset = animationPresets[animation];
    const animationConfig = {
      ...preset,
      delay,
      ...(duration && { duration }),
    };

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        ...animationConfig,
        scrollTrigger: {
          trigger: ref.current,
          start,
          ...(end && { end }),
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          scrub,
        },
      });
    });

    return () => ctx.revert();
  }, [animation, delay, duration, disabled, start, end, scrub, once]);

  return ref;
}

// Hook for staggered animations
interface UseStaggerAnimationOptions extends UseScrollAnimationOptions {
  stagger?: number;
}

export function useStaggerAnimation<T extends HTMLElement>(
  options: UseStaggerAnimationOptions = {}
) {
  const {
    animation = 'fadeInUp',
    delay = 0,
    duration,
    stagger = 0.1,
    start = 'top 85%',
    once = true,
    disabled = false,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || disabled) return;

    const preset = animationPresets[animation];
    const children = ref.current.children;

    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        ...preset,
        stagger,
        delay,
        ...(duration && { duration }),
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [animation, delay, stagger, disabled, duration, start, once]);

  return ref;
}

// Hook for parallax effect
interface UseParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
}

export function useParallax<T extends HTMLElement>(options: UseParallaxOptions = {}) {
  const { speed = 1, direction = 'up', disabled = false } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || disabled) return;

    const yMovement = direction === 'up' ? -100 * speed : 100 * speed;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: yMovement,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [speed, direction, disabled]);

  return ref;
}

// Hook for hover animations
interface UseHoverAnimationOptions {
  scale?: number;
  y?: number;
  duration?: number;
  disabled?: boolean;
}

export function useHoverAnimation<T extends HTMLElement>(
  options: UseHoverAnimationOptions = {}
) {
  const { scale = 1.05, y = 0, duration = 0.3, disabled = false } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || disabled) return;

    const element = ref.current;

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale,
        y,
        duration,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        y: 0,
        duration,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [scale, y, duration, disabled]);

  return ref;
}

// Hook for number counter
export function useCounterAnimation(
  endValue: number,
  options: { duration?: number; start?: number; disabled?: boolean } = {}
) {
  const { duration = 2, start = 0, disabled = false } = options;

  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current || disabled) return;

    const element = ref.current;
    const obj = { value: start };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        value: endValue,
        duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          once: true,
        },
        onUpdate: () => {
          if (element) {
            element.textContent = Math.round(obj.value).toLocaleString();
          }
        },
      });
    });

    return () => ctx.revert();
  }, [endValue, duration, start, disabled]);

  return ref;
}
