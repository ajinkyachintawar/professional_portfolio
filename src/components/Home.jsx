import { ProjectStatus } from './bits';
import { profile, about, contact, projects, featuredIds, projectById, skillGroups } from '../content';
import { projectHref } from '../lib/route';

function Intro() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <div className="intro-text">
        <h1 id="intro-title">Hi, I’m Ajinkya.</h1>
        <p className="intro-statement">{profile.statement}</p>
        <p className="intro-summary">{profile.summary}</p>
        <div className="actions">
          <a className="button button-primary" href="#work">Explore my work</a>
          <a className="text-link" href="#about">A little about me <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="intro-notebook">
        <p className="notebook-title">A few questions I’ve been building around.</p>
        {['adversarialci', 'groundwork', 'glowup'].map(id => {
          const p = projectById[id];
          return <a className="question-link" key={id} href={projectHref(id)}>
            <span>{p.question}</span><span className="question-project">{p.name} <span aria-hidden="true">↗</span></span>
          </a>;
        })}
      </div>
    </section>
  );
}

function Feature({ project, index }) {
  return (
    <article className="story-feature" data-project={project.id} aria-labelledby={`f-${project.id}`} data-reveal>
      <div className="story-prompt">
        <p>{project.question}</p>
        <span className="story-subject">{['AI + research', 'Data + housing', 'AI + decision-making', 'Developer tools'][index]}</span>
      </div>
      <div className="feature-text">
        <h3 id={`f-${project.id}`} data-vt-title={project.id}>{project.name}</h3>
        <p className="feature-tagline">{project.tagline}</p>
        <p className="feature-summary">{project.summary}</p>
        <ProjectStatus status={project.status} />
        <a className="text-link" href={projectHref(project.id)}>Inside {project.name}<span aria-hidden="true"> ↗</span></a>
      </div>
    </article>
  );
}

function SelectedWork() {
  return <section id="work" className="section" aria-labelledby="work-title">
    <header className="section-head" data-reveal>
      <h2 id="work-title">Things I’ve built.</h2>
      <p>Different problems. Plenty to figure out.</p>
    </header>
    <div className="stories">{featuredIds.map((id, i) => <Feature key={id} project={projectById[id]} index={i} />)}</div>
  </section>;
}

function Skills() {
  return <section id="skills" className="section" aria-labelledby="skills-title">
    <header className="section-head" data-reveal><h2 id="skills-title">What I work with.</h2></header>
    <div className="skill-groups" data-reveal>
      {skillGroups.map((g, i) => <section key={g.title} className="skill-group" aria-labelledby={`sg-${i}`}>
        <h3 id={`sg-${i}`}>{g.title}</h3>
        <ul className="skill-list">{g.skills.map(s => <li key={s.id} id={`skill-${s.id}`} className="skill">{s.name}</li>)}</ul>
      </section>)}
    </div>
  </section>;
}

function AllProjects() {
  return <section id="projects" className="section" aria-labelledby="projects-title">
    <header className="section-head" data-reveal><h2 id="projects-title">Keep exploring.</h2><p>All eight projects, including the smaller experiments and personal builds.</p></header>
    <ul className="project-index" data-reveal>{projects.map(p => <li key={p.id} className="index-row">
      <h3 className="index-name" data-vt-title={p.id}><a href={projectHref(p.id)}>{p.name}</a></h3>
      <p className="index-tagline">{p.tagline}</p>
      <a className="index-open" href={projectHref(p.id)} aria-label={`Explore ${p.name}`}><span aria-hidden="true">↗</span></a>
    </li>)}</ul>
  </section>;
}

function About() {
  return <section id="about" className="section about" aria-labelledby="about-title">
    <header className="section-head" data-reveal><h2 id="about-title">The part I enjoy most?<br />Figuring it out.</h2></header>
    <div className="about-text" data-reveal>{about.paragraphs.map(t => <p key={t}>{t}</p>)}</div>
  </section>;
}

function Contact() {
  return <section id="contact" className="section contact" aria-labelledby="contact-title">
    <header className="section-head" data-reveal><h2 id="contact-title">What are you working on?</h2><p>If a project caught your attention, or you have a problem you’d like to talk through, I’d love to hear about it.</p></header>
    <ul className="contact-list" data-reveal>{contact.map(c => <li key={c.id}>
      <a className="contact-link" href={c.href} {...(c.href.startsWith('http') && {target:'_blank',rel:'noopener noreferrer'})}>
        <span className="contact-label">{c.label} <span aria-hidden="true">↗</span></span><span className="contact-handle">{c.handle}</span>
      </a>
    </li>)}</ul>
  </section>;
}

export default function Home() {
  return <><Intro /><SelectedWork /><About /><Skills /><AllProjects /><Contact /></>;
}
