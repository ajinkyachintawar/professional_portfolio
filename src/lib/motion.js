import { useEffect, useState } from 'react';

const RM = '(prefers-reduced-motion: reduce)';
export const prefersReducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.(RM).matches;

// Calls back whenever the user switches reduced motion on (live, no reload needed).
export function onReducedMotion(cb) {
  const mq = window.matchMedia(RM);
  const on = () => { if (mq.matches) cb(); };
  mq.addEventListener('change', on);
  return () => mq.removeEventListener('change', on);
}

// True while the element is at least partly on screen. Used to pause demos off-screen.
export function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return inView;
}

// Entrance reveal for [data-reveal] elements. Content is visible by default; the
// hidden starting state only applies once <html> carries .reveal-armed, which is
// set here and never under reduced motion, so a failure leaves everything readable.
export function useReveal(dep) {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    root.classList.add('reveal-armed');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal]:not(.revealed)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}
