// Page Loader - Ultra Fast
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.page-loader').classList.add('hidden');
});

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu
function toggleMobileMenu() {
    document.querySelector('.mobile-menu-btn').classList.toggle('active');
    document.getElementById('mobileNav').classList.toggle('active');
    document.body.style.overflow = document.getElementById('mobileNav').classList.contains('active') ? 'hidden' : '';
}

function closeMobileMenu() {
    document.querySelector('.mobile-menu-btn').classList.remove('active');
    document.getElementById('mobileNav').classList.remove('active');
    document.body.style.overflow = '';
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll, .section-title').forEach(el => {
    observer.observe(el);
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const parent = item.parentElement;
        const isActive = parent.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked one if it wasn't active
        if (!isActive) {
            parent.classList.add('active');
        }
    });
});

// Modal Functions
let selectedPackageName = '';
let selectedPackagePrice = '';

function openModal(packageName, packagePrice) {
    selectedPackageName = packageName;
    selectedPackagePrice = packagePrice;
    document.getElementById('selectedPackage').textContent = `${packageName} - ${packagePrice}`;
    document.getElementById('subscribeModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('subscribeModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('subscribeModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('subscribeModal')) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeMobileMenu();
    }
});

// Form Submit - Send to WhatsApp
document.getElementById('subscribeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('userName').value;
    const age = document.getElementById('userAge').value;
    const phone = document.getElementById('userPhone').value;
    const goal = document.getElementById('userGoal').value;
    
    // Create WhatsApp message
    const message = `🏋️ *طلب اشتراك جديد*

📦 *الباقة:* ${selectedPackageName} (${selectedPackagePrice})

👤 *الاسم:* ${name}
📅 *العمر:* ${age} سنة
📱 *الهاتف:* ${phone}
🎯 *الهدف:* ${goal}

---
مرسل من موقع Dr. Abdallah`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number (Egypt format)
    const whatsappNumber = '201146165846';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Show toast notification
    showToast('جاري تحويلك لواتساب...');
    
    // Close modal
    closeModal();
    
    // Reset form
    document.getElementById('subscribeForm').reset();
    
    // Open WhatsApp after a short delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 500);
});

// Toast Notification
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            width: 100px;
            height: 100px;
            left: ${x - 50}px;
            top: ${y - 50}px;
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-content');
    const scrolled = window.scrollY;
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Slideshow for transformations with multiple images
const slideshowObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const slideshow = entry.target;
        if (entry.isIntersecting) {
            // Start slideshow when visible
            if (!slideshow.dataset.intervalId) {
                const intervalId = setInterval(() => {
                    nextSlide(slideshow);
                }, 2500); // تبديل كل 2.5 ثانية
                slideshow.dataset.intervalId = intervalId;
            }
        } else {
            // Stop slideshow when not visible
            if (slideshow.dataset.intervalId) {
                clearInterval(slideshow.dataset.intervalId);
                delete slideshow.dataset.intervalId;
            }
        }
    });
}, { threshold: 0.3 });

function nextSlide(container) {
    const slides = container.querySelectorAll('.trans-slide');
    const indicators = container.querySelectorAll('.indicator');
    let currentIndex = 0;
    
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Remove active from current
    slides[currentIndex].classList.remove('active');
    indicators[currentIndex].classList.remove('active');
    
    // Add active to next
    const nextIndex = (currentIndex + 1) % slides.length;
    slides[nextIndex].classList.add('active');
    indicators[nextIndex].classList.add('active');
}

// Initialize slideshows
document.querySelectorAll('.trans-slideshow').forEach(slideshow => {
    slideshowObserver.observe(slideshow);
});

// Counter animation for stats (if added later)
function animateCounter(el, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start);
        }
    }, 16);
}
