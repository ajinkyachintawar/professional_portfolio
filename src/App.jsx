import { useEffect, useState, useRef } from 'react';
import TopBar from './components/TopBar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import HowIWork from './components/HowIWork';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const cleanupRef = useRef([]);

  useEffect(() => {
    // Scrolled state for sticky header shadow
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanupRef.current.push(() => window.removeEventListener('scroll', onScroll));

    const sectionIds = ['about', 'projects', 'how', 'skills', 'contact'];
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;

    // Collect reveal targets
    const revealTargets = [];
    document.querySelectorAll('main > section').forEach((sec) => {
      sec.querySelectorAll(':scope > *').forEach((el) => {
        el.setAttribute('data-reveal', '');
        revealTargets.push(el);
      });
      sec.querySelectorAll('.project').forEach((el) => {
        if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', '');
          revealTargets.push(el);
        }
      });
    });
    document.querySelectorAll('footer.colophon > *').forEach((el) => {
      el.setAttribute('data-reveal', '');
      revealTargets.push(el);
    });

    const observers = [];

    if (!prefersReduced && hasIO) {
      const revealObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObs.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

      document.body.classList.add('reveal-armed');
      revealTargets.forEach((el) => revealObs.observe(el));
      observers.push(revealObs);

      const fallback = setTimeout(() => {
        revealTargets.forEach((el) => el.classList.add('is-visible'));
      }, 1500);
      cleanupRef.current.push(() => clearTimeout(fallback));
    }

    if (hasIO) {
      const spyObs = new IntersectionObserver((entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveSection(visible[0].target.id);
      }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) spyObs.observe(el);
      });
      observers.push(spyObs);
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      cleanupRef.current.forEach((fn) => fn());
      cleanupRef.current = [];
      document.body.classList.remove('reveal-armed');
    };
  }, []);

  return (
    <>
      <TopBar activeSection={activeSection} scrolled={scrolled} />
      <main className="page">
        <Hero />
        <About />
        <Projects />
        <HowIWork />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
