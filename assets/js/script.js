// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = navToggle.querySelectorAll('span');
    spans.forEach(span => span.classList.toggle('active'));
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        // Also reset hamburger menu animation
        const spans = navToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.remove('active'));
    });
});

// Floating Chat Functionality
const chatToggle = document.getElementById('chatToggle');
const chatOptions = document.getElementById('chatOptions');
const chatClose = document.getElementById('chatClose');

chatToggle.addEventListener('click', () => {
    chatOptions.classList.toggle('active');
});

chatClose.addEventListener('click', () => {
    chatOptions.classList.remove('active');
});

// Close chat when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.floating-chat')) {
        chatOptions.classList.remove('active');
    }
});

// Get Directions Function
function getDirections() {
    // Mayura Motors coordinates
    const destinationLat = 13.1185;
    const destinationLng = 80.0271;
    const destinationName = "Mayura Motors Thiruninravur";
    
    // Check if browser supports geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // User's current location
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // Create Google Maps directions URL
                const directionsUrl = `https://www.google.com/maps/dir/${userLat},${userLng}/${destinationLat},${destinationLng}/@${destinationLat},${destinationLng},15z/data=!4m2!4m1!3e0`;
                
                // Open directions in new tab
                window.open(directionsUrl, '_blank');
            },
            (error) => {
                // If user denies location or error occurs, open with just destination
                const fallbackUrl = `https://www.google.com/maps/dir//${destinationLat},${destinationLng}/@${destinationLat},${destinationLng},15z`;
                window.open(fallbackUrl, '_blank');
            }
        );
    } else {
        // Browser doesn't support geolocation
        const fallbackUrl = `https://www.google.com/maps/dir//${destinationLat},${destinationLng}/@${destinationLat},${destinationLng},15z`;
        window.open(fallbackUrl, '_blank');
    }
}

// Make the function globally available
window.getDirections = getDirections;

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Product Filter
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const category = btn.getAttribute('data-category');
        
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Form Submission
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would normally send the email to a server
        console.log('Newsletter subscription:', email);
        
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeIn 1s ease forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.feature-card, .product-card, .service-card').forEach(el => {
    observer.observe(el);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Vehicle Showcase Carousel
let currentVehicle = 0;
const vehicleCards = document.querySelectorAll('.vehicle-card');
const navDots = document.querySelectorAll('.nav-dot');

function showVehicle(index) {
    // Remove active class from all cards and dots
    vehicleCards.forEach(card => card.classList.remove('active'));
    navDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current card and dot
    if (vehicleCards[index] && navDots[index]) {
        vehicleCards[index].classList.add('active');
        navDots[index].classList.add('active');
    }
    
    currentVehicle = index;
}

// Auto-rotate vehicles every 4 seconds
function autoRotateVehicles() {
    currentVehicle = (currentVehicle + 1) % vehicleCards.length;
    showVehicle(currentVehicle);
}

// Initialize vehicle showcase
if (vehicleCards.length > 0) {
    showVehicle(0);
    
    // Set up auto-rotation
    const autoRotate = setInterval(autoRotateVehicles, 4000);
    
    // Add click handlers to navigation dots
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoRotate);
            showVehicle(index);
            // Restart auto-rotation after 8 seconds
            setTimeout(() => {
                setInterval(autoRotateVehicles, 4000);
            }, 8000);
        });
    });
    
    // Pause auto-rotation on hover
    const vehicleShowcase = document.querySelector('.vehicle-showcase');
    if (vehicleShowcase) {
        vehicleShowcase.addEventListener('mouseenter', () => {
            clearInterval(autoRotate);
        });
        
        vehicleShowcase.addEventListener('mouseleave', () => {
            setInterval(autoRotateVehicles, 4000);
        });
    }
}

// Scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 999;
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to scroll button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 5px 15px rgba(227, 30, 36, 0.3)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = 'none';
});

// Initialize
console.log('Mayura TVS website loaded successfully!');