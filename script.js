// Skills Radar Chart
function drawSkillsRadar() {
    const canvas = document.getElementById('skillsRadar');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // High-DPI support
    const dpr = window.devicePixelRatio || 1;
    const size = Math.min(rect.width, rect.height);
    
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    
    ctx.scale(dpr, dpr);
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.35;
    
    // Skills data
    const skills = [
        { name: 'Cloud Platforms', value: 90 },
        { name: 'DevSecOps', value: 85 },
        { name: 'Containers', value: 88 },
        { name: 'IaC', value: 92 },
        { name: 'CI/CD', value: 87 },
        { name: 'Monitoring', value: 83 }
    ];
    
    const numSkills = skills.length;
    const angleStep = (Math.PI * 2) / numSkills;
    
    // Get theme colors
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f5f5f7' : '#1d1d1f';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)';
    const fillColor = isDark ? 'rgba(41, 151, 255, 0.3)' : 'rgba(0, 113, 227, 0.3)';
    const lineColor = '#0071e3';
    
    ctx.clearRect(0, 0, size, size);
    
    // Draw concentric circles (grid)
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i < numSkills; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    // Draw data polygon
    ctx.beginPath();
    skills.forEach((skill, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const value = (skill.value / 100) * radius;
        const x = centerX + value * Math.cos(angle);
        const y = centerY + value * Math.sin(angle);
        
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw points
    skills.forEach((skill, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const value = (skill.value / 100) * radius;
        const x = centerX + value * Math.cos(angle);
        const y = centerY + value * Math.sin(angle);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = lineColor;
        ctx.fill();
        ctx.strokeStyle = isDark ? '#000' : '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();
    });
    
    // Draw labels
    ctx.fillStyle = textColor;
    ctx.font = '12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'center';
    
    skills.forEach((skill, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelRadius = radius + 30;
        const x = centerX + labelRadius * Math.cos(angle);
        const y = centerY + labelRadius * Math.sin(angle);
        
        // Adjust text alignment based on position
        if (Math.abs(angle) < 0.1 || Math.abs(angle - Math.PI) < 0.1) {
            ctx.textAlign = angle < 0 ? 'left' : 'right';
        } else {
            ctx.textAlign = 'center';
        }
        
        ctx.fillText(skill.name, x, y + 4);
    });
}

// Initialize radar chart
window.addEventListener('load', () => {
    drawSkillsRadar();
});

// Redraw on theme change
const radarThemeToggle = document.getElementById('themeToggle');
if (radarThemeToggle) {
    radarThemeToggle.addEventListener('click', () => {
        setTimeout(drawSkillsRadar, 100);
    });
}

// Redraw on window resize
window.addEventListener('resize', () => {
    drawSkillsRadar();
});

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
    
    // Draw exponential graph from 0 to current visitor count
    drawVisitorGraph(visitorCount);
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

function drawVisitorGraph(targetCount) {
    const canvas = document.getElementById('visitorChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    
    // Set high-resolution canvas for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = rect.width - 60;
    const displayHeight = rect.height - 60;
    
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';
    
    // Scale context to match device pixel ratio
    ctx.scale(dpr, dpr);
    
    const width = displayWidth;
    const height = displayHeight;
    const padding = 40;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;
    
    // Enable anti-aliasing and smooth rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    // Get theme colors
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#f5f5f7' : '#1d1d1f';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    const lineColor = '#0071e3';
    const fillColor = isDark ? 'rgba(41, 151, 255, 0.2)' : 'rgba(0, 113, 227, 0.2)';
    
    ctx.clearRect(0, 0, width, height);
    
    // Generate exponential curve from 0 to targetCount
    const numPoints = 50;
    const maxCount = targetCount;
    
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
    
    // Generate exponential curve points
    const curvePoints = [];
    for (let i = 0; i < numPoints; i++) {
        const t = i / (numPoints - 1); // 0 to 1
        const x = padding + graphWidth * t;
        
        // Exponential growth: y = a * (e^(k*t) - 1) where k controls growth rate
        const k = 3; // Growth rate (higher = steeper curve)
        const normalizedValue = (Math.exp(k * t) - 1) / (Math.exp(k) - 1);
        const count = normalizedValue * maxCount;
        const y = padding + graphHeight - (count / maxCount) * graphHeight;
        
        curvePoints.push({ x, y, count });
    }
    
    // Draw filled area
    ctx.beginPath();
    ctx.moveTo(curvePoints[0].x, height - padding);
    
    curvePoints.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    
    ctx.lineTo(curvePoints[curvePoints.length - 1].x, height - padding);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
    
    // Draw smooth curve line
    ctx.beginPath();
    ctx.moveTo(curvePoints[0].x, curvePoints[0].y);
    
    curvePoints.forEach(point => {
        ctx.lineTo(point.x, point.y);
    });
    
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    // Draw end point circle
    const endPoint = curvePoints[curvePoints.length - 1];
    ctx.beginPath();
    ctx.arc(endPoint.x, endPoint.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();
    ctx.strokeStyle = isDark ? '#000' : '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Title
    ctx.fillStyle = textColor;
    ctx.font = 'bold 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.textAlign = 'left';
    ctx.fillText('Growth Trajectory', padding, 20);
}

// Initialize visitor stats on page load
window.addEventListener('load', initVisitorStats);

// Redraw graph on theme change
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        setTimeout(() => {
            const visitorCount = parseInt(localStorage.getItem('visitorCount') || '0');
            drawVisitorGraph(visitorCount);
        }, 100);
    });
}
