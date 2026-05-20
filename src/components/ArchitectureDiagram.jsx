export default function ArchitectureDiagram() {
  return (
    <figure className="arch-diagram" aria-label="AdversarialCI system architecture">
      <svg viewBox="0 0 720 484" xmlns="http://www.w3.org/2000/svg" style={{ fontFamily: 'var(--sans)' }}>
        <defs>
          <marker id="ad-a"  viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#4a4038"/>
          </marker>
          <marker id="ad-ab" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#4a7ab5"/>
          </marker>
          <marker id="ad-ag" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#5a8a4a"/>
          </marker>
          <marker id="ad-ao" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#c4842a"/>
          </marker>
        </defs>

        {/* ── Background ── */}
        <rect width="720" height="484" rx="10" fill="#111009"/>

        {/* ═══════════════════════════════════════════ */}
        {/* ROW 1 — INPUT                               */}
        {/* ═══════════════════════════════════════════ */}
        <rect x="240" y="18" width="240" height="34" rx="17"
              fill="#1c1a16" stroke="#4a7ab5" strokeWidth="1.5"/>
        <text x="360" y="39" textAnchor="middle" fill="#b8b0a4"
              fontSize="11" fontWeight="500">User Query + Competitive Context</text>

        {/* arrow ↓ */}
        <line x1="360" y1="52" x2="360" y2="66"
              stroke="#3a3028" strokeWidth="1.5" markerEnd="url(#ad-a)"/>

        {/* ═══════════════════════════════════════════ */}
        {/* ROW 2 — LANGGRAPH ORCHESTRATOR              */}
        {/* ═══════════════════════════════════════════ */}
        <rect x="40" y="66" width="640" height="34" rx="6"
              fill="#0d1420" stroke="#2d4a6e" strokeWidth="1"/>
        <text x="56" y="87" fill="#4a7ab5" fontSize="8" fontWeight="700" letterSpacing="2">LANGGRAPH</text>
        <text x="152" y="88" fill="#6a8aaa" fontSize="9">db_check</text>
        <text x="209" y="88" fill="#384858" fontSize="9">→</text>
        <text x="220" y="88" fill="#6a8aaa" fontSize="9">source_router</text>
        <text x="302" y="88" fill="#384858" fontSize="9">→</text>
        <text x="314" y="88" fill="#6a8aaa" fontSize="9">verifier</text>
        <text x="363" y="88" fill="#384858" fontSize="9">→</text>
        <text x="375" y="88" fill="#6a8aaa" fontSize="9">court_session</text>
        <rect x="540" y="74" width="128" height="18" rx="9"
              fill="#1a0a2a" stroke="#6030a040" strokeWidth="1"/>
        <text x="604" y="86" textAnchor="middle" fill="#9070d0"
              fontSize="8" fontWeight="600">⚡ Groq · Llama-3.3-70b</text>

        {/* arrow ↓ */}
        <line x1="360" y1="100" x2="360" y2="114"
              stroke="#3a3028" strokeWidth="1.5" markerEnd="url(#ad-a)"/>

        {/* ═══════════════════════════════════════════ */}
        {/* ROW 3 — DATA INGESTION + RAG                */}
        {/* ═══════════════════════════════════════════ */}
        {[
          { x: 40,  w: 96,  label: 'Crawl4AI',   note: 'web' },
          { x: 144, w: 74,  label: 'PRAW',        note: 'reddit' },
          { x: 226, w: 96,  label: 'GitHub API',  note: 'repos' },
          { x: 330, w: 82,  label: 'Tavily',      note: 'search' },
        ].map(({ x, w, label, note }) => (
          <g key={label}>
            <rect x={x} y={114} width={w} height={28} rx="5"
                  fill="#1a1814" stroke="#363028" strokeWidth="1"/>
            <text x={x + w / 2} y={127} textAnchor="middle"
                  fill="#a09080" fontSize="9.5" fontWeight="500">{label}</text>
            <text x={x + w / 2} y={138} textAnchor="middle"
                  fill="#504840" fontSize="7.5">{note}</text>
          </g>
        ))}

        {/* → to MongoDB */}
        <line x1="420" y1="128" x2="436" y2="128"
              stroke="#3a5a3a" strokeWidth="1.5" markerEnd="url(#ad-ag)"/>

        {/* MongoDB Atlas + RAG */}
        <rect x="440" y="114" width="240" height="28" rx="5"
              fill="#0c180c" stroke="#3a6030" strokeWidth="1"/>
        <text x="560" y="127" textAnchor="middle"
              fill="#6ab06a" fontSize="9.5" fontWeight="500">MongoDB Atlas · Vector RAG</text>
        <text x="560" y="138" textAnchor="middle"
              fill="#3a6a3a" fontSize="7.5">cosine similarity · embeddings pipeline</text>

        {/* arrow ↓ */}
        <line x1="360" y1="142" x2="360" y2="156"
              stroke="#3a3028" strokeWidth="1.5" markerEnd="url(#ad-a)"/>

        {/* ═══════════════════════════════════════════ */}
        {/* ROW 4 — COURT SESSION                       */}
        {/* ═══════════════════════════════════════════ */}
        {/* Container */}
        <rect x="40" y="156" width="640" height="226" rx="10"
              fill="#0a1018" stroke="#2d4a6e" strokeWidth="1.5"/>
        {/* Header strip */}
        <rect x="40" y="156" width="640" height="26" rx="10" fill="#152030"/>
        {/* Square off the rounded bottom of header */}
        <rect x="40" y="168" width="640" height="14" fill="#152030"/>
        <text x="56" y="173" fill="#5a8ab0" fontSize="8" fontWeight="700" letterSpacing="2">COURT SESSION</text>
        <text x="666" y="173" textAnchor="end" fill="#3a5870" fontSize="8">3-round adversarial evaluation · LangGraph WarRoomState</text>

        {/* ─ Round 1: Researcher ─ */}
        <rect x="56" y="190" width="340" height="52" rx="7"
              fill="#0e1825" stroke="#4a7ab5" strokeWidth="1.5"/>
        <circle cx="78" cy="216" r="10" fill="#2050902a"/>
        <text x="78" y="220" textAnchor="middle"
              fill="#6a9ad8" fontSize="11" fontWeight="700">1</text>
        <text x="98" y="210" fill="#c8c0b8" fontSize="11" fontWeight="600">Researcher Agent</text>
        <text x="98" y="226" fill="#5a5248" fontSize="9">Gathers data · RAG retrieval · proposes opening statements</text>
        <rect x="354" y="198" width="36" height="15" rx="3"
              fill="#1a3a5a" stroke="#2a5a8a30" strokeWidth="1"/>
        <text x="372" y="209" textAnchor="middle" fill="#6a9ad8"
              fontSize="7.5" fontWeight="600">RAG</text>

        {/* state-pass arrow */}
        <line x1="226" y1="242" x2="226" y2="256"
              stroke="#2a2820" strokeWidth="1.5" strokeDasharray="3,2"
              markerEnd="url(#ad-a)"/>
        <text x="242" y="251" fill="#3a3828" fontSize="7.5" fontStyle="italic">state pass · round_1</text>

        {/* ─ Round 2: Cross-Examination ─ */}
        <rect x="56" y="258" width="340" height="52" rx="7"
              fill="#0e1825" stroke="#4a7ab5" strokeWidth="1.5"/>
        <circle cx="78" cy="284" r="10" fill="#2050902a"/>
        <text x="78" y="288" textAnchor="middle"
              fill="#6a9ad8" fontSize="11" fontWeight="700">2</text>
        <text x="98" y="278" fill="#c8c0b8" fontSize="11" fontWeight="600">Cross-Examination</text>
        <text x="98" y="294" fill="#5a5248" fontSize="9">Primary attacks each competitor · LLM chain per matchup</text>
        <rect x="336" y="266" width="54" height="15" rx="3"
              fill="#1a0a2a" stroke="#6030a030" strokeWidth="1"/>
        <text x="363" y="277" textAnchor="middle" fill="#9070d0"
              fontSize="7.5" fontWeight="600">LLM chains</text>

        {/* state-pass arrow */}
        <line x1="226" y1="310" x2="226" y2="324"
              stroke="#2a2820" strokeWidth="1.5" strokeDasharray="3,2"
              markerEnd="url(#ad-a)"/>
        <text x="242" y="319" fill="#3a3828" fontSize="7.5" fontStyle="italic">state pass · round_2</text>

        {/* ─ Round 3: Adversarial Challenger ─ */}
        <rect x="56" y="326" width="340" height="46" rx="7"
              fill="#180d0e" stroke="#b04444" strokeWidth="2"/>
        <circle cx="78" cy="349" r="10" fill="#b0444428"/>
        <text x="78" y="353" textAnchor="middle"
              fill="#d07070" fontSize="11" fontWeight="700">3</text>
        <text x="98" y="344" fill="#e0c8c8" fontSize="11" fontWeight="600">Adversarial Challenger</text>
        <text x="98" y="360" fill="#7a4848" fontSize="9">Stress-tests claims · demands evidence · plaintiff challenge</text>
        <rect x="336" y="334" width="54" height="15" rx="3"
              fill="#2a0808" stroke="#b0444430" strokeWidth="1"/>
        <text x="363" y="345" textAnchor="middle" fill="#d07070"
              fontSize="7.5" fontWeight="600">⚡ verdict</text>

        {/* ── ADVERSARIAL FEEDBACK LOOP ── */}
        <path d="M 396 349 C 654 349, 654 216, 396 216"
              stroke="#c4842a" strokeWidth="2" fill="none"
              strokeDasharray="7,3" markerEnd="url(#ad-ao)"/>
        {/* Loop label box */}
        <rect x="610" y="264" width="76" height="52" rx="6"
              fill="#c4842a12" stroke="#c4842a28" strokeWidth="1"/>
        <text x="648" y="282" textAnchor="middle"
              fill="#c4842a" fontSize="7.5" fontWeight="700" letterSpacing="1">ADVERSARIAL</text>
        <text x="648" y="295" textAnchor="middle"
              fill="#c4842a" fontSize="7.5" fontWeight="700" letterSpacing="1">FEEDBACK</text>
        <text x="648" y="308" textAnchor="middle"
              fill="#c4842a" fontSize="7.5" fontWeight="700" letterSpacing="1">LOOP</text>

        {/* round labels on right */}
        <text x="404" y="216" fill="#2a4a6a" fontSize="8" fontStyle="italic">round_1: opening_statements</text>
        <text x="404" y="284" fill="#2a4a6a" fontSize="8" fontStyle="italic">round_2: cross_examinations</text>
        <text x="404" y="352" fill="#6a2a2a" fontSize="8" fontStyle="italic">round_3: challenge_responses</text>

        {/* arrow ↓ from court */}
        <line x1="360" y1="382" x2="360" y2="396"
              stroke="#3a3028" strokeWidth="1.5" markerEnd="url(#ad-a)"/>

        {/* ═══════════════════════════════════════════ */}
        {/* ROW 5 — OUTPUT                              */}
        {/* ═══════════════════════════════════════════ */}
        {/* Verdict */}
        <rect x="40" y="396" width="194" height="34" rx="6"
              fill="#0a160a" stroke="#4a7a4a" strokeWidth="1.5"/>
        <text x="137" y="413" textAnchor="middle"
              fill="#6ab06a" fontSize="10" fontWeight="600">Cited Report + Verdict</text>
        <text x="137" y="425" textAnchor="middle"
              fill="#3a5a3a" fontSize="7.5">saved to MongoDB Atlas</text>

        {/* arrow → */}
        <line x1="234" y1="413" x2="254" y2="413"
              stroke="#3a3028" strokeWidth="1.5" markerEnd="url(#ad-a)"/>

        {/* FastAPI */}
        <rect x="258" y="396" width="176" height="34" rx="6"
              fill="#180a0a" stroke="#c04040" strokeWidth="1.2"/>
        <text x="346" y="413" textAnchor="middle"
              fill="#d07070" fontSize="10" fontWeight="600">FastAPI</text>
        <text x="346" y="425" textAnchor="middle"
              fill="#7a3030" fontSize="7.5">SSE streaming · 15 endpoints</text>

        {/* SSE arrow → */}
        <line x1="434" y1="413" x2="452" y2="413"
              stroke="#3a3028" strokeWidth="1.5" markerEnd="url(#ad-a)"/>
        <text x="443" y="408" textAnchor="middle" fill="#3a3028"
              fontSize="7">SSE</text>

        {/* React Dashboard */}
        <rect x="456" y="396" width="224" height="34" rx="6"
              fill="#0a1018" stroke="#2870a0" strokeWidth="1.2"/>
        <text x="568" y="413" textAnchor="middle"
              fill="#5aa0d0" fontSize="10" fontWeight="600">React Dashboard</text>
        <text x="568" y="425" textAnchor="middle"
              fill="#2a5070" fontSize="7.5">real-time report generation · vendor registry</text>

        {/* ── footer ── */}
        <text x="360" y="462" textAnchor="middle"
              fill="#2a2820" fontSize="8" letterSpacing="0.3">
          87.9% accuracy on held-out benchmark · LangGraph · MongoDB Atlas · Groq Llama-3.3-70b · FastAPI · React
        </text>
      </svg>
    </figure>
  );
}
