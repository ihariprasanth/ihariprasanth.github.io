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


// 🔥 Home Button Triple Click — Full Neon Red Mode Toggle
let homeClickCount = 0;
let lastClickTime = 0;
let isRedMode = false;

const homeButton = document.querySelector('.sidebar-links a[href="#home"]');

if (homeButton) {
  homeButton.addEventListener("click", () => {
    const now = Date.now();

    // Count quick clicks (within 2 seconds)
    if (now - lastClickTime < 2000) {
      homeClickCount++;
    } else {
      homeClickCount = 1;
    }

    lastClickTime = now;

    // Trigger after 3 quick clicks
    if (homeClickCount === 3) {
      const glowLine = document.querySelector('.glow-line');

      if (!isRedMode) {
        // 🔴 Activate Red Mode
        document.documentElement.style.setProperty('--primary-color', '#ff0033');
        document.documentElement.style.setProperty('--secondary-color', '#ff3366');
        document.documentElement.style.setProperty('--border-color', '#ff0033');
        document.documentElement.style.setProperty('--shadow', '0 0 25px rgba(255,0,0,0.6)');
        document.documentElement.style.setProperty('--text-light', '#ffcccc');

        // Sidebar + Buttons + Glow update
        document.querySelectorAll('.sidebar-links a, .btn, .view-cert-btn, .verify-cert-btn, .social-link, .connect-box, .education-item, .skill-category').forEach(el => {
          el.style.transition = 'all 0.4s ease';
          el.style.borderColor = '#ff0033';
          el.style.boxShadow = 'none'; // default off
        });

        // Remove blue glow from vertical line
        if (glowLine) {
          glowLine.style.borderRight = '2px solid #ff0033';
          glowLine.style.boxShadow = 'none'; // 🚫 No glow at all
          glowLine.style.filter = 'none'; // remove any residual blue neon
          glowLine.style.background = 'none';
        }

        // Change highlight color
        document.querySelectorAll('.highlight').forEach(el => {
          el.style.color = '#ff0033';
        });

        console.log("🔥 RED MODE ACTIVATED");
        isRedMode = true;
      } else {
        // 🔵 Restore Blue Mode
        document.documentElement.style.setProperty('--primary-color', '#2563eb');
        document.documentElement.style.setProperty('--secondary-color', '#7c3aed');
        document.documentElement.style.setProperty('--border-color', '#2563eb');
        document.documentElement.style.setProperty('--shadow', '0 0 25px rgba(37,99,235,0.6)');
        document.documentElement.style.setProperty('--text-light', '#b5b5b5');

        // Sidebar + Buttons + Glow reset
        document.querySelectorAll('.sidebar-links a, .btn, .view-cert-btn, .verify-cert-btn, .social-link, .connect-box, .education-item, .skill-category').forEach(el => {
          el.style.transition = 'all 0.4s ease';
          el.style.borderColor = '#2563eb';
          el.style.boxShadow = 'none';
        });

        // Restore glowing blue line
        if (glowLine) {
          glowLine.style.borderRight = '2px solid #2563eb';
          glowLine.style.boxShadow = '0 0 20px rgba(37,99,235,0.9)';
          glowLine.style.filter = 'drop-shadow(0 0 8px #2563eb)';
        }

        // Restore highlight color
        document.querySelectorAll('.highlight').forEach(el => {
          el.style.color = '#2563eb';
        });

        console.log("🔵 BLUE MODE RESTORED");
        isRedMode = false;
      }

      // Reset click count
      homeClickCount = 0;
    }
  });
}


// 🌟 Hover Glow Effect (when arrow moves on buttons/sections)
document.addEventListener("mouseover", function (e) {
  const target = e.target.closest('.btn, .view-cert-btn, .verify-cert-btn, .education-item, .skill-category, .connect-box, .social-link');
  if (target) {
    target.style.boxShadow = `0 0 25px var(--primary-color)`;
    target.style.transition = 'box-shadow 0.3s ease';
  }
});

document.addEventListener("mouseout", function (e) {
  const target = e.target.closest('.btn, .view-cert-btn, .verify-cert-btn, .education-item, .skill-category, .connect-box, .social-link');
  if (target) {
    target.style.boxShadow = 'none';
  }
});
