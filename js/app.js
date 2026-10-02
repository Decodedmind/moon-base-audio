/* =========================================================
   MOON BASE AUDIO — APP
   Helpers, reusable components, pages, and the hash router.
   Content lives in js/data.js; you rarely need to edit this file.
   ========================================================= */

/* =========================================================
   HELPERS
   ========================================================= */
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
const fmt = n => n.toLocaleString("en-US");
const getArtist = slug => ARTISTS.find(a => a.slug === slug);
const listenUrl = a => a.links.spotify || a.links.beacons;
const mailto = (subject = "Booking inquiry") => `mailto:${SITE.bookingEmail}?subject=${encodeURIComponent(subject)}`;
const ext = url => /^https?:/.test(url) ? ' target="_blank" rel="noopener"' : "";

const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
const statusOf = t => t.status || (!t.date ? "TBA" : t.date < todayISO() ? "PAST" : "UPCOMING");

function sortTour(list) {
  const rank = { UPCOMING: 0, TBA: 1, PAST: 2 };
  return [...list].map(t => ({ ...t, status: statusOf(t) })).sort((a, b) => {
    if (rank[a.status] !== rank[b.status]) return rank[a.status] - rank[b.status];
    if (a.date && b.date) return a.status === "PAST" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
    return a.date ? -1 : b.date ? 1 : 0;
  });
}
function fmtDate(iso) {
  if (!iso) return { main: "Date TBA", sub: "" };
  const d = new Date(iso + "T12:00:00");
  return {
    main: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    sub: iso === todayISO() ? "Tonight" : d.toLocaleDateString("en-US", { weekday: "short", year: "numeric" })
  };
}

/* =========================================================
   COMPONENTS
   ========================================================= */
const Button = (href, label, variant = "", small = false) =>
  `<a class="btn ${variant ? "btn-" + variant : ""} ${small ? "btn-sm" : ""}" href="${esc(href)}"${ext(href)}>${esc(label)}</a>`;

const EPKButton = (variant = "primary") =>
  `<a class="btn btn-${variant}" data-epk href="${esc(SITE.epk.url)}" download="${esc(SITE.epk.filename)}">Download EPK</a>`;

const Image = (src, alt, label, pos = "50% 50%") => src
  ? `<div class="media"><img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" style="object-position:${esc(pos)}"></div>`
  : `<div class="ph" role="img" aria-label="${esc(label)}"><span>${esc(label)}</span></div>`;

const Metrics = a => `
  <div class="metrics">
    <div class="metric">
      <div class="num">~${fmt(a.metrics.spotifyMonthly)}</div>
      <div class="lbl">Spotify monthly listeners</div>
    </div>
    <div class="metric">
      <div class="num">~${fmt(a.metrics.instagramFollowers)}</div>
      <div class="lbl">Instagram followers, <a href="${esc(a.links.instagram.url)}" target="_blank" rel="noopener">${esc(a.links.instagram.handle)}</a></div>
    </div>
  </div>`;

const ArtistCard = a => `
  <article class="artist-card">
    <a href="#/artists/${a.slug}" tabindex="-1" aria-hidden="true">${Image(a.image, a.name, `${a.name} photo placeholder`, a.imagePosition)}</a>
    <h3 class="name"><a href="#/artists/${a.slug}">${esc(a.name)}</a></h3>
    <p class="body">${esc(a.short)}</p>
    ${Metrics(a)}
    <div class="btn-row">
      ${Button("#/artists/" + a.slug, "Artist profile", "primary")}
      ${Button(listenUrl(a), "Listen")}
    </div>
  </article>`;

const TourList = (items, limit) => {
  const rows = sortTour(items).slice(0, limit ?? items.length);
  if (!rows.length) return `<p class="tour-empty">No dates in this list yet. New shows are announced on the artists’ Instagram pages.</p>`;
  return `<ul class="tour">${rows.map(t => {
    const d = fmtDate(t.date);
    const venue = t.url ? `<a href="${esc(t.url)}"${ext(t.url)}>${esc(t.venue)}</a>` : esc(t.venue);
    return `<li>
      <div class="date">${d.main}${d.sub ? `<small>${d.sub}</small>` : ""}</div>
      <div><div class="venue">${venue}</div><div class="city">${[t.city, t.doors && t.status !== "PAST" ? "Doors " + t.doors : "", t.act].filter(Boolean).map(esc).join(", ")}</div></div>
      <span class="status status-${t.status}">${t.status}</span>
    </li>`;
  }).join("")}</ul>`;
};

