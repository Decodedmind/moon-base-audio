/* Moon Base Audio — featured release cards on artist profiles */
(() => {
  const FEATURED_RELEASES = {
    "paul-mccall": {
      artist: "Paul McCall",
      title: "HATE THE PLAYER",
      type: "Album",
      date: "2026-07-24",
      spotify: "https://open.spotify.com/album/4NPilJITvtbOilH24QCbz5",
      image: "https://i.scdn.co/image/ab67616d0000b2733fc08c42126f205747c96194"
    },
    "arferello": {
      artist: "Arferello",
      title: "Dirty Dancing",
      type: "Single",
      date: "2026-10-02",
      spotify: "https://open.spotify.com/track/0xdsu4JoWyoXmKVAObt7Rq?si=5e9a3c382bf1430b",
      image: "https://i.scdn.co/image/ab67616d0000b273c7bf27b37d8fd8e591b2128a"
    }
  };

  const formatDate = iso => new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric"
  });

  function enhanceArtistRelease() {
    const match = location.hash.match(/^#\/artists\/([^/]+)/);
    if (!match) return;

    const release = FEATURED_RELEASES[match[1]];
    if (!release) return;

    const heading = [...document.querySelectorAll("h2")].find(h => h.textContent.trim() === "Recent releases");
    if (!heading) return;

    const oldList = heading.nextElementSibling;
    if (!oldList || oldList.classList.contains("artist-release-feature")) return;

    const card = document.createElement("article");
    card.className = "artist-release-feature";
    card.innerHTML = `
      <a class="artist-release-cover" href="${release.spotify}" target="_blank" rel="noopener" aria-label="Listen to ${release.title} on Spotify">
        <img src="${release.image}" alt="${release.title} cover art" loading="lazy">
      </a>
      <div class="artist-release-info">
        <div class="small">Latest release</div>
        <h3>${release.title}</h3>
        <p>${release.type} · ${formatDate(release.date)}</p>
        <a class="btn btn-primary btn-sm" href="${release.spotify}" target="_blank" rel="noopener">Listen on Spotify</a>
      </div>`;

    oldList.replaceWith(card);
  }

  enhanceArtistRelease();
  window.addEventListener("hashchange", () => requestAnimationFrame(enhanceArtistRelease));

  const observer = new MutationObserver(() => enhanceArtistRelease());
  observer.observe(document.getElementById("main"), { childList: true, subtree: true });
})();
