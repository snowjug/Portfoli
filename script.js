// Confetti celebration for Portfolio logo
const portfolioLogo = document.querySelector('.nav-logo');
if (portfolioLogo) {
    portfolioLogo.style.cursor = 'pointer';
    portfolioLogo.addEventListener('click', function() {
        // Trigger confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.1 },
            colors: ['#0071e3', '#00d4ff', '#ff3b30', '#ffcc00', '#34c759']
        });
        
        // Scroll to home smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add hover effect for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - scrolled / 700;
    }
});

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Smooth Reveal Animation for Name
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = 'Atharv Shukla';
        typingText.textContent = text;
        typingText.style.opacity = '0';
        
        setTimeout(() => {
            typingText.style.opacity = '1';
            typingText.style.transform = 'translateX(0)';
        }, 800);
    }

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-item, .project-card, .contact-card, .about-text, .cert-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // Dark Mode Toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const navbar = document.querySelector('.navbar');
    
    // Check for saved theme preference or default to 'light' mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Update navbar background based on theme and scroll
    function updateNavbarBackground() {
        const isDark = htmlElement.getAttribute('data-theme') === 'dark';
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll <= 0) {
                navbar.style.background = isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
            } else {
                navbar.style.background = isDark ? 'rgba(0, 0, 0, 0.95)' : 'rgba(255, 255, 255, 0.95)';
            }
        }
    }
    
    // Toggle theme
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateNavbarBackground();
        });
    }
    
    // Initialize navbar background
    updateNavbarBackground();
    
    // Update navbar on scroll
    window.addEventListener('scroll', updateNavbarBackground);

    // Active Section Indicator
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function setActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Set active link on scroll
    window.addEventListener('scroll', setActiveLink);
    
    // Set active link on page load
    setActiveLink();
});

// Visitor Counter and Graph
function initVisitorStats() {
    // Get or initialize visitor count from localStorage
    let visitorCount = localStorage.getItem('visitorCount');
    let visitHistory = JSON.parse(localStorage.getItem('visitHistory') || '[]');
    
    if (!visitorCount) {
        visitorCount = Math.floor(Math.random() * 500) + 100; // Start with random count
    } else {
        visitorCount = parseInt(visitorCount) + 1;
    }
    
    // Save updated count
    localStorage.setItem('visitorCount', visitorCount);
    
    // Update visitor count display
    const countElement = document.getElementById('visitorCount');
    if (countElement) {
        animateCount(countElement, visitorCount);
    }
    
    // Update visit history
    const today = new Date().toLocaleDateString();
    const todayVisit = visitHistory.find(v => v.date === today);
    
    if (todayVisit) {
        todayVisit.count++;
    } else {
        visitHistory.push({ date: today, count: 1 });
    }
    
    // Keep only last 7 days
    if (visitHistory.length > 7) {
        visitHistory = visitHistory.slice(-7);
    }
    
    localStorage.setItem('visitHistory', JSON.stringify(visitHistory));
    
    // Draw graph
    drawVisitorGraph(visitHistory);
}

function animateCount(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 20);
}

function drawVisitorGraph(history) {
    const canvas = document.getElementById('visitorChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    
    // Set canvas size
    canvas.width = rect.width - 60;
    canvas.height = rect.height - 60;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    
    // Get theme colors
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f5f5f7' : '#1d1d1f';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const lineColor = '#0071e3';
    const fillColor = isDark ? 'rgba(41, 151, 255, 0.2)' : 'rgba(0, 113, 227, 0.2)';
    
    ctx.clearRect(0, 0, width, height);
    
    if (history.length === 0) {
        ctx.fillStyle = textColor;
        ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
        ctx.textAlign = 'center';
        ctx.fillText('No data yet', width / 2, height / 2);
        return;
    }
    
    // Find max value for scaling
    const maxCount = Math.max(...history.map(h => h.count), 5);
    
    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
        const y = padding + (graphHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        const value = Math.round(maxCount - (maxCount / 5) * i);
        ctx.fillStyle = textColor;
        ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
        ctx.textAlign = 'right';
        ctx.fillText(value.toString(), padding - 10, y + 4);
    }
    
    // Calculate points
    const points = history.map((item, index) => {
        const x = padding + (graphWidth / (history.length - 1 || 1)) * index;
        const y = padding + graphHeight - (item.count / maxCount) * graphHeight;
        return { x, y, date: item.date, count: item.count };
    });
    
    // Draw filled area
    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding);
    
    points.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    
    ctx.lineTo(points[points.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    
    points.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Draw points and labels
    points.forEach((point, index) => {
        // Point circle
        ctx.beginPath();
        ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = lineColor;
        ctx.fill();
        
        // Date label
        const dateLabel = point.date.split('/').slice(0, 2).join('/');
        ctx.fillStyle = textColor;
        ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
        ctx.textAlign = 'center';
        ctx.save();
        ctx.translate(point.x, height - padding + 20);
        ctx.rotate(-Math.PI / 6);
        ctx.fillText(dateLabel, 0, 0);
        ctx.restore();
    });
    
    // Title
    ctx.fillStyle = textColor;
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'left';
    ctx.fillText('Visits (Last 7 Days)', padding, 20);
}

// Initialize visitor stats on page load
window.addEventListener('load', initVisitorStats);

// Redraw graph on theme change
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        setTimeout(() => {
            const visitHistory = JSON.parse(localStorage.getItem('visitHistory') || '[]');
            drawVisitorGraph(visitHistory);
        }, 100);
    });
}
