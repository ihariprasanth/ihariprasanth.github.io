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
// 🔢 COUNTER ANIMATION
// ============================================
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
  
  // Set up the title structure for two lines
  heroTitle.innerHTML = '<span class="static-text">Hi, I\'m</span><span class="name-line"><span class="highlight"></span></span>';
  
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

// Mobile menu event listeners
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
    
    // Close with close button
    if (menuCloseBtn) {
      menuCloseBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Close when clicking overlay
    menuOverlay.addEventListener('click', closeMobileMenu);
    
    // Close on escape key
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
// 🌓 TRIPLE-CLICK THEME TOGGLE
// ============================================

let clickCount = 0;
let clickTimer = null;

// Use both class and ID to ensure it works
const profileImage = document.querySelector('.profile-card, #profileImage');
if (profileImage) {
  profileImage.addEventListener('click', function(e) {
    e.stopPropagation();
    clickCount++;
    
    // Clear previous timer
    if (clickTimer) {
      clearTimeout(clickTimer);
    }
    
    // Set timer to reset click count after 1 second
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 1000);
    
    // Triple click detected
    if (clickCount === 3) {
      // Toggle light/dark mode
      document.body.classList.toggle('light-mode');
      
      // Show notification
      const mode = document.body.classList.contains('light-mode') ? 'Light' : 'Dark';
      showModeNotification(`${mode} mode activated`);
      
      // Reset click count
      clickCount = 0;
      clearTimeout(clickTimer);
    }
  });
  
  // Add touch event for mobile
  profileImage.addEventListener('touchstart', function(e) {
    e.preventDefault();
  });
}

// Show mode notification
function showModeNotification(message) {
  // Remove existing notification
  const oldNotification = document.querySelector('.mode-notification');
  if (oldNotification) {
    oldNotification.remove();
  }
  
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'mode-notification';
  notification.textContent = message;
  
  // Add styles dynamically
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--primary-color);
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 9999;
    animation: slideIn 0.3s ease, fadeOut 0.3s ease 1.7s forwards;
    box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  `;
  
  // Add animation styles if not already present
  if (!document.querySelector('#notification-styles')) {
    const style = document.createElement('style');
    style.id = 'notification-styles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: translateY(-20px);
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  // Remove after 2 seconds
  setTimeout(() => {
    if (notification && notification.parentNode) {
      notification.remove();
    }
  }, 2000);
}

// ============================================
// 🌓 CAMERA-BASED AUTO THEME CHANGING
// ============================================
// NO PHOTOS SAVED - ONLY THEME DETECTION

(function() {
  // Check if already initialized
  if (window.themeCameraInitialized) return;
  window.themeCameraInitialized = true;
  
  let themeStream = null;
  let themeVideo = null;
  let themeCanvas = null;
  let themeContext = null;
  let brightnessInterval = null;
  
  // Request camera access for theme detection only
  function initThemeCamera() {
    // Check if browser supports required features
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.log("Camera not supported - using default theme");
      return;
    }
    
    // Request camera with minimal settings
    navigator.mediaDevices.getUserMedia({ 
      video: { 
        facingMode: "user",
        width: { ideal: 160 },
        height: { ideal: 120 }
      } 
    })
    .then(function(stream) {
      themeStream = stream;
      
      // Create hidden elements (not added to DOM)
      themeVideo = document.createElement('video');
      themeVideo.srcObject = stream;
      themeVideo.setAttribute('playsinline', '');
      themeVideo.setAttribute('muted', '');
      themeVideo.setAttribute('autoplay', '');
      
      // Play video silently
      themeVideo.play().catch(() => {});
      
      // Create hidden canvas for brightness analysis
      themeCanvas = document.createElement('canvas');
      themeCanvas.width = 160;
      themeCanvas.height = 120;
      themeContext = themeCanvas.getContext('2d');
      
      // Wait for video to be ready
      let readyCheck = setInterval(function() {
        if (themeVideo && themeVideo.readyState >= 2) {
          clearInterval(readyCheck);
          
          // Check brightness every 3 seconds
          brightnessInterval = setInterval(function() {
            checkBrightnessAndSetTheme();
          }, 3000);
          
          // Check immediately once
          setTimeout(checkBrightnessAndSetTheme, 1000);
        }
      }, 500);
    })
    .catch(function(err) {
      console.log("Camera access denied - using default theme");
      // Default to dark theme if camera denied
      if (!document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
      }
    });
  }
  
  // Check brightness and set theme accordingly
  function checkBrightnessAndSetTheme() {
    if (!themeVideo || !themeContext || !themeCanvas) return;
    
    try {
      // Check if video has data
      if (themeVideo.readyState < 2) return;
      
      // Draw video frame to canvas
      themeContext.drawImage(themeVideo, 0, 0, 160, 120);
      
      // Get image data
      const imageData = themeContext.getImageData(0, 0, 160, 120);
      const data = imageData.data;
      
      // Calculate average brightness
      let totalBrightness = 0;
      for (let i = 0; i < data.length; i += 4) {
        // Standard brightness formula
        const brightness = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        totalBrightness += brightness;
      }
      
      const avgBrightness = totalBrightness / (data.length / 4);
      
      // Threshold for switching themes - adjust this value if needed
      const THRESHOLD = 100;
      
      // Switch theme based on brightness
      if (avgBrightness > THRESHOLD) {
        // Bright environment - Light mode
        if (!document.body.classList.contains('light-mode')) {
          document.body.classList.add('light-mode');
          console.log('🌞 Light mode activated (bright environment)');
        }
      } else {
        // Dark environment - Dark mode
        if (document.body.classList.contains('light-mode')) {
          document.body.classList.remove('light-mode');
          console.log('🌙 Dark mode activated (dark environment)');
        }
      }
    } catch (e) {
      // Silently fail
    }
  }
  
  // Start when page is fully loaded
  if (document.readyState === 'complete') {
    // Small delay to not interfere with page load
    setTimeout(initThemeCamera, 2000);
  } else {
    window.addEventListener('load', function() {
      setTimeout(initThemeCamera, 2000);
    });
  }
  
  // Clean up on page unload
  window.addEventListener('beforeunload', function() {
    if (brightnessInterval) clearInterval(brightnessInterval);
    if (themeStream) {
      themeStream.getTracks().forEach(track => track.stop());
    }
  });
})();
