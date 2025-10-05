(() => {
  'use strict';

  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d', { alpha: true });

  const state = {
    particles: [],
    animationId: null,
    isRunning: false,
    emitUntil: 0,
    lastTs: 0,
    dpr: 1,
    width: 0,
    height: 0,
  };

  const COLORS = [
    '#E74C3C', '#F39C12', '#F1C40F', '#2ECC71', '#1ABC9C',
    '#3498DB', '#9B59B6', '#E91E63', '#FF6B6B'
  ];

  function resizeCanvasToViewport() {
    state.dpr = window.devicePixelRatio || 1;
    const cssWidth = window.innerWidth;
    const cssHeight = window.innerHeight;

    canvas.width = Math.round(cssWidth * state.dpr);
    canvas.height = Math.round(cssHeight * state.dpr);
    canvas.style.width = cssWidth + 'px';
    canvas.style.height = cssHeight + 'px';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(state.dpr, state.dpr);

    state.width = cssWidth;
    state.height = cssHeight;
  }

  window.addEventListener('resize', resizeCanvasToViewport);
  resizeCanvasToViewport();

  function getEmissionRate() {
    return Math.round(Math.min(220, Math.max(120, state.width / 10)));
  }

  function spawnParticles(count) {
    for (let i = 0; i < count; i += 1) {
      const x = Math.random() * state.width;
      const y = -10;
      const size = 4 + Math.random() * 6; // base width in CSS px
      const aspect = 0.4 + Math.random() * 0.8; // height vs width ratio
      const w = size;
      const h = size * aspect;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const vx = (Math.random() - 0.5) * 220; // px/s
      const vy = 20 + Math.random() * 120;    // px/s
      const rotation = Math.random() * Math.PI * 2;
      const angularVelocity = (Math.random() - 0.5) * 6; // rad/s
      const wobbleSeed = Math.random() * Math.PI * 2;

      state.particles.push({ x, y, w, h, color, vx, vy, rotation, angularVelocity, wobbleSeed });
    }
  }

  const GRAVITY = 1200;        // px/s^2
  const DRAG = 0.0012;         // fractional per second
  const WIND_AMPLITUDE = 30;   // px/s
  const WIND_FREQ = 0.6;       // Hz
  const TERMINAL_VY = 2000;    // px/s

  function updateAndDraw(dt, tSeconds) {
    ctx.clearRect(0, 0, state.width, state.height);

    const wind = Math.sin(tSeconds * WIND_FREQ * Math.PI * 2) * WIND_AMPLITUDE;

    for (let i = state.particles.length - 1; i >= 0; i -= 1) {
      const p = state.particles[i];

      p.vy = Math.min(p.vy + GRAVITY * dt, TERMINAL_VY);
      p.vx += wind * dt * 0.5;
      p.vx *= (1 - DRAG);

      p.x += p.vx * dt + Math.sin((p.y + p.wobbleSeed) * 0.02) * 20 * dt;
      p.y += p.vy * dt;
      p.rotation += p.angularVelocity * dt;

      if (p.y - 40 > state.height) {
        state.particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }
  }

  function frame(ts) {
    if (!state.lastTs) state.lastTs = ts;
    const dt = Math.min(0.033, (ts - state.lastTs) / 1000);
    state.lastTs = ts;

    if (ts < state.emitUntil) {
      const perSec = getEmissionRate();
      const toEmit = Math.max(1, Math.round(perSec * dt));
      spawnParticles(toEmit);
    }

    updateAndDraw(dt, ts / 1000);

    if (state.particles.length === 0 && ts >= state.emitUntil) {
      state.isRunning = false;
      state.lastTs = 0;
      if (state.animationId) cancelAnimationFrame(state.animationId);
      state.animationId = null;
      return;
    }

    state.animationId = requestAnimationFrame(frame);
  }

  function startConfetti(durationMs = 3000) {
    const now = performance.now();
    state.emitUntil = now + durationMs;

    if (!state.isRunning) {
      state.isRunning = true;
      state.lastTs = 0;
      state.animationId = requestAnimationFrame(frame);
    }
  }

  const btn = document.getElementById('confettiBtn');
  if (btn) {
    btn.addEventListener('click', () => startConfetti(3000));
  }

  window.startConfetti = startConfetti;
})();
