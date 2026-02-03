import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Animation presets
export const animationPresets = {
  // Fade animations
  fadeIn: {
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
  },
  fadeInUp: {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
  },
  fadeInDown: {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: 'power3.out',
  },
  fadeInLeft: {
    opacity: 0,
    x: -30,
    duration: 0.8,
    ease: 'power3.out',
  },
  fadeInRight: {
    opacity: 0,
    x: 30,
    duration: 0.8,
    ease: 'power3.out',
  },

  // Scale animations
  scaleIn: {
    opacity: 0,
    scale: 0.8,
    duration: 0.6,
    ease: 'back.out(1.7)',
  },
  scaleInBounce: {
    opacity: 0,
    scale: 0.5,
    duration: 0.8,
    ease: 'elastic.out(1, 0.5)',
  },

  // Slide animations
  slideInUp: {
    y: 100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  },
  slideInDown: {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  },

  // Stagger animations
  staggerFadeIn: {
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out',
  },
  staggerScale: {
    opacity: 0,
    scale: 0.8,
    stagger: 0.15,
    duration: 0.5,
    ease: 'back.out(1.7)',
  },
};

// Scroll trigger configurations
export const scrollTriggerConfig = {
  default: {
    start: 'top 85%',
    end: 'bottom 15%',
    toggleActions: 'play none none reverse',
  },
  sticky: {
    start: 'top top',
    end: 'bottom bottom',
    pin: true,
    scrub: true,
  },
  parallax: {
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1,
  },
  fadeOnScroll: {
    start: 'top 80%',
    toggleActions: 'play none none reverse',
  },
};

// Utility functions
export const createScrollAnimation = (
  element: string | Element,
  animation: gsap.TweenVars,
  scrollConfig?: ScrollTrigger.Vars
) => {
  return gsap.from(element, {
    ...animation,
    scrollTrigger: {
      trigger: element,
      ...scrollTriggerConfig.default,
      ...scrollConfig,
    },
  });
};

export const createStaggerAnimation = (
  elements: string | Element[],
  animation: gsap.TweenVars,
  scrollConfig?: ScrollTrigger.Vars
) => {
  return gsap.from(elements, {
    ...animation,
    scrollTrigger: scrollConfig
      ? {
          trigger: Array.isArray(elements) ? elements[0] : elements,
          ...scrollTriggerConfig.default,
          ...scrollConfig,
        }
      : undefined,
  });
};

// Smooth scroll setup
export const enableSmoothScroll = () => {
  if (typeof window === 'undefined') return;

  // Enable smooth scrolling behavior
  document.documentElement.style.scrollBehavior = 'smooth';
};

// Hover animations
export const hoverScale = (scale = 1.05, duration = 0.3) => ({
  scale,
  duration,
  ease: 'power2.out',
});

export const hoverLift = (y = -5, duration = 0.3) => ({
  y,
  duration,
  ease: 'power2.out',
});

// Button press animation
export const buttonPress = (element: Element) => {
  gsap.to(element, {
    scale: 0.95,
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: 'power2.inOut',
  });
};

// Magnetic button effect
export const createMagneticEffect = (button: HTMLElement, strength = 0.3) => {
  const handleMouseMove = (e: MouseEvent) => {
    const { left, top, width, height } = button.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(button, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Page transition
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: 'easeInOut' },
};

// Number counter animation
export const animateNumber = (
  element: HTMLElement,
  start: number,
  end: number,
  duration = 2
) => {
  const obj = { value: start };
  gsap.to(obj, {
    value: end,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
  });
};

// Reveal text animation
export const splitTextReveal = (element: HTMLElement) => {
  const text = element.textContent || '';
  const chars = text.split('');
  element.innerHTML = chars
    .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');

  return gsap.from(element.children, {
    opacity: 0,
    y: 20,
    stagger: 0.03,
    duration: 0.6,
    ease: 'power2.out',
  });
};

// Cleanup function
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
