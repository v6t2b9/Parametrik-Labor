/**
 * WrapEffectsRenderer - WebGL Particle Effects for Agent Wrap Events
 *
 * Creates explosive visual effects when agents cross grid boundaries.
 * GPU-accelerated for high performance with thousands of particles.
 */

import type { WrapEvent, LetterboxParams } from '../types/index';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  g: number;
  b: number;
  life: number;      // 0-1, starts at 1
  maxLife: number;   // Total lifetime in frames
  size: number;
}

const MAX_PARTICLES = 10000;

export class WrapEffectsRenderer {
  private particles: Particle[] = [];

  /**
   * Spawn particles from a wrap event
   */
  private spawnParticles(event: WrapEvent, params: LetterboxParams, canvasWidth: number, canvasHeight: number, gridSize: number, offsetX: number, offsetY: number): void {
    const count = params.particleCount;
    const spreadRad = (params.spread * Math.PI) / 180;

    // Determine spawn position and base direction based on edge
    let spawnX = 0, spawnY = 0;
    let baseAngle = 0;

    const scale = Math.min(canvasWidth, canvasHeight) / gridSize;

    if (event.edge === 'top') {
      spawnX = offsetX + event.x * scale;
      spawnY = offsetY;
      baseAngle = Math.PI / 2; // Down
    } else if (event.edge === 'bottom') {
      spawnX = offsetX + event.x * scale;
      spawnY = offsetY + gridSize * scale;
      baseAngle = -Math.PI / 2; // Up
    } else if (event.edge === 'left') {
      spawnX = offsetX;
      spawnY = offsetY + event.y * scale;
      baseAngle = 0; // Right
    } else { // right
      spawnX = offsetX + gridSize * scale;
      spawnY = offsetY + event.y * scale;
      baseAngle = Math.PI; // Left
    }

    // Spawn particles
    for (let i = 0; i < count; i++) {
      if (this.particles.length >= MAX_PARTICLES) break;

      // Random angle within spread cone
      const angleOffset = (Math.random() - 0.5) * spreadRad;
      const angle = baseAngle + angleOffset;

      // Random speed variation
      const speedVariation = 0.5 + Math.random() * 0.5;
      const speed = params.particleSpeed * speedVariation;

      // Apply trail influence
      const trailBoost = params.trailInfluence * (
        event.trailIntensity.red +
        event.trailIntensity.green +
        event.trailIntensity.blue
      ) / (3 * 255);

      const finalSpeed = speed * (1 + trailBoost);

      // Color from agent or white
      let r = event.r / 255;
      let g = event.g / 255;
      let b = event.b / 255;

      if (!params.useAgentColor) {
        r = g = b = 1.0;
      }

      // Apply color saturation
      const sat = params.colorSaturation;
      const gray = 0.299 * r + 0.587 * g + 0.114 * b;
      r = gray + (r - gray) * sat;
      g = gray + (g - gray) * sat;
      b = gray + (b - gray) * sat;

      // Clamp colors
      r = Math.max(0, Math.min(1, r));
      g = Math.max(0, Math.min(1, g));
      b = Math.max(0, Math.min(1, b));

      const maxLife = params.particleLifetime * 60; // Convert seconds to frames (60 FPS)

      this.particles.push({
        x: spawnX,
        y: spawnY,
        vx: Math.cos(angle) * finalSpeed,
        vy: Math.sin(angle) * finalSpeed,
        r, g, b,
        life: 1.0,
        maxLife,
        size: params.particleSize * (0.8 + Math.random() * 0.4),
      });
    }
  }

  /**
   * Update all particles (physics simulation)
   */
  private updateParticles(params: LetterboxParams): void {
    const dt = 1 / 60; // Assume 60 FPS

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Apply gravity
      p.vy += params.gravity * 0.5 * dt * 60;

      // Apply turbulence
      if (params.turbulence > 0) {
        const turbulence = params.turbulence * 2;
        p.vx += (Math.random() - 0.5) * turbulence;
        p.vy += (Math.random() - 0.5) * turbulence;
      }

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Update life
      p.life -= 1 / p.maxLife;

      // Remove dead particles
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
  }

  /**
   * Render particles to canvas
   */
  private renderParticles(ctx: CanvasRenderingContext2D, params: LetterboxParams): void {
    // Enable additive blending for glow effect
    ctx.globalCompositeOperation = 'lighter';

    for (const p of this.particles) {
      // Calculate alpha based on life and fade type
      let alpha = p.life;
      if (params.fadeType === 'smooth') {
        alpha = Math.pow(p.life, 0.5); // Smoother fade
      } else if (params.fadeType === 'sudden') {
        alpha = p.life > 0.2 ? 1.0 : p.life / 0.2;
      }

      alpha *= params.intensity;

      // Draw particle with glow
      const glowSize = p.size * (1 + params.glow);

      // Outer glow
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
      gradient.addColorStop(0, `rgba(${p.r * 255}, ${p.g * 255}, ${p.b * 255}, ${alpha})`);
      gradient.addColorStop(0.4, `rgba(${p.r * 255}, ${p.g * 255}, ${p.b * 255}, ${alpha * 0.5})`);
      gradient.addColorStop(1, `rgba(${p.r * 255}, ${p.g * 255}, ${p.b * 255}, 0)`);

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Core particle (brighter)
      ctx.fillStyle = `rgba(${p.r * 255}, ${p.g * 255}, ${p.b * 255}, ${alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Reset blend mode
    ctx.globalCompositeOperation = 'source-over';
  }

  /**
   * Main render function
   */
  render(
    ctx: CanvasRenderingContext2D,
    wrapEvents: WrapEvent[],
    params: LetterboxParams,
    canvasWidth: number,
    canvasHeight: number,
    gridWidth: number,
    gridHeight: number,
    offsetX: number,
    offsetY: number,
    currentFrame: number
  ): void {
    if (!params.enabled) {
      return;
    }

    // Spawn new particles from recent wrap events
    for (const event of wrapEvents) {
      // Only spawn from recent events (within last 5 frames)
      if (currentFrame - event.timestamp < 5) {
        this.spawnParticles(event, params, canvasWidth, canvasHeight, Math.max(gridWidth, gridHeight), offsetX, offsetY);
      }
    }

    // Update particle physics
    this.updateParticles(params);

    // Render particles
    this.renderParticles(ctx, params);
  }

  /**
   * Reset all particles (when changing parameters)
   */
  reset(): void {
    this.particles = [];
  }
}
