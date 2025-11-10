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
  });
});

// ⚡ Animate Skill Bars when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px"
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress");
      skillBars.forEach(bar => {
        const width = bar.getAttribute("data-width");
        bar.style.width = width + "%";
      });
    }
  });
}, observerOptions);

document.querySelectorAll(".skill-category").forEach(skill => {
  skillObserver.observe(skill);
});

// 💫 Page Load Fade-in Animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// 🌟 Section Glow on Scroll
const glowSections = document.querySelectorAll(
  ".education-item, .connect-box, .skill-category, .about, .hero-buttons .btn"
);

const glowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.boxShadow = "0 0 25px var(--primary-color)";
      entry.target.style.transition = "box-shadow 0.6s ease";
    } else {
      entry.target.style.boxShadow = "none";
    }
  });
}, { threshold: 0.4 });

glowSections.forEach(section => glowObserver.observe(section));

// 🔥 Home Button Triple Click — Red Mode Toggle (with section-based glow)
let homeClickCount = 0;
let lastClickTime = 0;
let isRedMode = false;

const homeButton = document.querySelector('.sidebar-links a[href="#home"]');

if (homeButton) {
  homeButton.addEventListener("click", () => {
    const now = Date.now();

    if (now - lastClickTime < 2000) {
      homeClickCount++;
    } else {
      homeClickCount = 1;
    }

    lastClickTime = now;

    if (homeClickCount === 3) {
      if (!isRedMode) {
        // 🔴 Activate Red Mode
        document.documentElement.style.setProperty('--primary-color', '#ff0033');
        document.documentElement.style.setProperty('--secondary-color', '#ff3366');
        document.documentElement.style.setProperty('--border-color', '#ff0033');
        document.documentElement.style.setProperty('--shadow', '0 0 25px rgba(255,0,0,0.6)');
        document.documentElement.style.setProperty('--text-light', '#ffcccc');

        // Disable vertical glow line in red mode
        const glowLine = document.querySelector(".glow-line");
        if (glowLine) {
          glowLine.style.boxShadow = "none";
          glowLine.style.borderRight = "2px solid #ff0033";
        }

        console.log("🔥 Red Mode Activated");
        isRedMode = true;
      } else {
        // 🔵 Restore Blue Mode
        document.documentElement.style.setProperty('--primary-color', '#2563eb');
        document.documentElement.style.setProperty('--secondary-color', '#7c3aed');
        document.documentElement.style.setProperty('--border-color', '#2563eb');
        document.documentElement.style.setProperty('--shadow', '0 0 25px rgba(37,99,235,0.6)');
        document.documentElement.style.setProperty('--text-light', '#b5b5b5');

        // Restore vertical glow line in blue mode
        const glowLine = document.querySelector(".glow-line");
        if (glowLine) {
          glowLine.style.borderRight = "2px solid #2563eb";
          glowLine.style.boxShadow = "0 0 20px rgba(37,99,235,0.8)";
        }

        console.log("🔵 Blue Mode Restored");
        isRedMode = false;
      }

      homeClickCount = 0;
    }
  });
}
