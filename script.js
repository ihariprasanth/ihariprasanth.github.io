// 🌗 Theme Toggle (iOS-style switch)
const toggle = document.getElementById("themeToggle");
const root = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem("theme") || 
  (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

root.setAttribute("data-theme", savedTheme);
toggle.checked = savedTheme === "dark";

// Toggle switch event
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
});

// 🌐 Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// 🧭 Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    if (document.documentElement.getAttribute("data-theme") === "dark") {
      navbar.style.background = "rgba(23, 23, 23, 0.95)";
    }
  } else {
    navbar.style.background = "transparent";
  }
});

// ⚡ Animate Skill Bars when in View
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
        const duration = 2000;
        const step = target / (duration / 16);
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

// 🍔 Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  hamburger.classList.toggle("active");
});

// Close mobile menu when clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.style.display = "none";
    hamburger.classList.remove("active");
  });
});

// 💫 Page Load Fade-in Animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.4s ease";
  
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});
