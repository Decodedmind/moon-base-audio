/* Moon Base Audio — About page copy override */
(() => {
  const originalAbout = Pages.about;

  Pages.about = () => `
    <section class="page-head">
      <div class="wrap">
        <h1 class="h1">About</h1>
        <p class="lede">Moon Base Audio is based in Jackson, Mississippi, with a focus on helping independent artists grow through stronger releases, better live performances, consistent presentation, and professional relationships within the music community.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap split">
        <h2 class="h2">Built in Jackson</h2>
        <div>
          <p class="body">Moon Base Audio is focused on helping independent artists grow with intention. That means stronger releases, better live performances, consistent presentation, and professional relationships with the people who help move the music forward.</p>
          <div class="pillars">
            <div><h3>Artist development</h3><p>Helping artists sharpen their sound, presentation, and direction.</p></div>
            <div><h3>Live performance</h3><p>Building tighter sets and gaining experience through real shows.</p></div>
            <div><h3>Professional relationships</h3><p>Developing strong connections with venues, promoters, creatives, and collaborators.</p></div>
            <div><h3>Long-term growth</h3><p>Creating a foundation artists can continue building on.</p></div>
          </div>
        </div>
      </div>
    </section>
    ${BookingBand()}`;

  // Re-render immediately if the visitor loaded directly on the About route.
  const path = (location.hash.replace(/^#/, "") || "/").replace(/\/+$/, "") || "/";
  if (path === "/about") route();
})();
