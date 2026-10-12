import { useEffect, useState } from 'react';

const NAV = [
  ['work', 'Work'],
  ['skills', 'Skills'],
  ['projects', 'Projects'],
  ['about', 'About'],
];

export default function Header({ page }) {
  const [section, setSection] = useState('');
  useEffect(() => {
    if (page !== 'home') return;
    let frame;
    const update = () => {
      frame = undefined;
      const sections = [...NAV.map(([id]) => id), 'contact']
        .map(id => document.getElementById(id)).filter(Boolean)
        .sort((a, b) => a.offsetTop - b.offsetTop);
      const line = Math.min(innerHeight * 0.35, 260);
      const current = sections.filter(el => el.getBoundingClientRect().top <= line).at(-1);
      const atEnd = scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 2;
      setSection(atEnd ? 'contact' : current?.id || '');
    };
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [page]);
  const active = page === 'project' ? 'work' : section;
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Ajinkya Chintawar, home">
          <span className="brand-mark" aria-hidden="true">ac<span>.</span></span>
          <span className="brand-name">Ajinkya<span className="brand-surname"> Chintawar</span></span>
        </a>
        <nav aria-label="Primary">
          <ul>{NAV.map(([id, label]) => <li key={id}>
            <a href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{label}</a>
          </li>)}</ul>
        </nav>
        <a className="nav-contact" href="#contact" aria-current={active === 'contact' ? 'location' : undefined}>
          Let’s talk
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 18 18 6M6 6h12v12" /></svg>
        </a>
      </div>
    </header>
  );
}