const Releases = a => `
  <ul class="releases">${a.releases.map(r => `
    <li>
      <span class="t">${r.url ? `<a href="${esc(r.url)}"${ext(r.url)}>${esc(r.title)}</a>` : esc(r.title)}</span>
      <span class="m">${[r.credit, r.type, r.year].filter(Boolean).map(esc).join(", ")}</span>
    </li>`).join("")}
  </ul>`;

const LinkList = a => {
  const rows = [
    ["Instagram", a.links.instagram?.url, a.links.instagram?.handle],
    ["Beacons", a.links.beacons, "All links"],
    ["Spotify", a.links.spotify, "Artist page"],
    ["YouTube", a.links.youtube, "Channel"],
    ["Apple Music", a.links.appleMusic, "Artist page"]
  ];
  return `<div class="link-list">${rows.map(([label, url, sub]) => url
    ? `<a href="${esc(url)}" target="_blank" rel="noopener"><span>${label}</span><span class="handle">${esc(sub)}</span></a>`
    : `<div class="na"><span>${label}</span><span class="handle">Coming soon</span></div>`).join("")}</div>`;
};

const ContactCard = () => `
  <div class="contact-card">
    <div class="small">Booking contact</div>
    <div class="who">${esc(SITE.manager.name)}</div>
    <div class="role">${esc(SITE.manager.title)}, ${esc(SITE.name)}</div>
    <a class="email" href="${mailto()}">${esc(SITE.bookingEmail)}</a>
  </div>`;

const EPKCard = () => `
  <div class="epk">
    <div class="h3">Electronic press kit</div>
    <p class="body" style="color:var(--text)">Bios, photos, music links, and live details for Paul McCall + Arferello in one PDF.</p>
    <div>${EPKButton()}</div>
    <div class="file">${esc(SITE.epk.filename)}</div>
  </div>`;

const Collab = () => {
  const [p, a] = LIVE_ACT.artists.map(getArtist);
  return `
  <div class="collab">
    <div>
      <h3 class="pair">${esc(p.name)} <span class="plus">+</span><br>${esc(a.name)}</h3>
      <p class="body" style="margin-top:20px">The two artists share a live set and recorded material. They are currently playing around Jackson together as part of a Moon Base Audio run, with a set of about 30 minutes that fits opening, support, and crossover bills.</p>
    </div>
    <div class="stack">
      <div class="small">Recorded together</div>
      <ul class="releases">${LIVE_ACT.collabs.map(c => `<li><span class="t">${esc(c.title)}</span><span class="m">${esc(c.credit)}</span></li>`).join("")}</ul>
      <div class="btn-row">${Button("#/booking", "Book this act", "primary")}${Button("#/tour", "See live dates")}</div>
    </div>
  </div>`;
};

const BookingBand = () => `
  <section class="band" aria-label="Booking">
    <div class="wrap">
      <div>
        <h2 class="h2">Booking a show?</h2>
        <p class="body" style="margin-top:14px">Listen, grab the EPK, and reach ${esc(SITE.manager.name)} directly.</p>
      </div>
      <div class="btn-row">${Button("#/booking", "Book an artist", "primary")}${EPKButton("")}</div>
    </div>
  </section>`;

/* =========================================================
   PAGES
   ========================================================= */
