// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
const progressBar = document.createElement('div');
progressBar.id = 'scrollProgress';
progressBar.style.cssText = 'position:fixed;top:0;left:0;height:4px;background:linear-gradient(90deg,var(--olive),var(--gold));width:0%;z-index:9999;transition:width 0.1s ease;box-shadow:0 0 10px rgba(230,184,61,0.5)';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = scrolled + '%';
});

// ============================================================
// PROJECT FILTER SYSTEM
// ============================================================
const projectsGrid = document.querySelector('.projects-grid');
const filterContainer = document.createElement('div');
filterContainer.className = 'filter-container';
filterContainer.style.cssText = 'display:flex;gap:1rem;justify-content:center;margin-bottom:3rem;flex-wrap:wrap';

const filters = ['All', 'JavaScript', 'React', 'Three.js', 'Python', 'Flutter', 'PWA'];
filters.forEach(filter => {
    const btn = document.createElement('button');
    btn.textContent = filter;
    btn.className = 'filter-btn' + (filter === 'All' ? ' active' : '');
    btn.style.cssText = 'padding:0.6rem 1.2rem;border:2px solid var(--olive);background:transparent;color:var(--olive);cursor:pointer;font-family:"Space Mono",monospace;font-size:0.85rem;transition:all 0.3s ease';
    btn.onclick = () => filterProjects(filter, btn);
    filterContainer.appendChild(btn);
});

projectsGrid.parentElement.insertBefore(filterContainer, projectsGrid);

function filterProjects(filter, clickedBtn) {
    document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'transparent';
        b.style.color = 'var(--olive)';
    });
    clickedBtn.classList.add('active');
    clickedBtn.style.background = 'var(--olive)';
    clickedBtn.style.color = 'var(--bone)';

    document.querySelectorAll('.project-card').forEach(card => {
        const techs = Array.from(card.querySelectorAll('.tech-badge')).map(b => b.textContent);
        const match = filter === 'All' || techs.some(t => t.includes(filter));
        card.style.display = match ? 'flex' : 'none';
        if (match) {
            card.style.animation = 'fadeIn 0.5s ease';
        }
    });
}

// ============================================================
// LAZY LOADING IMAGES
// ============================================================
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
}, { rootMargin: '50px' });

document.querySelectorAll('.project-image, .profile-pic').forEach(img => {
    img.style.transition = 'opacity 0.5s ease';
    img.style.opacity = '0';
    imageObserver.observe(img);
});

// ============================================================
// DARK MODE TOGGLE
// ============================================================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// ============================================================
// CANVAS HERO BACKGROUND ANIMATION
// ============================================================
const canvas = document.getElementById('heroCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const shapes = [];
const shapeCount = 5;

class Shape {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 100 + 50;
        this.type = Math.floor(Math.random() * 3);
        this.rotation = Math.random() * Math.PI * 2;
        this.color = ['#6B7C3D', '#8FA04E', '#4A5729'][Math.floor(Math.random() * 3)];
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += 0.001;

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = 0.08;
        ctx.fillStyle = this.color;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        if (this.type === 0) {
            ctx.beginPath();
            ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.type === 1) {
            ctx.beginPath();
            ctx.moveTo(0, -this.size / 2);
            ctx.lineTo(this.size / 2, this.size / 2);
            ctx.lineTo(-this.size / 2, this.size / 2);
            ctx.closePath();
            ctx.fill();
        } else {
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-this.size / 2, 0);
            ctx.lineTo(this.size / 2, 0);
            ctx.stroke();
        }

        ctx.restore();
    }
}

for (let i = 0; i < shapeCount; i++) {
    shapes.push(new Shape());
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
        shape.update();
        shape.draw();
    });
    requestAnimationFrame(animateCanvas);
}
animateCanvas();

// ============================================================
// TYPEWRITER EFFECT
// ============================================================
const typewriterElement = document.getElementById('typewriter');
const typewriterTexts = [
    'Full-Stack Developer',
    '3D Web Experience Builder',
    'AI-Powered App Creator',
    'Shipping Real Products. Johannesburg. Globally Minded.'
];

let typewriterIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typewriter() {
    const currentText = typewriterTexts[typewriterIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
            setTimeout(typewriter, 500);
            return;
        }
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typewriter, 2000);
            return;
        }
    }
    
    setTimeout(typewriter, 40);
}
typewriter();

// ============================================================
// NAVIGATION SCROLL SPY & SHADOW
// ============================================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateNavOnScroll() {
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateNavOnScroll);

// ============================================================
// HAMBURGER MENU TOGGLE
// ============================================================
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksMenu.classList.remove('active');
    });
});

// ============================================================
// INTERSECTION OBSERVER FOR FADE-UP ANIMATIONS
// ============================================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section[id]:not(#introduction)').forEach(section => {
    observer.observe(section);
});

// ============================================================
// CONTACT FORM VALIDATION & SUBMISSION
// ============================================================
const contactForm = document.getElementById('contactForm');
const formInputs = contactForm.querySelectorAll('input, textarea');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;

    formInputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        
        if (!input.value.trim()) {
            input.classList.add('error');
            errorElement.classList.add('show');
            isValid = false;
        } else if (input.type === 'email' && !isValidEmail(input.value)) {
            input.classList.add('error');
            errorElement.textContent = 'Please enter a valid email';
            errorElement.classList.add('show');
            isValid = false;
        } else {
            input.classList.remove('error');
            errorElement.classList.remove('show');
        }
    });

    if (isValid) {
        const formData = {
            name: contactForm.querySelector('#name').value,
            email: contactForm.querySelector('#email').value,
            subject: contactForm.querySelector('#subject').value,
            message: contactForm.querySelector('#message').value
        };

        fetch('https://formspree.io/f/xbllbqql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                alert('✓ Thank you! Your message was sent to ibanathimadonsela3@gmail.com. I\'ll reply soon!');
                contactForm.reset();
            } else {
                alert('Message processed! I\'ll get back to you soon.');
                contactForm.reset();
            }
        })
        .catch(error => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

formInputs.forEach(input => {
    input.addEventListener('input', () => {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');
        input.classList.remove('error');
        errorElement.classList.remove('show');
    });
});

// ============================================================
// SMOOTH SCROLL FOR BUTTONS
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
