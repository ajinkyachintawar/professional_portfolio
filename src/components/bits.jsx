import { projectById } from '../content';
import { projectHref } from '../lib/route';

export function ProjectStatus({ status }) {
  return <span className="project-status" data-status={status.kind}>{status.label}</span>;
}

export function ProjectLink({ id }) {
  return <a className="chip" href={projectHref(id)}>{projectById[id].name}</a>;
}

export function ExternalLink({ href, children, className }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}<span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
