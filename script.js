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

// ⚡ Animate Skill Bars when they come into view
const observerOptions = {
  threshold: 0.4,
  rootMargin: "0px 0px -50px 0px"
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress");
      skillBars.forEach(bar => {
        const width = bar.getAttribute("data-width");
        if (!bar.classList.contains("filled")) {
          bar.style.width = width + "%";
          bar.classList.add("filled");
        }
      });
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-category").forEach(skill => {
  skillObserver.observe(skill);
});

// 🔢 Animate Counter Numbers (About Stats)
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-number");
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-count"));
        const duration = 1800; // ms
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

// 🌟 Sidebar Glow Animation (Optional)
const sidebar = document.querySelector(".sidebar");
let glow = 0;
setInterval(() => {
  glow = glow === 0 ? 0.6 : 0;
  sidebar.style.boxShadow = `0 0 ${glow ? 25 : 10}px rgba(37, 99, 235, ${glow})`;
}, 1800);
// 🔥 Easter Egg: Change Theme to Red after 3 quick Home clicks
let homeClickCount = 0;
let lastClickTime = 0;

const homeButton = document.querySelector('.sidebar-links a[href="#home"]');

if (homeButton) {
  homeButton.addEventListener("click", () => {
    const now = Date.now();

    // Check if clicks are within 2 seconds of each other
    if (now - lastClickTime < 2000) {
      homeClickCount++;
    } else {
      homeClickCount = 1; // reset if clicks too slow
    }

    lastClickTime = now;

    // Trigger red theme on 3 fast clicks
    if (homeClickCount === 3) {
      document.documentElement.style.setProperty('--primary-color', '#ff0033');
      document.documentElement.style.setProperty('--secondary-color', '#ff3333');
      document.documentElement.style.setProperty('--border-color', '#ff0033');
      document.documentElement.style.setProperty('--text-color', '#fff');
      document.documentElement.style.setProperty('--text-light', '#ffcccc');
      document.documentElement.style.setProperty('--bg-color', '#1a0000');
      document.documentElement.style.setProperty('--bg-secondary', '#220000');
      document.documentElement.style.setProperty('--shadow', '0 0 25px rgba(255,0,0,0.5)');
      
      // Optional: Add a quick pulse animation
      document.body.style.transition = 'all 0.5s ease';
      document.body.style.boxShadow = '0 0 40px rgba(255,0,0,0.7) inset';
      setTimeout(() => {
        document.body.style.boxShadow = 'none';
      }, 1000);

      console.log("🔥 Red Mode Activated!");
      homeClickCount = 0; // reset counter
    }
  });
}