const Pages = {
  home() {
    return `
    <section class="hero">
      <div class="orbit" aria-hidden="true"><img class="moon" src="${esc(SITE.logo)}" alt=""><div class="sat"></div></div>
      <div class="wrap">
        <h1 class="display">Moon<br>Base<br>Audio</h1>
        <p class="lede">Independent artists. Live music. Mississippi.</p>
        <div class="btn-row">${Button("#/artists", "View artists", "primary")}${Button("#/booking", "Book an artist")}</div>
        <div class="hero-meta">
          <span>Based in <strong>Jackson, Mississippi</strong></span>
          <span>Artist management, live booking, releases</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head">
          <h2 class="h2">Featured artists</h2>
          ${Button("#/artists", "All artists", "", true)}
        </div>
        <div class="artist-grid">${ARTISTS.map(ArtistCard).join("")}</div>
      </div>
    </section>

    <section class="section">
      <div class="wrap live-grid">
        <div>
          <h2 class="h2">Live now in Jackson</h2>
          <p class="lede" style="margin-top:24px">${esc(LIVE_ACT.name)} are performing around Jackson as part of a Moon Base Audio run.</p>
          <dl class="facts">
            <div><dt>Act</dt><dd>${esc(LIVE_ACT.name)}</dd></div>
            <div><dt>Current run</dt><dd>${esc(TOUR_INFO.name)}, ${esc(TOUR_INFO.span)}</dd></div>
            <div><dt>Set length</dt><dd>${esc(LIVE_ACT.setLength)}</dd></div>
            <div><dt>Home market</dt><dd>${esc(LIVE_ACT.homeMarket)}</dd></div>
            <div><dt>Best fit</dt><dd>${LIVE_ACT.bestFit.map(esc).join(", ")}</dd></div>
          </dl>
          <div class="btn-row" style="margin-top:32px">${Button("#/booking", "Book this act", "primary")}</div>
        </div>
        <div>
          <div class="small" style="margin-bottom:16px">${esc(TOUR_INFO.name)}, ${esc(TOUR_INFO.span.toLowerCase())}</div>
          ${TourList(TOUR, 6)}
          <div style="margin-top:24px">${Button("#/tour", "All live dates", "", true)}</div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wrap split">
        <h2 class="h2">About Moon Base Audio</h2>
        <div class="stack">
          <p class="lede">Moon Base Audio is an independent artist platform based in Jackson, Mississippi. We work with developing artists to build their music, live presence, and audience from the ground up.</p>
          <p class="body">The focus is steady growth through live performance, releases, and regional relationships, starting at home and moving across Mississippi, New Orleans, and the Southeast.</p>
          <div>${Button("#/about", "More about us", "", true)}</div>
        </div>
      </div>
    </section>

    ${BookingBand()}`;
  },

  artists() {
    return `
    <section class="page-head">
      <div class="wrap">
        <h1 class="h1">Artists</h1>
        <p class="lede">Two Mississippi artists, one shared stage. Each one builds a separate catalog while playing live together.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap"><div class="artist-grid">${ARTISTS.map(ArtistCard).join("")}</div></div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="section-head"><h2 class="h2">Together</h2></div>
        ${Collab()}
      </div>
    </section>`;
  },

  artist(slug) {
    const a = getArtist(slug);
    if (!a) return Pages.notFound();
    const other = ARTISTS.filter(x => x.slug !== slug);
    return `
    <section class="profile-hero">
      <div class="wrap profile-hero-grid">
        <div class="profile-hero-text">
          <h1 class="h1">${esc(a.name)}</h1>
          <p class="tag">${esc(a.tagline)}</p>
          <div class="btn-row" style="margin-top:28px">${Button(listenUrl(a), "Listen", "primary")}${Button("#/booking", "Book " + a.name)}</div>
        </div>
        <div class="profile-hero-photo">${Image(a.image, a.name, `${a.name} hero photo placeholder`, a.imagePosition)}</div>
      </div>
    </section>

    <section class="section">
      <div class="wrap profile-body">
        <div class="stack">
          <h2 class="h2">Bio</h2>
          ${a.bio.map((p, i) => `<p class="${i === 0 ? "lede" : "body"}">${esc(p)}</p>`).join("")}
          <div style="margin-top:12px">${Metrics(a)}</div>
          <h2 class="h2" style="margin-top:48px">Recent releases</h2>
          ${Releases(a)}
        </div>
        <aside class="side-panel">
          <div>
            <div class="small" style="margin-bottom:12px">Listen and follow</div>
            ${LinkList(a)}
          </div>
          ${ContactCard()}
          <div>${EPKButton("")}</div>
        </aside>
      </div>
    </section>

    <section class="section">
      <div class="wrap">
        <div class="section-head"><h2 class="h2">Live with ${esc(other[0]?.name || "")}</h2></div>
        ${Collab()}
      </div>
    </section>
    ${BookingBand()}`;
  },

  booking() {
    const options = [LIVE_ACT.name, ...ARTISTS.map(a => a.name)];
    const types = [...LIVE_ACT.availableFor, "Other"];
    return `
    <section class="page-head">
      <div class="wrap">
        <h1 class="h1">Book Moon Base artists</h1>
        <p class="lede">${esc(LIVE_ACT.name)} are taking dates now. Here is everything a venue or promoter needs in one place.</p>
      </div>
    </section>

    <section class="section">
      <div class="wrap live-grid">
        <div>
          <h2 class="h2">Available for</h2>
          <ul class="chips">${LIVE_ACT.availableFor.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
          <dl class="facts" style="margin-top:40px">
            <div><dt>Set length</dt><dd>${esc(LIVE_ACT.setLength)}</dd></div>
            <div><dt>Home market</dt><dd>${esc(LIVE_ACT.homeMarket)}</dd></div>
            <div><dt>Travel</dt><dd>${esc(SITE.travel)}</dd></div>
            <div><dt>Listen</dt><dd>${ARTISTS.map(a => `<a href="${esc(listenUrl(a))}" target="_blank" rel="noopener">${esc(a.name)}</a>`).join(", ")}</dd></div>
          </dl>
        </div>
        <div class="stack">
          ${EPKCard()}
          ${ContactCard()}
        </div>
      </div>
    </section>

    <section class="section" id="inquiry">
      <div class="wrap split">
        <div class="stack" style="align-content:start">
          <h2 class="h2">Booking inquiry</h2>
          <p class="body">Send the details and ${esc(SITE.manager.name)} will follow up. ${SITE.formEndpoint ? "" : `Submitting opens your email app with the inquiry filled in, addressed to ${esc(SITE.bookingEmail)}.`}</p>
        </div>
        <form class="form" id="booking-form" novalidate>
          ${field("name", "Name", "text", true, "name")}
          ${field("org", "Organization / venue", "text", false, "organization")}
          ${field("email", "Email", "email", true, "email")}
          ${field("city", "City", "text", false, "address-level2")}
          ${field("date", "Proposed date", "date", false)}
          <div class="field"><label for="f-artist">Artist</label><select id="f-artist" name="artist">${options.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
          <div class="field full"><label for="f-type">Event type</label><select id="f-type" name="type">${types.map(o => `<option>${esc(o)}</option>`).join("")}</select></div>
          <div class="field full"><label for="f-message">Message <span class="req">*</span></label><textarea id="f-message" name="message" required placeholder="Bill, slot, capacity, offer, and anything else useful."></textarea></div>
          <div class="full btn-row" style="align-items:center"><button class="btn btn-primary" type="submit">Send inquiry</button><p class="form-note">Fields marked <span style="color:var(--accent)">*</span> are required.</p></div>
          <div class="form-status" id="form-status" role="status" aria-live="polite"></div>
        </form>
      </div>
    </section>`;
  },

  tour() {
    return `
    <section class="page-head">
      <div class="wrap">
        <h1 class="h1">Live</h1>
        <p class="lede">${esc(TOUR_INFO.presenter)} ${esc(LIVE_ACT.name)} on the ${esc(TOUR_INFO.name)}. ${esc(TOUR_INFO.span)}, doors at 7.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        <div class="filters" role="group" aria-label="Filter dates">
          ${["ALL", "UPCOMING", "TBA", "PAST"].map((s, i) => `<button type="button" data-filter="${s}" aria-pressed="${i === 0}">${s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}</button>`).join("")}
        </div>
        <div class="tour-layout">
          <div>
            <div id="tour-list">${TourList(TOUR)}</div>
            <div class="btn-row" style="margin-top:40px">${Button("#/booking", "Book this act", "primary")}${EPKButton("")}</div>
          </div>
          ${TOUR_INFO.flyer ? `<figure class="flyer"><img src="${esc(TOUR_INFO.flyer)}" alt="${esc(TOUR_INFO.name)} flyer listing all five October dates in Jackson" loading="lazy"><figcaption class="small">${esc(TOUR_INFO.name)} flyer</figcaption></figure>` : ""}
        </div>
      </div>
    </section>`;
  },

  about() {
    return `
    <section class="page-head">
      <div class="wrap">
        <h1 class="h1">About</h1>
        <p class="lede">Moon Base Audio is based in Jackson, Mississippi. We develop independent artists close to home, build live shows that hold a room, and grow their audiences across the state and into the region.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap split">
        <h2 class="h2">From Jackson outward</h2>
        <div>
          <p class="body">The plan is simple. Start with the Jackson scene, earn an audience throughout Mississippi, then take that to New Orleans and the wider Southeast. Every step is built on real shows, real releases, and relationships with the venues and people who run them.</p>
          <div class="pillars">
            <div><h3>Artist development</h3><p>Helping artists shape their music, catalog, and direction.</p></div>
            <div><h3>Live performance</h3><p>Tight sets and steady dates, starting with the local circuit.</p></div>
            <div><h3>Independent music</h3><p>Artist-first releases without the major-label playbook.</p></div>
            <div><h3>Regional growth</h3><p>Mississippi first, then New Orleans and the Southeast.</p></div>
          </div>
        </div>
      </div>
    </section>
    ${BookingBand()}`;
  },

  contact() {
    const s = SITE.social;
    const brandRows = [["Instagram", s.instagram], ["Spotify", s.spotify], ["YouTube", s.youtube]];
    const linkRow = ([label, url, sub]) => url
      ? `<a href="${esc(url)}" target="_blank" rel="noopener"><span>${label}</span><span class="handle">${esc(sub || "")}</span></a>`
      : `<div class="na"><span>${label}</span><span class="handle">Coming soon</span></div>`;
    return `
    <section class="page-head">
      <div class="wrap">
        <h1 class="h1">Contact</h1>
        <p class="lede">For booking, press, and anything else, email ${esc(SITE.manager.name)}.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap live-grid">
        <div class="stack">
          ${ContactCard()}
          <div class="btn-row">${Button(mailto(), "Email Eddie", "primary")}${Button("#/booking", "Booking form")}</div>
        </div>
        <div class="stack">
          <div>
            <div class="small" style="margin-bottom:12px">Moon Base Audio</div>
            <div class="link-list">${brandRows.map(linkRow).join("")}</div>
          </div>
          ${ARTISTS.map(a => `
          <div>
            <div class="small" style="margin:12px 0">${esc(a.name)}</div>
            <div class="link-list">${[
              ["Beacons", a.links.beacons, "All links"],
              ["Instagram", a.links.instagram.url, a.links.instagram.handle],
              ["Spotify", a.links.spotify, "Artist page"],
              ["YouTube", a.links.youtube, "Channel"]
            ].map(linkRow).join("")}</div>
          </div>`).join("")}
        </div>
      </div>
    </section>`;
  },

  notFound() {
    return `<section class="page-head"><div class="wrap"><h1 class="h1">Page not found</h1><p class="lede">That page doesn’t exist. Head back to the artists or booking page.</p><div class="btn-row" style="margin-top:28px">${Button("#/artists", "View artists", "primary")}${Button("#/booking", "Book an artist")}</div></div></section>`;
  }
};

