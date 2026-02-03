# Qraft Animation System - Implementation Guide

## ✅ What's Been Implemented

### 1. **GSAP Core Setup** ✓
- Installed GSAP library (v3.14.2)
- Registered ScrollTrigger plugin globally
- Created smooth scroll provider wrapping the entire app

### 2. **Animation Utilities** (`src/lib/animations.ts`) ✓
- **Presets**: fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleIn, scaleInBounce, slideInUp, slideInDown
- **Scroll Configurations**: default, sticky, parallax, fadeOnScroll
- **Helper Functions**:
  - `createScrollAnimation()` - Scroll-triggered animations
  - `createStaggerAnimation()` - Staggered animations for multiple elements
  - `hoverScale()`, `hoverLift()` - Hover effects
  - `buttonPress()` - Button press effect
  - `createMagneticEffect()` - Magnetic button hover
  - `animateNumber()` - Counter animations
  - `splitTextReveal()` - Text reveal animations

### 3. **Custom React Hooks** (`src/hooks/useScrollAnimation.ts`) ✓
- `useScrollAnimation()` - Scroll-triggered animations on any element
- `useStaggerAnimation()` - Animate children with stagger
- `useParallax()` - Parallax scrolling effect
- `useHoverAnimation()` - Smooth hover interactions
- `useCounterAnimation()` - Animated number counters

### 4. **Reusable Components** ✓
- `<SmoothScrollProvider>` - Global smooth scroll + ScrollTrigger management
- `<AnimatedSection>` - Wrapper for scroll animations

---

## 🎨 How to Use

### **Basic Scroll Animation**

```tsx
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function MyComponent() {
  const ref = useScrollAnimation({ animation: 'fadeInUp', delay: 0.2 });

  return (
    <div ref={ref}>
      This will fade in and slide up when scrolled into view
    </div>
  );
}
```

### **Stagger Animation (Multiple Children)**

```tsx
import { useStaggerAnimation } from '@/hooks/useScrollAnimation';

function BadgeList() {
  const ref = useStaggerAnimation({
    animation: 'scaleIn',
    stagger: 0.15, // 150ms between each
    delay: 0.3
  });

  return (
    <div ref={ref}>
      <div>Badge 1</div>
      <div>Badge 2</div>
      <div>Badge 3</div>
    </div>
  );
}
```

### **Hover Animation**

```tsx
import { useHoverAnimation } from '@/hooks/useScrollAnimation';

function Card() {
  const ref = useHoverAnimation({ scale: 1.05, y: -10 });

  return (
    <div ref={ref}>
      Hover me!
    </div>
  );
}
```

### **Parallax Effect**

```tsx
import { useParallax } from '@/hooks/useScrollAnimation';

function Hero() {
  const ref = useParallax({ speed: 0.5, direction: 'up' });

  return (
    <div ref={ref}>
      This moves slower than scroll (parallax)
    </div>
  );
}
```

### **Counter Animation**

```tsx
import { useCounterAnimation } from '@/hooks/useScrollAnimation';

function Stats() {
  const ref = useCounterAnimation(250000, { duration: 2 });

  return (
    <span ref={ref}>0</span> // Will count from 0 to 250,000
  );
}
```

---

## 🚀 Recommended Implementations for Your Page

### **1. Hero Section Animations**

```tsx
// Trust Badges - scale in with stagger
const trustBadgesRef = useStaggerAnimation<HTMLDivElement>({
  animation: 'scaleIn',
  stagger: 0.1,
  delay: 0.2
});

<div ref={trustBadgesRef} className="flex gap-3">
  <div>✓ 100% Free Forever</div>
  <div>✓ No Signup Required</div>
  <div>✓ Unlimited Downloads</div>
</div>

// Headline - fade in up
const headlineRef = useScrollAnimation<HTMLHeadingElement>({
  animation: 'fadeInUp',
  delay: 0.3
});

<h1 ref={headlineRef}>Create Beautiful QR Codes</h1>

// CTA Button - scale in with bounce
const ctaRef = useScrollAnimation<HTMLButtonElement>({
  animation: 'scaleInBounce',
  delay: 0.7
});

<Button ref={ctaRef}>Start Creating Free →</Button>
```

