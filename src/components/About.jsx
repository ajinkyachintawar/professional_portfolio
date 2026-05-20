export default function About() {
  return (
    <section id="about" className="about" data-screen-label="02 About">
      <span className="section-label"><span className="num">01</span>About</span>
      <h2>A short version, written by me.</h2>

      <p>
        My first real lesson in data didn't come from a notebook. It came from a
        quick-commerce pilot I ran at Dunnes Stores, where the question wasn't{' '}
        <em>which model</em> but{' '}
        <em>which SKU goes on which shelf so a courier can pick it in under ninety seconds</em>.
        We scaled the pilot to roughly €150K in GMV, and I came away convinced that the
        interesting work lives at the seam between analytics and operations, close enough
        to the floor that the numbers have to behave.
      </p>

      <p>
        I went back to school for it. An MSc in Data Analytics at National College of
        Ireland, First Class Honours, Dean's Scholar, but the thing that mattered was the
        year I spent treating every assignment as a chance to ship something I'd actually
        use. That habit became <em>AdversarialCI</em>, a multi-agent
        competitive-intelligence platform I built and published as a ScienceOpen preprint.
        It's the project I'd point to first if you wanted to know how I think.
      </p>

      <p>
        Since then I've been working on the same problem from different angles: how do
        you get a system of agents, pipelines and humans to produce intelligence that's
        faster than a team and more reliable than a single model. I write Python, I draw
        a lot of diagrams, and I keep a small list of things I'd like to be wrong about.
      </p>

      <p className="kicker">
        The arc, if it has one, is from quick-commerce floor to multi-agent benchmark.
        Same question, more careful answer.
      </p>
    </section>
  );
}
