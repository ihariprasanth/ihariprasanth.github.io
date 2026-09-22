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

  // 2. Mobile Navigation Toggle
  var navToggle = document.getElementById('navToggle');
  var navList = document.getElementById('navList');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close menu when clicking any nav link
    var navLinks = navList.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
      if (navList.classList.contains('active') && !navList.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navList.classList.contains('active')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navList.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
});