### **2. Tool Section Animation**

```tsx
const toolSectionRef = useScrollAnimation<HTMLDivElement>({
  animation: 'fadeInUp',
  start: 'top 90%'
});

<div id="qr-tool" ref={toolSectionRef}>
  {/* Editor content */}
</div>
```

### **3. QR Preview Animation**

```tsx
// Animate when QR code changes
const previewRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (previewRef.current && payload) {
    gsap.fromTo(
      previewRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
    );
  }
}, [payload]);

<div ref={previewRef}>
  <AdvancedQRPreview options={qrOptions} />
</div>
```

###  **4. Collapsible Section Animations**

```tsx
const toggleSection = (section: string) => {
  setExpandedSection(expandedSection === section ? null : section);

  // Animate chevron rotation
  const chevron = document.querySelector(`[data-section="${section}"] svg`);
  if (chevron) {
    gsap.to(chevron, {
      rotation: expandedSection === section ? 0 : 180,
      duration: 0.3,
      ease: 'power2.out'
    });
  }
};

// Animate content reveal
{expandedSection === 'colors' && (
  <CardContent>
    {/* Content animates in automatically with CSS */}
  </CardContent>
)}
```

### **5. Button Hover Effects**

Add to button component:

```tsx
import { useHoverAnimation } from '@/hooks/useScrollAnimation';

function Button({ children, ...props }: ButtonProps) {
  const ref = useHoverAnimation({ scale: 1.02, y: -2 });

  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
}
```

### **6. Header Animation on Mount**

```tsx
useEffect(() => {
  gsap.from('header', {
    y: -100,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
  });
}, []);
```

---

## 🎯 Animation Best Practices

1. **Performance**:
   - Use `will-change: transform` in CSS for animated elements
   - Avoid animating `width`, `height`, `top`, `left` - use `transform` instead
   - Set `once: true` for animations that should only play once

2. **Timing**:
   - Keep delays subtle (0.1-0.7s)
   - Stagger children by 0.05-0.15s
   - Total animation duration: 0.3-0.8s

3. **Easing**:
   - **Entrances**: `power3.out`, `back.out(1.7)`, `elastic.out(1, 0.5)`
   - **Exits**: `power2.in`
   - **Interactions**: `power2.inOut`

4. **Scroll Triggers**:
   - **Default start**: `'top 85%'` (triggers when element is 15% from bottom of viewport)
   - **Early start**: `'top 95%'` (triggers sooner)
   - **Late start**: `'top 70%'` (triggers later)

---

## 📦 Files Created

1. ✅ `/src/lib/animations.ts` - Animation utilities and presets
2. ✅ `/src/hooks/useScrollAnimation.ts` - React hooks for animations
3. ✅ `/src/components/SmoothScrollProvider.tsx` - Global scroll setup
4. ✅ `/src/components/AnimatedSection.tsx` - Reusable animated wrapper
5. ✅ Updated `/src/app/layout.tsx` - Added SmoothScrollProvider

---

## 🔄 Next Steps

1. **Add refs to page.tsx sections** using the patterns above
2. **Test scroll animations** by scrolling through the page
3. **Fine-tune timings** based on feel
4. **Add micro-interactions** to buttons/inputs
5. **Consider adding**:
   - Page transition animations
   - Loading animations
   - Success/error toast animations
   - Modal entrance/exit animations

---

## 🎬 Animation Examples by Section

| Section | Recommended Animation | Delay |
|---------|---------------------|-------|
| Trust Badges | `scaleIn` (stagger) | 0.2s |
| Headline | `fadeInUp` | 0.3s |
| Subheadline | `fadeInUp` | 0.5s |
| Social Proof | `fadeIn` | 0.6s |
| CTA Button | `scaleInBounce` | 0.7s |
| Tool Section | `fadeInUp` | - |
| QR Preview | Custom (on change) | - |
| Footer | `fadeIn` | - |

---

## 💡 Tips

- **Disable animations** during development by setting `disabled: true` in hook options
- **Debug ScrollTrigger** with `markers: true` in scrollTrigger config
- **Chain animations** using GSAP timelines for complex sequences
- **Reduce motion** - respect user preferences with `prefers-reduced-motion`

---

Happy animating! 🎨✨
