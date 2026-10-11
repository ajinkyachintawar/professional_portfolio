// Hash routes: "#/work/<id>" opens a case study; any other hash is a home-page anchor.
export function parseHash(hash = '') {
  const m = /^#\/work\/([a-z0-9-]+)\/?$/.exec(hash);
  if (m) return { page: 'project', id: m[1] };
  const anchor = hash.length > 1 && !hash.startsWith('#/') ? safeDecode(hash.slice(1)) : null;
  return { page: 'home', anchor };
}

// A hand-edited fragment like "#%" must not take the whole page down.
function safeDecode(s) {
  try { return decodeURIComponent(s); } catch { return null; }
}

export const projectHref = (id) => `#/work/${id}`;