function field(id, label, type, required, autocomplete) {
  return `<div class="field"><label for="f-${id}">${esc(label)}${required ? ' <span class="req">*</span>' : ""}</label><input id="f-${id}" name="${id}" type="${type}"${required ? " required" : ""}${autocomplete ? ` autocomplete="${autocomplete}"` : ""}></div>`;
}

/* =========================================================
   ROUTER + CHROME
   ========================================================= */
const main = document.getElementById("main");
const nav = document.getElementById("nav");
const toggle = document.querySelector(".menu-toggle");

function renderNav(path) {
  nav.innerHTML = NAV.map(n => {
    const active = path === n.path || (n.path === "/artists" && path.startsWith("/artists"));
    return `<a href="#${n.path}"${active ? ' aria-current="page"' : ""}>${n.label}</a>`;
  }).join("") + Button("#/booking", "Book an artist", "primary", true);
}

function renderFooter() {
  document.getElementById("footer").innerHTML = `
  <div class="wrap">
    <div>
      <a class="brand" href="#/"><span class="mark" aria-hidden="true"></span>Moon Base Audio</a>
      <p class="small" style="margin-top:16px;max-width:30em">Independent artist platform based in Jackson, Mississippi.</p>
      <h4 style="margin-top:28px">Booking contact</h4>
      <p style="margin:0">${esc(SITE.manager.name)}, ${esc(SITE.manager.title)}</p>
      <p style="margin:4px 0 0"><a href="${mailto()}">${esc(SITE.bookingEmail)}</a></p>
    </div>
    <div><h4>Artists</h4><ul>${ARTISTS.map(a => `<li><a href="#/artists/${a.slug}">${esc(a.name)}</a></li>`).join("")}<li><a href="#/tour">Live dates</a></li></ul></div>
    <div><h4>Booking</h4><ul><li><a href="#/booking">Book an artist</a></li><li><a data-epk href="${esc(SITE.epk.url)}" download="${esc(SITE.epk.filename)}">Download EPK</a></li><li><a href="#/contact">Contact</a></li></ul></div>
    <div class="legal"><span>© ${new Date().getFullYear()} Moon Base Audio</span><span>Jackson, Mississippi</span></div>
  </div>`;
}

