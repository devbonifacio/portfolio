/**
 * ==============================================
 *  PORTFOLIO — Bonifácio Jr.
 *  script.js — modular e comentado
 *
 *  Funcionalidades:
 *  1. Toggle de idioma PT/EN com persistência
 *  2. Menu mobile responsivo
 *  3. Filtro de projetos por categoria
 *  4. Scroll reveal (animação ao entrar na tela)
 *  5. Atualização automática do ano no rodapé
 *  6. Fechar menu mobile ao clicar em link
 * ==============================================
 */

// Aguarda o DOM carregar totalmente antes de executar
document.addEventListener('DOMContentLoaded', () => {

  initLanguageToggle();
  initMobileMenu();
  initProjectFilters();
  initScrollReveal();
  initFooterYear();

});


/* ============================================
   1. LANGUAGE TOGGLE (PT / EN)
   Troca o conteúdo de todos os elementos com
   data-pt e data-en e salva a preferência no
   localStorage para persistir entre visitas.
============================================ */
function initLanguageToggle() {
  const langPT = document.getElementById('langPT');
  const langEN = document.getElementById('langEN');

  if (!langPT || !langEN) return;

  // Carrega o idioma salvo ou usa PT por padrão
  const savedLang = localStorage.getItem('lang') || 'pt';
  setLanguage(savedLang);

  langPT.addEventListener('click', () => setLanguage('pt'));
  langEN.addEventListener('click', () => setLanguage('en'));
}

function setLanguage(lang) {
  // Salva preferência
  localStorage.setItem('lang', lang);

  // Atualiza <html lang="..."> (bom pra SEO e acessibilidade)
  document.documentElement.lang = lang;

  // Atualiza o estado visual do toggle
  document.getElementById('langPT')?.classList.toggle('active', lang === 'pt');
  document.getElementById('langEN')?.classList.toggle('active', lang === 'en');

  // Atualiza cada elemento que tem tradução
  document.querySelectorAll('[data-pt][data-en]').forEach(el => {
    const translation = el.getAttribute(`data-${lang}`);
    if (translation) {
      el.innerHTML = translation;
    }
  });
}


/* ============================================
   2. MENU MOBILE
   Abre/fecha o menu em telas pequenas.
   Fecha automaticamente ao clicar num link.
============================================ */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');

  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });

  // Fecha ao clicar em qualquer link
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
    });
  });
}


/* ============================================
   3. PROJECT FILTERS
   Filtra os projetos por categoria
   (All, Full Stack, Frontend, Profissional).
============================================ */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  if (filterBtns.length === 0 || projects.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Atualiza botão ativo
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filtra os projetos
      projects.forEach(project => {
        const categories = project.getAttribute('data-category') || '';

        if (filter === 'all' || categories.includes(filter)) {
          project.classList.remove('hidden');
        } else {
          project.classList.add('hidden');
        }
      });
    });
  });
}


/* ============================================
   4. SCROLL REVEAL
   Anima elementos ao entrarem na viewport.
   Usa IntersectionObserver (moderno e performático).
============================================ */
function initScrollReveal() {
  // Elementos que devem ter animação ao rolar
  const selectors = [
    '.about-text',
    '.about-card',
    '.timeline-item',
    '.skill-group',
    '.project-card',
    '.contact-inner'
  ];

  const elements = document.querySelectorAll(selectors.join(', '));

  // Adiciona a classe base pra animação
  elements.forEach(el => el.classList.add('reveal'));

  // Configura o observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Remove após animar (otimização)
      }
    });
  }, {
    threshold: 0.1,       // Dispara quando 10% do elemento tá visível
    rootMargin: '0px 0px -50px 0px' // Pequeno offset pro efeito ser natural
  });

  elements.forEach(el => observer.observe(el));
}


/* ============================================
   5. FOOTER YEAR
   Atualiza o ano no rodapé automaticamente.
============================================ */
function initFooterYear() {
  const footerYear = document.getElementById('footerYear');
  if (!footerYear) return;

  const year = new Date().getFullYear();
  footerYear.textContent = `© ${year} Bonifácio Jr.`;
}
