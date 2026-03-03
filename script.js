// ============================================
// 🌐 SMOOTH SCROLLING FOR MENU LINKS
// ============================================
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
    
    // AUTO-CLOSE mobile menu after clicking
    closeMobileMenu();
  });
});

// ============================================
// ⚡ SKILL BARS ANIMATION
// ============================================
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

// ============================================
// ✨ GLASS ICON CARDS ANIMATION
// ============================================
const glassObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 50);
      glassObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-glass-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'all 0.4s ease';
  glassObserver.observe(card);
});

// ============================================
// 💫 PAGE LOAD FADE-IN
// ============================================
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// ============================================
// ✨ TYPING ANIMATION FOR HERO TITLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Add cursor styles dynamically if not in CSS
  if (!document.querySelector('#typing-styles')) {
    const style = document.createElement('style');
    style.id = 'typing-styles';
    style.textContent = `
      .typed-cursor {
        display: inline-block;
        width: 3px;
        height: 1.2em;
        background-color: var(--primary-color);
        margin-left: 2px;
        animation: blink 0.7s infinite;
        vertical-align: middle;
      }
      
      .typed-cursor.hide-cursor {
        display: none !important;
      }
      
      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  const heroTitle = document.querySelector('.hero-text h1');
  if (!heroTitle) return;
  
  heroTitle.innerHTML = '<span class="static-text">Hi, I\'m</span><span class="name-line"><span class="highlight"></span></span>';
  
  const highlightSpan = heroTitle.querySelector('.highlight');
  if (!highlightSpan) return;
  
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  
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
      setTimeout(() => {
        cursor.classList.add('hide-cursor');
      }, 300);
    }
  }
  
  setTimeout(typeWriter, 500);
  
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    setTimeout(() => {
      if (i === 0) typeWriter();
    }, 100);
  }
});

// ============================================
// 📱 MOBILE MENU FUNCTIONS
// ============================================
function closeMobileMenu() {
  const menuPopup = document.getElementById('mobileMenuPopup');
  const menuOverlay = document.getElementById('menuOverlay');
  if (menuPopup && menuOverlay) {
    menuPopup.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
}

function openMobileMenu() {
  const menuPopup = document.getElementById('mobileMenuPopup');
  const menuOverlay = document.getElementById('menuOverlay');
  if (menuPopup && menuOverlay) {
    menuPopup.classList.add('active');
    menuOverlay.classList.add('active');
    document.body.classList.add('menu-open');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const menuPopup = document.getElementById('mobileMenuPopup');
  const menuOverlay = document.getElementById('menuOverlay');
  const menuCloseBtn = document.getElementById('menuCloseBtn');
  
  if (menuToggle && menuPopup && menuOverlay) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      openMobileMenu();
    });
    
    if (menuCloseBtn) {
      menuCloseBtn.addEventListener('click', closeMobileMenu);
    }
    
    menuOverlay.addEventListener('click', closeMobileMenu);
    
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menuPopup.classList.contains('active')) {
        closeMobileMenu();
      }
    });
  }
});

// ============================================
// 🔍 ACTIVE MENU HIGHLIGHT ON SCROLL
// ============================================
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      document.querySelectorAll('.sidebar-links a, .mobile-menu-links a').forEach(link => {
        link.classList.remove('active');
      });
      
      document.querySelectorAll(`.sidebar-links a[href="#${sectionId}"], .mobile-menu-links a[href="#${sectionId}"]`).forEach(link => {
        link.classList.add('active');
      });
    }
  });
});

// ============================================
// 🚫 COPY PROTECTION
// ============================================

// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// Disable keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // F12
  if (e.key === 'F12') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+I (Inspect)
  if (e.ctrlKey && e.shiftKey && e.key === 'I') {
    e.preventDefault();
    return false;
  }
  // Ctrl+Shift+J (Console)
  if (e.ctrlKey && e.shiftKey && e.key === 'J') {
    e.preventDefault();
    return false;
  }
  // Ctrl+U (View Source)
  if (e.ctrlKey && e.key === 'u') {
    e.preventDefault();
    return false;
  }
  
  // Disable copy
  if (e.ctrlKey && e.key === 'c') {
    e.preventDefault();
    return false;
  }
  
  // Disable cut
  if (e.ctrlKey && e.key === 'x') {
    e.preventDefault();
    return false;
  }
  
  // Disable paste
  if (e.ctrlKey && e.key === 'v') {
    e.preventDefault();
    return false;
  }
  
  // Disable select all
  if (e.ctrlKey && e.key === 'a') {
    e.preventDefault();
    return false;
  }
  
  // Disable save
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    return false;
  }
  
  // Disable print
  if (e.ctrlKey && e.key === 'p') {
    e.preventDefault();
    return false;
  }
});

// Disable text selection
document.addEventListener('selectstart', function(e) {
  e.preventDefault();
  return false;
});

// Disable copy event
document.addEventListener('copy', function(e) {
  e.preventDefault();
  return false;
});

// Disable cut event
document.addEventListener('cut', function(e) {
  e.preventDefault();
  return false;
});

// Disable drag and drop
document.addEventListener('dragstart', function(e) {
  e.preventDefault();
  return false;
});

// Disable drop
document.addEventListener('drop', function(e) {
  e.preventDefault();
  return false;
});

// ============================================
// 📊 LEETCODE ACHIEVEMENTS ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // LeetCode stats (you can update these numbers)
  const leetcodeStats = {
    problemsSolved: 150,
    easy: 65,
    medium: 70,
    hard: 15,
    rating: 1450,
    badgeCount: 2
  };
  
  // Calculate percentages for circles
  const problemsPercentage = (leetcodeStats.problemsSolved / 300) * 100; // Assuming 300 total
  const ratingPercentage = (leetcodeStats.rating / 3000) * 100; // Assuming 3000 max rating
  const badgesPercentage = (leetcodeStats.badgeCount / 10) * 100; // Assuming 10 max badges
  
  // Update text values
  document.getElementById('problemsValue').textContent = leetcodeStats.problemsSolved;
  document.getElementById('easyCount').textContent = leetcodeStats.easy;
  document.getElementById('mediumCount').textContent = leetcodeStats.medium;
  document.getElementById('hardCount').textContent = leetcodeStats.hard;
  document.getElementById('ratingValue').textContent = leetcodeStats.rating;
  document.getElementById('badgesValue').textContent = leetcodeStats.badgeCount;
  
  // Animate circular progress
  animateProgress('problemsProgress', problemsPercentage);
  animateProgress('ratingProgress', ratingPercentage);
  animateProgress('badgesProgress', badgesPercentage);
});

function animateProgress(elementId, percentage) {
  const progress = document.getElementById(elementId);
  if (!progress) return;
  
  const degrees = (percentage / 100) * 360;
  let currentDegrees = 0;
  const step = degrees / 50; // 50 steps animation
  const interval = setInterval(() => {
    if (currentDegrees >= degrees) {
      clearInterval(interval);
      progress.style.background = `conic-gradient(var(--primary-color) ${degrees}deg, rgba(37, 99, 235, 0.2) ${degrees}deg)`;
    } else {
      currentDegrees += step;
      progress.style.background = `conic-gradient(var(--primary-color) ${currentDegrees}deg, rgba(37, 99, 235, 0.2) ${currentDegrees}deg)`;
    }
  }, 30);
}
