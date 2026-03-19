console.log("Portfolio loaded 🚀");

// ========================
// ELEMENTS
// ========================
const langToggle = document.getElementById("langToggle");
const langPT = document.getElementById("langPT");
const langEN = document.getElementById("langEN");
const menuToggle = document.getElementById("menuToggle");
const navLinksContainer = document.getElementById("navLinks");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section[id]");

// ========================
// LANGUAGE TOGGLE + SAVE
// ========================
let currentLang = localStorage.getItem("language") || "pt";

function setActiveLang(lang) {
  langPT.classList.toggle("active", lang === "pt");
  langEN.classList.toggle("active", lang === "en");
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-pt][data-en]").forEach((el) => {
    el.innerHTML = el.getAttribute(`data-${lang}`);
  });

  document.documentElement.lang = lang;
  setActiveLang(lang);
  localStorage.setItem("language", lang);
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  applyLanguage(currentLang);
});

applyLanguage(currentLang);

// ========================
// MOBILE MENU
// ========================
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("open");
  });
});

// ========================
// SCROLL REVEAL
// ========================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll("section:not(#hero)").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  observer.observe(section);
});

// ========================
// ACTIVE NAV HIGHLIGHT
// ========================
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});