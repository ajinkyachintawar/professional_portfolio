import { useEffect, useRef, useState } from 'react';

const links = [
  { href: '#about',    label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#how',      label: 'How I Work' },
  { href: '#skills',   label: 'Skills' },
  { href: '#contact',  label: 'Contact' },
];

export default function TopBar({ activeSection, scrolled }) {
  const navRef = useRef(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });

  useEffect(() => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector('a.is-active');
    if (activeLink) {
      const navRect = navRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      setIndicator({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        visible: true,
      });
    } else {
      setIndicator((prev) => ({ ...prev, visible: false }));
    }
  }, [activeSection]);

  return (
    <header className={`topbar${scrolled ? ' is-scrolled' : ''}`}>
      <div className="topbar-inner">
        <span className="mark">Ajinkya Chintawar</span>
        <nav ref={navRef} className="topbar-nav">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={activeSection === href.slice(1) ? 'is-active' : ''}
            >
              {label}
            </a>
          ))}
          <span
            className="nav-indicator"
            style={{
              left: indicator.left,
              width: indicator.width,
              opacity: indicator.visible ? 1 : 0,
            }}
          />
        </nav>
      </div>
    </header>
  );
}
