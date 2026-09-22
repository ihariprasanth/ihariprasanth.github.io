/**
 * Hariprasanth T — Portfolio Scripts
 * Minimalist navigation toggle and utilities
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Dynamic Year in Footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle & Backdrop
  var navToggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');
  var navBackdrop = document.getElementById('navBackdrop');

  function closeNav() {
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    if (navList) navList.classList.remove('active');
    if (navBackdrop) navBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openNav() {
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    if (navList) navList.classList.add('active');
    if (navBackdrop) navBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle && navList) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeNav);
    }

    // Close menu when clicking any nav link
    var navLinks = navList.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('active')) {
        closeNav();
      }
    });
  }
});
