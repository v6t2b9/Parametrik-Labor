/**
 * Ecosystem Renderer
 * Renders crystals and ecosystem agents on a canvas
 */

import type { Crystal } from './Crystal.js';
import type { EcosystemAgent, PopulationStats } from '../types/ecosystem.js';
import { SPECIES_COLORS, CRYSTAL_COLORS } from '../types/ecosystem.js';

export interface EcosystemRenderOptions {
  scaleX: number;
  scaleY: number;
  showAgents: boolean;
  useTriangles: boolean; // Show agents as directional triangles
  showCrystals: boolean;
  showEnergyRings: boolean; // Show energy level rings around crystals
  agentSize: number;
  crystalGlow: boolean;
}

export class EcosystemRenderer {
  /**
   * Render crystals on canvas
   */
  static renderCrystals(
    ctx: CanvasRenderingContext2D,
    crystals: Crystal[],
    options: EcosystemRenderOptions
  ): void {
    if (!options.showCrystals) return;

    ctx.save();

    for (const crystal of crystals) {
      const visual = crystal.getVisualProperties();
      const x = crystal.x * options.scaleX;
      const y = crystal.y * options.scaleY;
      const size = visual.size * Math.min(options.scaleX, options.scaleY);

      // Get crystal color
      const color = CRYSTAL_COLORS[crystal.type];
      const colorStr = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${visual.alpha})`;

      // Draw glow if enabled
      if (options.crystalGlow && visual.glowIntensity > 0) {
        ctx.shadowBlur = visual.glowIntensity;
        ctx.shadowColor = colorStr;
      }

      // Draw crystal
      ctx.fillStyle = colorStr;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();

      // Draw energy ring if enabled
      if (options.showEnergyRings && crystal.energy > 0) {
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${crystal.energy * 0.5})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        const ringRadius = size + 3;
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (Math.PI * 2 * crystal.energy);
        ctx.arc(x, y, ringRadius, startAngle, endAngle);
        ctx.stroke();
      }

      // Reset shadow
      ctx.shadowBlur = 0;
    }

    ctx.restore();
  }

  /**
   * Render ecosystem agents with species colors
   */
  static renderAgents(
    ctx: CanvasRenderingContext2D,
    agents: EcosystemAgent[],
    options: EcosystemRenderOptions
  ): void {
    if (!options.showAgents) return;

    ctx.save();

    for (const agent of agents) {
      const x = agent.x * options.scaleX;
      const y = agent.y * options.scaleY;
      const color = SPECIES_COLORS[agent.species];
      const colorStr = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

      // Energy-based alpha (dim when low energy)
      const alpha = Math.max(0.3, agent.energy);
      ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;

      if (options.useTriangles) {
        // Draw as directional triangle
        this.drawTriangle(ctx, x, y, agent.angle, options.agentSize);
      } else {
        // Draw as circle
        ctx.beginPath();
        ctx.arc(x, y, options.agentSize, 0, Math.PI * 2);
        ctx.fill();

        // Add small directional indicator
        ctx.strokeStyle = colorStr;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        const dirX = x + Math.cos(agent.angle) * options.agentSize * 2;
        const dirY = y + Math.sin(agent.angle) * options.agentSize * 2;
        ctx.lineTo(dirX, dirY);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  /**
   * Draw a directional triangle
   */
  private static drawTriangle(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    angle: number,
    size: number
  ): void {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);

    ctx.beginPath();
    ctx.moveTo(size * 2, 0);
    ctx.lineTo(-size, -size);
    ctx.lineTo(-size, size);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  /**
   * Render agent energy trails (optional enhancement)
   */
  static renderEnergyTrails(
    ctx: CanvasRenderingContext2D,
    agents: EcosystemAgent[],
    options: EcosystemRenderOptions,
    trailHistory: Map<EcosystemAgent, Array<{ x: number; y: number; energy: number }>>
  ): void {
    ctx.save();

    for (const agent of agents) {
      const trail = trailHistory.get(agent);
      if (!trail || trail.length < 2) continue;

      const color = SPECIES_COLORS[agent.species];

      // Draw trail as gradient line
      for (let i = 1; i < trail.length; i++) {
        const prev = trail[i - 1];
        const curr = trail[i];

        const alpha = (i / trail.length) * prev.energy * 0.5;
        ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(prev.x * options.scaleX, prev.y * options.scaleY);
        ctx.lineTo(curr.x * options.scaleX, curr.y * options.scaleY);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  /**
   * Render HUD overlay with species info
   */
  static renderHUD(
    ctx: CanvasRenderingContext2D,
    populationStats: PopulationStats,
    crystalCount: number,
    totalEnergy: number
  ): void {
    ctx.save();

    // Semi-transparent background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(10, 10, 250, 180);

    // Title
    ctx.fillStyle = '#4fc3f7';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('Ecosystem Stats', 20, 30);

    // Stats
    ctx.fillStyle = '#e0e0e0';
    ctx.font = '12px monospace';
    let y = 55;

    const stats = [
      `Total Pop: ${populationStats.total}`,
      `Builders: ${populationStats.builder}`,
      `Harvesters: ${populationStats.harvester}`,
      `Consumers: ${populationStats.consumer}`,
      `Decomposers: ${populationStats.decomposer}`,
      `Scouts: ${populationStats.scout}`,
      `Crystals: ${crystalCount}`,
      `Energy: ${totalEnergy.toFixed(1)}`,
    ];

    for (const stat of stats) {
      ctx.fillText(stat, 20, y);
      y += 18;
    }

    ctx.restore();
  }

  /**
   * Get default render options
   */
  static getDefaultOptions(): EcosystemRenderOptions {
    return {
      scaleX: 2.0,
      scaleY: 2.0,
      showAgents: true,
      useTriangles: true,
      showCrystals: true,
      showEnergyRings: true,
      agentSize: 3,
      crystalGlow: true,
    };
  }
}
