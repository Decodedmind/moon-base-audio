/* Moon Base Audio — Releases page extension */
(() => {
  if (!NAV.some(n => n.path === "/releases")) {
    NAV.splice(1, 0, { path: "/releases", label: "Releases" });
  }

  SEO["/releases"] = [
    "Releases | Moon Base Audio",
    "New music and releases from Moon Base Audio artists Paul McCall and Arferello."
  ];

  const RELEASES_PAGE = [
    {
      artist: "Arferello",
      title: "Dirty Dancing",
      type: "Single",
      date: "2026-10-02",
      spotify: "https://open.spotify.com/track/0xdsu4JoWyoXmKVAObt7Rq?si=864a82b42fbb4fc7",
      artistSpotify: "https://open.spotify.com/artist/6pYXstzGkC9T8BEDyh0ERL?si=kL9FvEd2TCe9U-RSVbRtMQ",
      image: "assets/images/arferello-dirty-dancing.webp?v=2",
      description: "The latest single from Arferello.",
      featured: true
    },
    {
      artist: "Arferello",
      title: "Free (Unplugged)",
      type: "Single",
      date: "2026-09-11",
      spotify: "https://open.spotify.com/album/1qCTYzjkRCYgBI0NbdPYLM",
      artistSpotify: "https://open.spotify.com/artist/6pYXstzGkC9T8BEDyh0ERL?si=kL9FvEd2TCe9U-RSVbRtMQ",
      image: "https://i.scdn.co/image/ab67616d0000b2734d6c968428ec701cbfb56a8a",
      description: "A stripped-back unplugged version of Free.",
      featured: false
    },
    {
      artist: "Paul McCall",
      title: "HATE THE PLAYER",
      type: "Album",
      date: "2026-07-24",
      spotify: "https://open.spotify.com/album/4NPilJITvtbOilH24QCbz5",
      artistSpotify: "https://open.spotify.com/artist/3E1tGVJPzqka4u67JleS3t?si=FraoMo9SQ-mnHxrmfRO0qQ",
      image: "https://i.scdn.co/image/ab67616d0000b2733fc08c42126f205747c96194",
      description: "Paul McCall's 2026 album HATE THE PLAYER.",
      featured: false
    }
  ];

  const releaseCard = r => `
    <article class="release-feature ${r.featured ? "is-featured" : ""}">
      <div class="release-art ${r.image ? "has-image" : ""}">
        ${r.image
          ? `<img src="${esc(r.image)}" alt="${esc(r.title)} cover art" loading="lazy">`
          : `<div class="release-art-copy"><span>Moon Base Audio</span><strong>${esc(r.artist)}</strong></div>`}
      </div>
      <div class="release-copy">
        <div class="release-kicker">${r.featured ? "New release" : esc(r.type || "Release")}</div>
        <h2 class="h2">${esc(r.title)}</h2>
        <p class="release-by">${esc(r.artist)}${r.date ? ` · ${new Date(r.date + "T12:00:00").toLocaleDateString("en-US", { month:"long", day:"numeric", year:"numeric" })}` : ""}</p>
        <p class="body">${esc(r.description || "Stream it on Spotify or open the artist page for the full catalog.")}</p>
        <div class="btn-row">
          ${Button(r.spotify, "Listen on Spotify", "primary")}
          ${Button(r.artistSpotify, `${r.artist} on Spotify`)}
        </div>
      </div>
    </article>`;

  Pages.releases = () => {
    const featured = RELEASES_PAGE.filter(r => r.featured);
    const catalog = RELEASES_PAGE.filter(r => !r.featured);
    const artistLinks = ARTISTS.map(a => `
      <article class="release-artist-card">
        <div class="small">Artist catalog</div>
        <h2 class="h3">${esc(a.name)}</h2>
        <p class="body">Open ${esc(a.name)} on Spotify to hear the full catalog and follow new releases.</p>
        <div>${Button(a.links.spotify || a.links.beacons, "Open on Spotify", "", true)}</div>
      </article>`).join("");

    return `
      <section class="page-head releases-head">
        <div class="wrap">
          <div class="small">Moon Base Audio</div>
          <h1 class="h1">Releases</h1>
          <p class="lede">New music from the Moon Base roster. Start with the latest drop, then dig into previous releases and each artist’s Spotify catalog.</p>
        </div>
      </section>

      <section class="section release-section">
        <div class="wrap">
          ${featured.map(releaseCard).join("")}
          ${catalog.length ? `<div class="section-head" style="margin-top:64px"><h2 class="h2">Previous releases</h2></div><div class="release-grid">${catalog.map(releaseCard).join("")}</div>` : ""}
        </div>
      </section>

      <section class="section">
        <div class="wrap">
          <div class="section-head">
            <h2 class="h2">Artist catalogs</h2>
            <p class="body">Follow both artists on Spotify for the full discography and future drops.</p>
          </div>
          <div class="release-artist-grid">${artistLinks}</div>
        </div>
      </section>
      ${BookingBand()}`;
  };

  const baseRoute = route;
  route = function () {
    const path = (location.hash.replace(/^#/, "") || "/").replace(/\/+$/, "") || "/";
    if (path !== "/releases") return baseRoute();

    main.innerHTML = `<div class="page-enter">${Pages.releases()}</div>`;
    renderNav(path);
    setMeta("/releases");
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
    bindPage();
  };

  renderFooter();
  route();
  document.querySelectorAll(".mark").forEach(m => { if (SITE.logo) m.style.backgroundImage = `url("${SITE.logo}")`; });
})();
