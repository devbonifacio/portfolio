console.log("Portfolio loaded 🚀");

// ========================
// LANGUAGE TOGGLE
// ========================
let currentLang = "pt";

const langToggle = document.getElementById("langToggle");
const langPT = document.getElementById("langPT");
const langEN = document.getElementById("langEN");

function setActiveLang(lang) {
  langPT.classList.toggle("active", lang === "pt");
  langEN.classList.toggle("active", lang === "en");
}

function applyLanguage(lang) {
  document.querySelectorAll("[data-pt][data-en]").forEach(el => {
    el.innerHTML = el.getAttribute(`data-${lang}`);
  });
  document.documentElement.lang = lang;
  setActiveLang(lang);
}

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "pt" ? "en" : "pt";
  applyLanguage(currentLang);
});

// Init
setActiveLang("pt");


// ========================
// SCROLL REVEAL
// ========================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll("section:not(#hero)").forEach(section => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  observer.observe(section);
});


// ========================
// ACTIVE NAV HIGHLIGHT
// ========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.style.color = "";
    if (link.getAttribute("href") === `#${current}`) {
      link.style.color = "var(--accent)";
    }
  });
});