
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

const yearElements = document.querySelectorAll('[data-current-year]');
const currentYear = new Date().getFullYear();
if (yearElements.length) {
  yearElements.forEach((element) => {
    element.textContent = String(currentYear);
  });
}
