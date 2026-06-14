/* ════════════════════════════════════════
   NAVIGATION — shadow on scroll
════════════════════════════════════════ */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 20);
});

/* ════════════════════════════════════════
   HAMBURGER MENU — mobile toggle
════════════════════════════════════════ */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navLinks.classList.toggle("open");
});

// Close menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* ════════════════════════════════════════
   SCROLL REVEAL — fade-in on scroll
════════════════════════════════════════ */
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealElements.forEach((el) => observer.observe(el));

/* ════════════════════════════════════════
   LANGUAGE SWITCHER
════════════════════════════════════════ */
let currentLang = "ar";

// Called by the AR / EN buttons in HTML
function setLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;

  // Brief fade overlay so the switch feels smooth
  const overlay = document.getElementById("langOverlay");
  overlay.classList.add("flash");

  setTimeout(() => {
    applyLang(lang);
    overlay.classList.remove("flash");
  }, 220);
}

function applyLang(lang) {
  const html = document.documentElement;

  // 1. Switch document direction & language
  html.lang = lang;
  html.dir = lang === "ar" ? "rtl" : "ltr";

  // 2. Highlight the active button
  document.getElementById("btnAr").classList.toggle("active", lang === "ar");
  document.getElementById("btnEn").classList.toggle("active", lang === "en");

  // 3. Update page title
  document.title =
    lang === "ar" ? "مها علي | Portfolio" : "Maha Ali | Portfolio";

  // 4. Translate every element that has data-ar / data-en attributes
  document.querySelectorAll("[data-ar][data-en]").forEach((el) => {
    const value = el.dataset[lang];
    if (!value) return;

    // Footer contains inner <span> HTML — use innerHTML for it
    if (el.classList.contains("footer-text")) {
      el.innerHTML = value;
      return;
    }

    // Hero name is split into two spans — handled separately below
    if (el.classList.contains("hero-name")) return;

    // Everything else: plain text swap
    el.textContent = value;
  });

  // 5. Hero name: update each span individually to keep the colour span intact
  const heroPrefix = document.querySelector(".hero-prefix");
  const heroHighlight = document.querySelector(".hero-highlight");
  if (heroPrefix)
    heroPrefix.textContent = lang === "ar" ? "مرحباً، أنا " : "Hi, I'm ";
  if (heroHighlight)
    heroHighlight.textContent = lang === "ar" ? "مها علي" : "Maha Ali";
}
