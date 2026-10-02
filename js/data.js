/* =========================================================
   MOON BASE AUDIO — SITE DATA
   Edit everything in this file. Every page rebuilds from it.
   All paths are relative to index.html.
   ========================================================= */

const SITE = {
  name: "Moon Base Audio",
  logo: "assets/images/moon-base-logo.jpg",
  // Change this one value to update the booking email everywhere on the site.
  bookingEmail: "EddieRosasMoonbase@gmail.com",
  manager: { name: "Eddie Rosas", title: "Talent Manager" },
  homeMarket: "Jackson, Mississippi",
  travel: "Available throughout Mississippi, New Orleans, and surrounding regional markets.",
  // Replace the PDF at this path to update the EPK. Keep the filename or change it here.
  epk: {
    url: "assets/epk/Moon_Base_Audio_Paul_McCall_Arferello_EPK.pdf",
    filename: "Moon_Base_Audio_Paul_McCall_Arferello_EPK.pdf"
  },
  /* Booking form delivery.
     ""  (default): submitting opens the visitor's email app with the inquiry
         prefilled and addressed to bookingEmail. No backend needed.
     URL: the form is POSTed to this URL as multipart form data instead
         (works with Formspree, Getform, Basin, a Netlify/Vercel function, etc.).
         The endpoint should return a 2xx status on success. */
  formEndpoint: "",
  // Moon Base Audio's own channels.
  social: {
    instagram: "https://instagram.com/moonbaseaudio",
    spotify: null,
    youtube: null
  }
};

const ARTISTS = [
  {
    slug: "paul-mccall",
    name: "Paul McCall",
    short: "Mississippi independent rapper with a multi-year catalog and an active regional audience.",
    tagline: "Independent rapper. Mississippi.",
    bio: [
      "Paul McCall is an independent rapper from Mississippi who has been putting out music on his own for several years. That work has built the deepest catalog on the Moon Base roster and an active regional audience.",
      "Current material includes the HATE THE PLAYER project. Paul performs live around Jackson alongside Arferello as part of the Moon Base Audio run."
    ],
    image: "assets/images/paul-mccall.jpg",
    imagePosition: "50% 30%",
    metrics: { spotifyMonthly: 6874, instagramFollowers: 4500 },
    links: {
      instagram: { handle: "@paulyftw", url: "https://instagram.com/paulyftw" },
      beacons: "https://beacons.ai/paulyftw",
      spotify: "https://open.spotify.com/artist/3E1tGVJPzqka4u67JleS3t?si=FraoMo9SQ-mnHxrmfRO0qQ",
      youtube: null,
      appleMusic: null
    },
    releases: [
      { title: "HATE THE PLAYER", type: "Project", year: null, credit: null, url: null },
      { title: "Demons", type: "Single", year: null, credit: "Arferello feat. Paul McCall", url: null }
    ]
  },
  {
    slug: "arferello",
    name: "Arferello",
    short: "Emerging Mississippi artist with a melodic sound between alternative, pop, and hip-hop.",
    tagline: "Melodic alternative, pop, and hip-hop. Mississippi.",
    bio: [
      "Arferello is an emerging Mississippi artist whose songs sit between melodic alternative, pop, and hip-hop.",
      "Recent releases include “Free,” a stripped-back unplugged version of the same song, “Dirty Dancing,” and “Demons” with Paul McCall. Arferello performs live around Jackson with Paul as part of the Moon Base Audio run."
    ],
    image: "assets/images/arferello.jpg",
    imagePosition: "62% 40%",
    metrics: { spotifyMonthly: 70, instagramFollowers: 1000 },
    links: {
      instagram: { handle: "@arferello", url: "https://instagram.com/arferello" },
      beacons: "https://beacons.ai/arferello",
      spotify: "https://open.spotify.com/artist/6pYXstzGkC9T8BEDyh0ERL?si=kL9FvEd2TCe9U-RSVbRtMQ",
      youtube: null,
      appleMusic: null
    },
    releases: [
      { title: "Free", type: "Single", year: null, credit: null, url: null },
      { title: "Free (Unplugged)", type: "Single", year: null, credit: null, url: null },
      { title: "Dirty Dancing", type: "Single", year: null, credit: null, url: null },
      { title: "Demons", type: "Single", year: null, credit: "feat. Paul McCall", url: null }
    ]
  }
];