function setMeta(key) {
  const [title, desc] = SEO[key] || SEO["/"];
  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute("content", desc);
  document.querySelector('meta[property="og:title"]').setAttribute("content", title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", desc);
}

function route() {
  const path = (location.hash.replace(/^#/, "") || "/").replace(/\/+$/, "") || "/";
  let html, seoKey = path;
  if (path === "/") html = Pages.home();
  else if (path === "/artists") html = Pages.artists();
  else if (path.startsWith("/artists/")) { seoKey = path.split("/")[2]; html = Pages.artist(seoKey); }
  else if (path === "/booking") html = Pages.booking();
  else if (path === "/tour") html = Pages.tour();
  else if (path === "/about") html = Pages.about();
  else if (path === "/contact") html = Pages.contact();
  else html = Pages.notFound();

  main.innerHTML = `<div class="page-enter">${html}</div>`;
  renderNav(path);
  setMeta(seoKey);
  nav.classList.remove("open");
  toggle.setAttribute("aria-expanded", "false");
  window.scrollTo(0, 0);
  if (path !== "/") main.focus({ preventScroll: true });
  bindPage();
}

function bindPage() {
  // Tour filters
  document.querySelectorAll("[data-filter]").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    const f = btn.dataset.filter;
    document.getElementById("tour-list").innerHTML = TourList(f === "ALL" ? TOUR : TOUR.filter(t => statusOf(t) === f));
  }));

  /* Booking form
     No backend by default: with SITE.formEndpoint empty, submitting opens the
     visitor's email app with a prefilled message to SITE.bookingEmail.
     Set SITE.formEndpoint in js/data.js to POST the form to a form service instead. */
  const form = document.getElementById("booking-form");
  if (!form) return;
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const status = document.getElementById("form-status");
    const req = ["name", "email", "message"].map(n => form.elements[n]);
    let firstBad = null;
    req.forEach(el => {
      const bad = !el.value.trim() || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
      el.setAttribute("aria-invalid", String(bad));
      if (bad && !firstBad) firstBad = el;
    });
    if (firstBad) {
      status.className = "form-status show error";
      status.textContent = "Add your name, a valid email address, and a message, then send again.";
      firstBad.focus();
      return;
    }
    const v = n => form.elements[n].value.trim();
    const subject = `Booking inquiry: ${v("artist")}${v("org") ? " at " + v("org") : ""}${v("date") ? " (" + v("date") + ")" : ""}`;
    const body = [
      `Name: ${v("name")}`,
      `Organization / venue: ${v("org") || "-"}`,
      `Email: ${v("email")}`,
      `City: ${v("city") || "-"}`,
      `Proposed date: ${v("date") || "-"}`,
      `Artist: ${v("artist")}`,
      `Event type: ${v("type")}`,
      "",
      v("message")
    ].join("\n");

    if (SITE.formEndpoint) {
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = "Sending…";
      try {
        const data = new FormData(form);
        data.append("_subject", subject);
        const res = await fetch(SITE.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
        if (!res.ok) throw new Error("HTTP " + res.status);
        form.reset();
        status.className = "form-status show";
        status.textContent = `Inquiry sent. ${SITE.manager.name} will reply to the email address you entered.`;
      } catch (err) {
        status.className = "form-status show error";
        status.innerHTML = `The inquiry didn’t send. Email <a href="${mailto(subject)}">${esc(SITE.bookingEmail)}</a> directly instead.`;
      } finally {
        btn.disabled = false; btn.textContent = "Send inquiry";
      }
      return;
    }

    window.location.href = `mailto:${SITE.bookingEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.className = "form-status show";
    status.innerHTML = `Your email app should open with the inquiry filled in. If it doesn’t, email <a href="${mailto()}">${esc(SITE.bookingEmail)}</a> directly.`;
  });
}

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
  toggle.textContent = open ? "Close" : "Menu";
});
window.addEventListener("hashchange", () => { toggle.textContent = "Menu"; route(); });
renderFooter();
route();
// Logo inside the round brand mark (header + footer)
document.querySelectorAll(".mark").forEach(m => { if (SITE.logo) m.style.backgroundImage = `url("${SITE.logo}")`; });
