const links = [
  {
    href: 'mailto:ajinkyachintawar12@gmail.com',
    label: 'Email',
    handle: 'ajinkyachintawar12@gmail.com',
    note: 'Best route for role discussions and project conversations.',
  },
  {
    href: 'https://github.com/ajinkyachintawar',
    label: 'GitHub',
    handle: 'github.com/ajinkyachintawar',
    note: 'Source code and project implementation detail.',
  },
  {
    href: 'https://www.linkedin.com/in/ajinkya-chintawar/',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/ajinkya-chintawar',
    note: 'Professional profile and role context.',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="contact" data-screen-label="06 Contact">
      <span className="section-label"><span className="num">05</span>Contact</span>
      <h2>If the work feels like a fit, say hello.</h2>

      <p className="lede">
        I'm looking for a role where analytics and agents sit at the same table:
        data, infra, or applied AI on a team that ships.
      </p>

      <p>
        Email is the simplest way to start. GitHub has the code; LinkedIn has the formal
        version. Based in Dublin, open to hybrid or remote within Ireland and the EU.
        Available immediately.
      </p>

      <div className="contact-meta">
        <span>Dublin, Ireland</span>
        <span><span className="dot" />Available immediately</span>
      </div>

      <div className="useful-links">
        {links.map(({ href, label, handle, note }) => (
          <a
            key={label}
            className="ul-card"
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          >
            <span className="ul-label">{label}</span>
            <span className="ul-handle">{handle}</span>
            <span className="ul-note">{note}</span>
          </a>
        ))}
      </div>

      <p className="cv-line">
        If you prefer the one-page version,{' '}
        <a href="https://github.com/ajinkyachintawar/Resume" target="_blank" rel="noopener noreferrer">
          the CV is on GitHub
        </a>
        .
      </p>
    </section>
  );
}