const LIVE_ACT = {
  name: "Paul McCall + Arferello",
  artists: ["paul-mccall", "arferello"],
  setLength: "Approximately 30 minutes",
  homeMarket: "Jackson, Mississippi",
  bestFit: ["Opening acts", "Support slots", "Hip-hop bills", "Alternative bills", "Indie bills", "Crossover shows"],
  availableFor: ["Opening slots", "Support slots", "Showcases", "Festivals", "College events", "Regional bills", "Private music events"],
  collabs: [{ title: "Demons", credit: "Arferello feat. Paul McCall", url: null }]
};

const TOUR_INFO = {
  name: "City of Jackson Tour",
  presenter: "Moon Base Audio presents",
  span: "All month long, October 2026",
  flyer: "assets/images/city-of-jackson-tour-flyer.jpg"
};
const TOUR = [
  { venue: "End of All Music",     city: "Jackson, MS", date: "2026-10-01", doors: "7 PM", act: "Paul McCall + Arferello", tour: "City of Jackson Tour", url: null },
  { venue: "Urban Foxes",          city: "Jackson, MS", date: "2026-10-02", doors: "7 PM", act: "Paul McCall + Arferello", tour: "City of Jackson Tour", url: null },
  { venue: "Souveneer Records",    city: "Jackson, MS", date: "2026-10-09", doors: "7 PM", act: "Paul McCall + Arferello", tour: "City of Jackson Tour", url: null },
  { venue: "Jackson State (WGTJ)", city: "Jackson, MS", date: "2026-10-18", doors: "7 PM", act: "Paul McCall + Arferello", tour: "City of Jackson Tour", url: null },
  { venue: "Conkrete Kickz",       city: "Jackson, MS", date: "2026-10-24", doors: "7 PM", act: "Paul McCall + Arferello", tour: "City of Jackson Tour", url: null }
];

const SEO = {
  "/":         ["Moon Base Audio | Jackson Mississippi Music & Independent Artists", "Moon Base Audio is an independent artist platform in Jackson, Mississippi, working with Mississippi independent artists Paul McCall and Arferello."],
  "/artists":  ["Artists | Paul McCall & Arferello | Moon Base Audio", "Mississippi independent artists on Moon Base Audio: Paul McCall and Arferello. Mississippi hip-hop, alternative, and pop from Jackson, MS."],
  "/booking":  ["Book Paul McCall + Arferello | Jackson Mississippi Live Music | Moon Base Audio", "Book Paul McCall + Arferello for opening slots, showcases, festivals, and college events. 30-minute live set based in Jackson, Mississippi."],
  "/tour":     ["Live Dates | Paul McCall + Arferello | Moon Base Audio", "Live dates for Moon Base Audio artists Paul McCall and Arferello across Jackson, Mississippi."],
  "/about":    ["About | Moon Base Audio | Jackson Mississippi Independent Music", "Moon Base Audio develops independent artists in Jackson, Mississippi through live performance, releases, and regional growth."],
  "/contact":  ["Contact & Booking | Moon Base Audio", "Contact Eddie Rosas, Talent Manager at Moon Base Audio, for booking Paul McCall and Arferello."],
  "paul-mccall": ["Paul McCall | Mississippi Hip-Hop | Moon Base Audio", "Paul McCall is a Mississippi independent rapper with a multi-year catalog. Listen, follow, and book through Moon Base Audio."],
  "arferello":   ["Arferello | Mississippi Independent Artist | Moon Base Audio", "Arferello is an emerging Mississippi artist with a melodic alternative, pop, and hip-hop sound. Listen and book through Moon Base Audio."]
};

const NAV = [
  { path: "/artists", label: "Artists" },
  { path: "/tour", label: "Live" },
  { path: "/booking", label: "Booking" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" }
];

