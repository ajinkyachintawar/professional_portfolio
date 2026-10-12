import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Home from './components/Home';
import Header from './components/Header';
import CaseStudy from './components/CaseStudy';
import { parseHash } from './lib/route';
import { profile, projectById } from './content';
import { prefersReducedMotion, useReveal } from './lib/motion';

const DEFAULT_TITLE = `${profile.name} | ${profile.role}`;

// Shared-element title for page swaps: the project name on the page being left
// morphs into the one on the page arriving. Names are set only for the duration
// of one transition, so duplicates never coexist.
const visible = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };
function titleFor(route, prev) {
  if (route.page === 'project') return document.getElementById('case-title');
  const id = prev?.page === 'project' ? prev.id : null;
  return id && [...document.querySelectorAll(`[data-vt-title="${id}"]`)].find(visible);
}

export default function App() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  const prevPage = useRef(null);
  const routeRef = useRef(route);
  useReveal(route.page === 'home');

  useEffect(() => {
    const onHash = () => {
      const next = parseHash(window.location.hash);
      const cur = routeRef.current;
      const swap = next.page !== cur.page || next.id !== cur.id;
      if (!swap || !document.startViewTransition || prefersReducedMotion() || document.hidden) { setRoute(next); return; }
      const named = [];
      const name = (el) => { if (el) { el.style.viewTransitionName = 'project-title'; named.push(el); } };
      const old = cur.page === 'project'
        ? document.getElementById('case-title')
        : [...document.querySelectorAll(`[data-vt-title="${next.id}"]`)].find(visible);
      name(old);
      const vt = document.startViewTransition(() => {
        named.forEach((el) => { el.style.viewTransitionName = ''; });
        // Read the hash again: a newer navigation may have landed while this one waited for a frame.
        const latest = parseHash(window.location.hash);
        flushSync(() => setRoute(latest));
        if (old) name(titleFor(latest, cur));
      });
      // A newer navigation skips this transition; the route still updates, so the rejection is expected.
      vt.ready.catch(() => {});
      vt.finished.catch(() => {}).finally(() => named.forEach((el) => { el.style.viewTransitionName = ''; }));
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  // After a route renders: case studies start at the top with focus on their title.
  // Same-page anchors are left to the browser; arriving from a case study (or a fresh
  // load) the target did not exist yet, so jump to it once the home page has rendered.
  // Layout effect so it runs inside flushSync, before a view transition's new snapshot.
  useLayoutEffect(() => {
    routeRef.current = route;
    const cameFrom = prevPage.current;
    prevPage.current = route.page;
    if (route.page === 'project') {
      const p = projectById[route.id];
      document.title = p ? `${p.name} | ${profile.name}` : DEFAULT_TITLE;
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('case-title')?.focus({ preventScroll: true });
    } else {
      document.title = DEFAULT_TITLE;
      if (cameFrom === 'home') return;
      // Returning from a case study: no second entrance on content already seen.
      if (cameFrom) document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('revealed'));
      const target = route.anchor && document.getElementById(route.anchor);
      if (target) target.scrollIntoView({ behavior: 'instant' });
      else window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [route]);

  return (
    <>
      {/* Focus without changing the hash, which would leave a case study. */}
      <a className="skip-link" href="#main"
        onClick={(e) => { e.preventDefault(); document.getElementById('main').focus(); }}>
        Skip to content
      </a>
      <Header page={route.page} />
      <main id="main" tabIndex={-1}>
        <span id="top" />
        {route.page === 'project' ? <CaseStudy id={route.id} /> : <Home />}
      </main>
      <footer className="site-footer">
        <p>© 2026 {profile.name}</p>
        <p>Built with curiosity. Still exploring.</p>
      </footer>
    </>
  );
}
