/* ===================================================
   ESWAR KETHAVARAPU — PORTFOLIO SCRIPT v2.0
   Particle Canvas · Custom Cursor · 3D Cards ·
   Typing Effect · Scroll Animations
   =================================================== */

/* ── PARTICLE CANVAS ──────────────────────────────── */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

let W, H, particles = [];

const PARTICLE_COUNT = 90;
const COLORS = ['#00f7ff','#ff5cff','#6cff77','#ffd700','#ff7043','#ab47bc'];

function resizeCanvas() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x  = Math.random() * W;
    this.y  = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.r  = Math.random() * 1.8 + 0.4;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = Math.random() * 0.6 + 0.2;
    this.life = 1;
    this.decay = Math.random() * 0.001 + 0.0005;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    if (this.life <= 0 || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha * this.life;
    ctx.shadowBlur  = 10;
    ctx.shadowColor = this.color;
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

// Draw connection lines between nearby particles
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.save();
        ctx.globalAlpha = (1 - dist/100) * 0.12;
        ctx.strokeStyle = particles[i].color;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, W, H);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();


/* ── CUSTOM CURSOR (dot only) ─────────────────────────── */
const dot = document.getElementById('cursor-dot');

const cursorColors = [
  { dot: '#00f7ff', glow: 'rgba(0,247,255,0.7)' },
  { dot: '#ff5cff', glow: 'rgba(255,92,255,0.7)'  },
  { dot: '#6cff77', glow: 'rgba(108,255,119,0.7)' },
  { dot: '#ffd700', glow: 'rgba(255,215,0,0.7)'   },
  { dot: '#ff7043', glow: 'rgba(255,112,67,0.7)'  },
];
let colorIdx = 0;
let colorTimer = 0;
let mouseX = -200, mouseY = -200;
let isMoving = false, moveTimeout;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  isMoving = true;
  clearTimeout(moveTimeout);
  moveTimeout = setTimeout(() => { isMoving = false; }, 120);
});

function animateCursor() {
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';

  if (isMoving) {
    colorTimer++;
    if (colorTimer % 6 === 0) {
      colorIdx = (colorIdx + 1) % cursorColors.length;
    }
    const c = cursorColors[colorIdx];
    dot.style.background = c.dot;
    dot.style.boxShadow  = `0 0 16px ${c.glow}, 0 0 32px ${c.glow}`;
  }
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover grow
document.querySelectorAll('a, button, .project-btn, .skill-card, .timeline-card, .contact-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(1.6)';
  });
  el.addEventListener('mouseleave', () => {
    dot.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// Click pulse
document.addEventListener('mousedown', () => {
  dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
});
document.addEventListener('mouseup', () => {
  dot.style.transform = 'translate(-50%, -50%) scale(1)';
});


const nameEl = document.getElementById('typing-name');
const roleEl = document.getElementById('typing-role');
const NAME   = 'Eswar Kethavarapu';
const ROLE   = 'AI-ML Engineer  |  Python Full Stack Dev  |  Problem Solver';

let ni = 0, ri = 0;

function typeName() {
  if (ni < NAME.length) {
    nameEl.textContent += NAME[ni++];
    setTimeout(typeName, 90);
  } else {
    setTimeout(typeRole, 300);
  }
}
function typeRole() {
  if (ri < ROLE.length) {
    roleEl.textContent += ROLE[ri++];
    setTimeout(typeRole, 45);
  }
}
typeName();


const navLinks = document.querySelectorAll('.nav-link');
const pages    = document.querySelectorAll('.page');

function switchSection(target) {
  pages.forEach(p => p.classList.remove('active'));
  navLinks.forEach(l => l.classList.remove('active'));
  document.getElementById(target).classList.add('active');
  document.querySelector(`[data-section="${target}"]`)?.classList.add('active');

  // Trigger section-specific animations
  if (target === 'skills')    animateSkills();
  if (target === 'education') animateTimeline();
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.section;
    switchSection(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


/* ── SKILLS ANIMATION ─────────────────────────────── */
function animateSkills() {
  const cards = document.querySelectorAll('.skill-card');
  cards.forEach((card, i) => {
    const color = card.dataset.color || '#00f7ff';
    card.style.setProperty('--skill-color', color);

    setTimeout(() => {
      card.classList.add('visible');
      const fill = card.querySelector('.skill-fill');
      if (fill) {
        fill.style.background = `linear-gradient(90deg, ${color}, rgba(255,255,255,0.6))`;
        fill.style.boxShadow  = `0 0 10px ${color}`;
        setTimeout(() => {
          fill.style.width = fill.dataset.width || '80%';
        }, 80);
      }
    }, i * 120);
  });
}


/* ── EDUCATION TIMELINE ───────────────────────────── */
function animateTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  items.forEach((item, i) => {
    const delay = parseInt(item.dataset.delay) || i * 200;
    setTimeout(() => item.classList.add('visible'), delay);
  });
}


/* ── 3D PROJECT CARD TILT ─────────────────────────── */
document.querySelectorAll('.project-card[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const cx = r.left + r.width  / 2;
    const cy = r.top  + r.height / 2;
    const dx = (e.clientX - cx) / (r.width  / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
    card.style.transform =
      `translateY(-10px) rotateX(${-dy * 8}deg) rotateY(${dx * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


/* ── SCROLL-TRIGGERED REVEAL (for visible sections) ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.timeline-item, .skill-card').forEach(el => observer.observe(el));


/* ── INIT: show about section animations on load ───── */
window.addEventListener('load', () => {
  // Animate skills if already on skills page (not needed usually)
  const firstActive = document.querySelector('.page.active');
  if (firstActive && firstActive.id === 'skills') animateSkills();
  if (firstActive && firstActive.id === 'education') animateTimeline();
});
