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

// 🔢 Animate Counter Numbers (About Stats)
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll(".stat-number");
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute("data-count"));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // smooth FPS-based step
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target + "+";
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 16);
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
