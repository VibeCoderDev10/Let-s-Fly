/*
  =========================================
  Let's Fly Philanthropy - Core Javascript
  =========================================
*/

// --- SMOOTH SCROLLING ---
function goTo(id) {
  var el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// --- MOBILE DRAWER DRAWER ---
function closeMobile() {
  document.querySelector('.mobile-menu').classList.remove('open');
}

// --- FAQ ACCORDION EXPANSION ---
function toggleFaq(el) {
  var ans = el.nextElementSibling;
  var arrow = el.querySelector('.faq-arrow');
  var isOpen = ans.classList.contains('open');
  
  document.querySelectorAll('.faq-a').forEach(function(a) {
    a.classList.remove('open');
  });
  document.querySelectorAll('.faq-arrow').forEach(function(a) {
    a.classList.remove('open');
  });
  
  if (!isOpen) {
    ans.classList.add('open');
    arrow.classList.add('open');
  }
}

// --- RESIZE DRAWER RESET ---
window.addEventListener('resize', function() {
  if (window.innerWidth > 700) {
    document.querySelector('.mobile-menu').classList.remove('open');
  }
});


/* ==================================================
   NEW FEATURES (PSYCHIATRIST CAROUSEL & MODAL LOGIC)
   ================================================== */

// --- PSYCHIATRIST CAROUSEL CONTROLLER ---
let currentSlideIndex = 0;
const totalSlides = 3;
let autoSlideInterval;

function updateCarousel() {
  const track = document.querySelector('.carousel-track');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  if (!track) return;
  
  // Slide offset translation
  track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
  
  // Update indicator active classes
  indicators.forEach((indicator, idx) => {
    if (idx === currentSlideIndex) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
}

function moveCarousel(direction) {
  currentSlideIndex = (currentSlideIndex + direction + totalSlides) % totalSlides;
  updateCarousel();
  resetAutoSlide();
}

function jumpToSlide(index) {
  currentSlideIndex = index;
  updateCarousel();
  resetAutoSlide();
}

// Auto-sliding mechanics
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
    updateCarousel();
  }, 4000);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

// Attach hover actions to pause carousel auto-sliding
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.carousel-container');
  if (container) {
    container.addEventListener('mouseenter', stopAutoSlide);
    container.addEventListener('mouseleave', startAutoSlide);
    
    // Support swipe events for mobile screens
    let startX = 0;
    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
      const diffX = startX - e.changedTouches[0].clientX;
      if (Math.abs(diffX) > 50) { // Swipe threshold
        if (diffX > 0) {
          moveCarousel(1); // Swipe Left -> Next
        } else {
          moveCarousel(-1); // Swipe Right -> Prev
        }
      }
    }, { passive: true });
  }
  
  startAutoSlide();
});


// --- BOOKING MODAL AND PAYMENT ROUTING ---
function openBookingModal(sessionType) {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock page scroll behind modal
  }
}

function closeBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Unlock page scroll
  }
}

function proceedToPayment() {
  closeBookingModal();
  
  // Scroll smoothly to the payment section
  goTo('payment');
  
  // Highlight the payment card with a golden glow after scroll animation completes
  setTimeout(() => {
    const paymentCard = document.querySelector('.payment-qr-card');
    if (paymentCard) {
      paymentCard.classList.add('highlight-glow');
      
      // Remove glow after 3 seconds
      setTimeout(() => {
        paymentCard.classList.remove('highlight-glow');
      }, 3000);
    }
  }, 800);
}

// Close modal when clicking backdrop area
window.addEventListener('click', (e) => {
  const modal = document.getElementById('booking-modal');
  if (e.target === modal) {
    closeBookingModal();
  }
});
