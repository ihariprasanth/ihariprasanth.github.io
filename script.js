// 🌐 Smooth Scrolling for Sidebar Menu Links
document.querySelectorAll('.sidebar-links a[href^="#"]').forEach(anchor => {
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
    document.querySelectorAll('.sidebar-links a').forEach(link => link.classList.remove('active'));
    this.classList.add('active');
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

// ✨ TYPING ANIMATION FOR HERO TITLE
document.addEventListener('DOMContentLoaded', function() {
  // Add cursor element for typing animation
  const style = document.createElement('style');
  style.textContent = `
    .typed-cursor {
      display: inline-block;
      width: 3px;
      height: 3.2rem;
      background-color: #2563eb;
      margin-left: 5px;
      animation: blink 0.7s infinite;
      vertical-align: middle;
    }
    
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
    
    @media (max-width: 900px) {
      .typed-cursor {
        height: 2rem;
      }
    }
    
    @media (max-width: 480px) {
      .typed-cursor {
        height: 1.8rem;
      }
    }
  `;
  document.head.appendChild(style);

  const heroTitle = document.querySelector('.hero-text h1');
  if (!heroTitle) return;
  
  // Clear the title and set up for typing
  heroTitle.innerHTML = 'Hi, I\'m <span class="highlight"></span>';
  
  const highlightSpan = heroTitle.querySelector('.highlight');
  if (!highlightSpan) return;
  
  // Add cursor after the highlight span
  const cursor = document.createElement('span');
  cursor.className = 'typed-cursor';
  heroTitle.appendChild(cursor);
  
  const nameText = "HARIPRASANTH.T";
  let i = 0;
  const typeSpeed = 100; // milliseconds per character
  
  function typeWriter() {
    if (i < nameText.length) {
      highlightSpan.innerHTML += nameText.charAt(i);
      i++;
      setTimeout(typeWriter, typeSpeed);
    } else {
      // Keep cursor blinking after typing completes
      cursor.style.animation = 'blink 0.7s infinite';
    }
  }
  
  // Start typing animation after a short delay
  setTimeout(typeWriter, 500);
});
