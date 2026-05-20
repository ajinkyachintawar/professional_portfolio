export default function TopBar({ activeSection }) {
  const links = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#how', label: 'How I Work' },
    { href: '#skills', label: 'Skills' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="topbar">
      <span className="mark">Ajinkya Chintawar</span>
      <nav>
        {links.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className={activeSection === href.slice(1) ? 'is-active' : ''}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}
