export default function ArchitectureDiagram() {
  return (
    <figure className="arch-diagram" aria-label="AdversarialCI system architecture">
      <svg viewBox="0 0 760 500" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: 'var(--sans)' }}>
        <defs>
          <marker id="ad-a"  viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#7a7269"/>
          </marker>
          <marker id="ad-ag" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#3d7030"/>
          </marker>
          <marker id="ad-ao" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#b67e2a"/>
          </marker>
        </defs>

        {/* Background */}
        <rect width="760" height="500" rx="10" fill="#ede5d0" stroke="#d8cdb4" strokeWidth="1"/>

        {/* ── ROW 1 — INPUT ── */}
        <rect x="255" y="16" width="250" height="34" rx="17"
              fill="#e4eef8" stroke="#2d4a6e" strokeWidth="1.5"/>
        <text x="380" y="37" textAnchor="middle" fill="#2d4a6e"
              fontSize="11" fontWeight="600">User Query + Competitive Context</text>

        <line x1="380" y1="50" x2="380" y2="64"
              stroke="#7a7269" strokeWidth="1.5" markerEnd="url(#ad-a)"/>

        {/* ── ROW 2 — LANGGRAPH ── */}
        <rect x="40" y="64" width="680" height="34" rx="6"
              fill="#e4eef8" stroke="#2d4a6e" strokeWidth="1"/>
        <text x="56" y="83" fill="#2d4a6e" fontSize="8" fontWeight="700" letterSpacing="2">LANGGRAPH</text>
        <text x="152" y="84" fill="#4a4742" fontSize="9">db_check</text>
        <text x="212" y="84" fill="#7a7269" fontSize="9">→</text>
        <text x="223" y="84" fill="#4a4742" fontSize="9">source_router</text>
        <text x="309" y="84" fill="#7a7269" fontSize="9">→</text>
        <text x="320" y="84" fill="#4a4742" fontSize="9">verifier</text>
        <text x="369" y="84" fill="#7a7269" fontSize="9">→</text>
        <text x="380" y="84" fill="#4a4742" fontSize="9">court_session</text>
        <rect x="556" y="73" width="152" height="17" rx="8"
              fill="#faf0e2" stroke="#c89040" strokeWidth="1"/>
        <text x="632" y="85" textAnchor="middle" fill="#8a5e1a"
              fontSize="7.5" fontWeight="600">⚡ Groq · Llama-3.3-70b</text>

        <line x1="380" y1="98" x2="380" y2="112"
              stroke="#7a7269" strokeWidth="1.5" markerEnd="url(#ad-a)"/>

        {/* ── ROW 3 — DATA INGESTION + RAG ── */}
        {[
          { x: 40,  w: 100, label: 'Crawl4AI',  note: 'web' },
          { x: 148, w: 80,  label: 'PRAW',       note: 'reddit' },
          { x: 236, w: 100, label: 'GitHub API', note: 'repos' },
          { x: 344, w: 84,  label: 'Tavily',     note: 'search' },
        ].map(({ x, w, label, note }) => (
          <g key={label}>
            <rect x={x} y={112} width={w} height={28} rx="5"
                  fill="#f5edd8" stroke="#c8bca8" strokeWidth="1"/>
            <text x={x + w / 2} y={124} textAnchor="middle"
                  fill="#4a4742" fontSize="9.5" fontWeight="500">{label}</text>
            <text x={x + w / 2} y={135} textAnchor="middle"
                  fill="#7a7269" fontSize="7.5">{note}</text>
          </g>
        ))}

        <line x1="436" y1="126" x2="452" y2="126"
              stroke="#3d7030" strokeWidth="1.5" markerEnd="url(#ad-ag)"/>

        <rect x="456" y="112" width="264" height="28" rx="5"
              fill="#ecf5ea" stroke="#3d7030" strokeWidth="1"/>
        <text x="588" y="124" textAnchor="middle"
              fill="#2d5a28" fontSize="9.5" fontWeight="500">MongoDB Atlas · Vector RAG</text>
        <text x="588" y="135" textAnchor="middle"
              fill="#5a8a4a" fontSize="7.5">cosine similarity · embeddings pipeline</text>

        <line x1="380" y1="140" x2="380" y2="154"
              stroke="#7a7269" strokeWidth="1.5" markerEnd="url(#ad-a)"/>

        {/* ── ROW 4 — COURT SESSION ── */}
        <rect x="40" y="154" width="680" height="252" rx="10"
              fill="#f5f0e8" stroke="#2d4a6e" strokeWidth="1.5"/>
        {/* Header */}
        <rect x="40" y="154" width="680" height="26" rx="10" fill="#d4e2f2"/>
        <rect x="40" y="168" width="680" height="12" fill="#d4e2f2"/>
        <text x="56" y="171" fill="#2d4a6e" fontSize="8" fontWeight="700" letterSpacing="2">COURT SESSION</text>
        <text x="710" y="171" textAnchor="end" fill="#5a7a9a"
              fontSize="8">3-round adversarial evaluation · LangGraph WarRoomState</text>

        {/* Round 1 — Researcher */}
        <rect x="56" y="188" width="370" height="52" rx="7"
              fill="#e8f2fc" stroke="#2d4a6e" strokeWidth="1.5"/>
        <circle cx="79" cy="214" r="10" fill="rgba(45,74,110,0.12)"/>
        <text x="79" y="218" textAnchor="middle" fill="#2d4a6e" fontSize="11" fontWeight="700">1</text>
        <text x="99" y="208" fill="#1a1a1a" fontSize="11" fontWeight="600">Researcher Agent</text>
        <text x="99" y="223" fill="#7a7269" fontSize="9">Gathers data · RAG retrieval · proposes opening statements</text>
        <rect x="374" y="196" width="38" height="15" rx="3"
              fill="#d4e2f2" stroke="#2d4a6e20" strokeWidth="1"/>
        <text x="393" y="207" textAnchor="middle" fill="#2d4a6e" fontSize="7.5" fontWeight="600">RAG</text>

        {/* state arrow */}
        <line x1="241" y1="240" x2="241" y2="254"
              stroke="#c8bca8" strokeWidth="1.5" strokeDasharray="3,2"
              markerEnd="url(#ad-a)"/>
        <text x="255" y="249" fill="#7a7269" fontSize="7.5" fontStyle="italic">state pass · round_1</text>

        {/* Round 2 — Cross-Examination */}
        <rect x="56" y="256" width="370" height="52" rx="7"
              fill="#e8f2fc" stroke="#2d4a6e" strokeWidth="1.5"/>
        <circle cx="79" cy="282" r="10" fill="rgba(45,74,110,0.12)"/>
        <text x="79" y="286" textAnchor="middle" fill="#2d4a6e" fontSize="11" fontWeight="700">2</text>
        <text x="99" y="276" fill="#1a1a1a" fontSize="11" fontWeight="600">Cross-Examination</text>
        <text x="99" y="291" fill="#7a7269" fontSize="9">Primary attacks each competitor · LLM chain per matchup</text>
        <rect x="356" y="264" width="64" height="15" rx="3"
              fill="#faf0e2" stroke="#c8904030" strokeWidth="1"/>
        <text x="388" y="275" textAnchor="middle" fill="#8a5e1a" fontSize="7.5" fontWeight="600">LLM chains</text>

        {/* state arrow */}
        <line x1="241" y1="308" x2="241" y2="322"
              stroke="#c8bca8" strokeWidth="1.5" strokeDasharray="3,2"
              markerEnd="url(#ad-a)"/>
        <text x="255" y="317" fill="#7a7269" fontSize="7.5" fontStyle="italic">state pass · round_2</text>

        {/* Round 3 — Adversarial Challenger */}
        <rect x="56" y="324" width="370" height="50" rx="7"
              fill="#fcecea" stroke="#c04040" strokeWidth="2"/>
        <circle cx="79" cy="349" r="10" fill="rgba(192,64,64,0.12)"/>
        <text x="79" y="353" textAnchor="middle" fill="#c04040" fontSize="11" fontWeight="700">3</text>
        <text x="99" y="344" fill="#1a1a1a" fontSize="11" fontWeight="600">Adversarial Challenger</text>
        <text x="99" y="359" fill="#7a7269" fontSize="9">Stress-tests claims · demands evidence · plaintiff challenge</text>
        <rect x="356" y="332" width="64" height="15" rx="3"
              fill="#fcecea" stroke="#c0404030" strokeWidth="1"/>
        <text x="388" y="343" textAnchor="middle" fill="#c04040" fontSize="7.5" fontWeight="600">⚡ verdict</text>

        {/* ── ADVERSARIAL FEEDBACK LOOP — right column of court section ── */}
        <path d="M 432 349 C 690 349, 690 214, 432 214"
              stroke="#b67e2a" strokeWidth="2" fill="none"
              strokeDasharray="7,3" markerEnd="url(#ad-ao)"/>
        <rect x="600" y="264" width="82" height="52" rx="6"
              fill="rgba(182,126,42,0.09)" stroke="rgba(182,126,42,0.30)" strokeWidth="1"/>
        <text x="641" y="283" textAnchor="middle"
              fill="#8a5e1a" fontSize="7.5" fontWeight="700" letterSpacing="1">ADVERSARIAL</text>
        <text x="641" y="296" textAnchor="middle"
              fill="#8a5e1a" fontSize="7.5" fontWeight="700" letterSpacing="1">FEEDBACK</text>
        <text x="641" y="309" textAnchor="middle"
              fill="#8a5e1a" fontSize="7.5" fontWeight="700" letterSpacing="1">LOOP</text>

        {/* round labels */}
        <text x="438" y="214" fill="#4a7aa0" fontSize="8" fontStyle="italic">round_1: opening_statements</text>
        <text x="438" y="282" fill="#4a7aa0" fontSize="8" fontStyle="italic">round_2: cross_examinations</text>
        <text x="438" y="349" fill="#a05050" fontSize="8" fontStyle="italic">round_3: challenge_responses</text>

        <line x1="380" y1="406" x2="380" y2="420"
              stroke="#7a7269" strokeWidth="1.5" markerEnd="url(#ad-a)"/>

        {/* ── ROW 5 — OUTPUT ── */}
        <rect x="40" y="420" width="200" height="36" rx="6"
              fill="#ecf5ea" stroke="#3d7030" strokeWidth="1.5"/>
        <text x="140" y="437" textAnchor="middle" fill="#2d5a28" fontSize="10" fontWeight="600">Cited Report + Verdict</text>
        <text x="140" y="449" textAnchor="middle" fill="#5a8a4a" fontSize="7.5">saved to MongoDB Atlas</text>

        <line x1="240" y1="438" x2="258" y2="438"
              stroke="#7a7269" strokeWidth="1.5" markerEnd="url(#ad-a)"/>

        <rect x="262" y="420" width="180" height="36" rx="6"
              fill="#fcecea" stroke="#c04040" strokeWidth="1.2"/>
        <text x="352" y="437" textAnchor="middle" fill="#c04040" fontSize="10" fontWeight="600">FastAPI</text>
        <text x="352" y="449" textAnchor="middle" fill="#a05050" fontSize="7.5">SSE streaming · 15 endpoints</text>

        <line x1="442" y1="438" x2="460" y2="438"
              stroke="#7a7269" strokeWidth="1.5" markerEnd="url(#ad-a)"/>
        <text x="451" y="433" textAnchor="middle" fill="#7a7269" fontSize="7">SSE</text>

        <rect x="464" y="420" width="256" height="36" rx="6"
              fill="#e8f2fc" stroke="#2d4a6e" strokeWidth="1.2"/>
        <text x="592" y="437" textAnchor="middle" fill="#2d4a6e" fontSize="10" fontWeight="600">React Dashboard</text>
        <text x="592" y="449" textAnchor="middle" fill="#5a7a9a" fontSize="7.5">real-time report generation · vendor registry</text>

        {/* Footer */}
        <text x="380" y="480" textAnchor="middle" fill="#7a7269" fontSize="8" letterSpacing="0.3">
          87.9% accuracy · LangGraph · MongoDB Atlas · Groq Llama-3.3-70b · FastAPI · React
        </text>
      </svg>
    </figure>
  );
}
