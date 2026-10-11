// Run: npm test
import assert from 'node:assert/strict';
import { parseHash, projectHref } from './route.js';
import { projects, featuredIds, skillGroups, projectById } from '../content.js';

assert.deepEqual(parseHash(''), { page: 'home', anchor: null });
assert.deepEqual(parseHash('#'), { page: 'home', anchor: null });
assert.deepEqual(parseHash('#skills'), { page: 'home', anchor: 'skills' });
assert.deepEqual(parseHash('#/work/apex-1'), { page: 'project', id: 'apex-1' });
assert.deepEqual(parseHash('#/work/apex-1/'), { page: 'project', id: 'apex-1' });
assert.deepEqual(parseHash('#/elsewhere'), { page: 'home', anchor: null });
assert.deepEqual(parseHash('#%'), { page: 'home', anchor: null });
assert.deepEqual(parseHash('#%E0%A4%A'), { page: 'home', anchor: null });
assert.deepEqual(parseHash('#skill-%C3%A9'), { page: 'home', anchor: 'skill-é' });
for (const p of projects) assert.deepEqual(parseHash(projectHref(p.id)), { page: 'project', id: p.id });

// Content integrity: every cross-reference resolves.
assert.equal(projects.length, 8);
for (const id of featuredIds) assert.ok(projectById[id], `featured ${id}`);
const skillIds = new Set(skillGroups.flatMap((g) => g.skills.map((s) => s.id)));
for (const p of projects) for (const s of p.skills) assert.ok(skillIds.has(s), `${p.id} → skill ${s}`);

console.log('route and content checks passed');
