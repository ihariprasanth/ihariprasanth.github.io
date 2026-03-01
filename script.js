// 🌐 Smooth Scrolling for Sidebar Menu Links
document.querySelectorAll('.sidebar-links a[href^="#"], .mobile-menu-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    // Highlight the active menu item
    document.querySelectorAll('.sidebar-links a, .mobile-menu-links a').forEach(link => link.classList.remove('active'));
    this.classList.add('active');
    
    // Close mobile menu after clicking
    const mobileDropdown = document.getElementById('mobileMenuDropdown');
    if (mobileDropdown) {
      mobileDropdown.classList.remove('active');
    }
  });
});

// ⚡ Animate Skill Bars
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px"
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress");

      skillBars.forEach((bar, index) => {
        const width = bar.getAttribute("data-width");
        if (!bar.classList.contains("filled")) {
          setTimeout(() => {
            bar.style.width = width + "%";
            bar.classList.add("filled");
          }, index * 150);
        }
      });

      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".education-item, .skills-grid, .skill-category").forEach(skillBox => {
  skillObserver.observe(skillBox);
});

// 🔢 Animate Counter Numbers
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-number");
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-count"));
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        if (!counter.classList.contains("counted")) {
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target + "+";
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, 16);
          counter.classList.add("counted");
        }
      });
    }
  });
}, observerOptions);

document.querySelectorAll(".about-stats").forEach(stats => {
  counterObserver.observe(stats);
});

// 💫 Page Load Fade-in Animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// ✨ TYPING ANIMATION FOR HERO TITLE - NO CURSOR AFTER
document.addEventListener('DOMContentLoaded', function() {
  const heroTitle = document.querySelector('.hero-text h1');
  if (!heroTitle) return;
  
  // Clear and set up the title structure
  heroTitle.innerHTML = '<span class="static-text">Hi, I\'m </span><span class="highlight"></span>';
  
  const highlightSpan = heroTitle.querySelector('.highlight');
  if (!highlightSpan) return;
  
  // Create cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  
  // Add cursor after the highlight span
  if (highlightSpan.nextSibling) {
    highlightSpan.parentNode.insertBefore(cursor, highlightSpan.nextSibling);
  } else {
    highlightSpan.parentNode.appendChild(cursor);
  }
  
  const nameText = "HARIPRASANTH.T";
  let i = 0;
  const typeSpeed = 100;
  
  function typeWriter() {
    if (i < nameText.length) {
      highlightSpan.innerHTML += nameText.charAt(i);
      i++;
      
      if (window.innerWidth <= 900) {
        setTimeout(typeWriter, 80);
      } else {
        setTimeout(typeWriter, typeSpeed);
      }
    } else {
      // Animation complete - hide the cursor after a delay
      setTimeout(() => {
        cursor.classList.add('hide-cursor');
      }, 300);
    }
  }
  
  // Start typing animation
  setTimeout(typeWriter, 500);
  
  // Force start on mobile
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    setTimeout(() => {
      if (i === 0) typeWriter();
    }, 100);
  }
});

// 📱 MOBILE MENU TOGGLE
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const menuDropdown = document.getElementById('mobileMenuDropdown');
  
  if (menuToggle && menuDropdown) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      menuDropdown.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!menuToggle.contains(e.target) && !menuDropdown.contains(e.target)) {
        menuDropdown.classList.remove('active');
      }
    });
    
    // Close menu on scroll
    window.addEventListener('scroll', function() {
      menuDropdown.classList.remove('active');
    });
  }
});

// 🔍 ACTIVE MENU HIGHLIGHT ON SCROLL
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      // Remove active class from all links
      document.querySelectorAll('.sidebar-links a, .mobile-menu-links a').forEach(link => {
        link.classList.remove('active');
      });
      
      // Add active class to matching links
      document.querySelectorAll(`.sidebar-links a[href="#${sectionId}"], .mobile-menu-links a[href="#${sectionId}"]`).forEach(link => {
        link.classList.add('active');
      });
    }
  });
});
