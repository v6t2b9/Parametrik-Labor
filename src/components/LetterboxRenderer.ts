/**
 * Letterbox Renderer - Reactive Border Visualization
 *
 * Renders interference patterns in letterbox/pillarbox bars based on agent wrap events.
 * Creates meditative, double-slit-experiment-inspired visualizations.
 */

import type { WrapEvent, LetterboxParams } from '../types/index';

interface LetterboxState {
  // Wave field for interference calculation
  waveField: Float32Array;
  width: number;
  height: number;
}

export class LetterboxRenderer {
  private topBarState: LetterboxState | null = null;
  private bottomBarState: LetterboxState | null = null;
  private leftBarState: LetterboxState | null = null;
  private rightBarState: LetterboxState | null = null;
  private frameCount: number = 0;

  /**
   * Render letterbox bars with interference patterns from wrap events
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

    this.frameCount = currentFrame;

    // Debug: Log wrap events (only occasionally to avoid spam)
    if (this.frameCount % 60 === 0 && wrapEvents.length > 0) {
      console.log(`[Letterbox] Frame ${this.frameCount}: ${wrapEvents.length} wrap events`);
    }

    // Determine letterbox configuration (horizontal or vertical bars)
    const hasHorizontalBars = gridHeight < canvasHeight;
    const hasVerticalBars = gridWidth < canvasWidth;

    // Debug: Log bar configuration
    if (this.frameCount % 120 === 0) {
      console.log(`[Letterbox] Canvas: ${canvasWidth}x${canvasHeight}, Grid: ${gridWidth}x${gridHeight}`);
      console.log(`[Letterbox] Horizontal bars: ${hasHorizontalBars}, Vertical bars: ${hasVerticalBars}`);
    }

    // Initialize state if needed
    if (hasHorizontalBars) {
      const barHeight = Math.floor((canvasHeight - gridHeight) / 2);
      if (!this.topBarState || this.topBarState.height !== barHeight) {
        console.log(`[Letterbox] Creating horizontal bars (height: ${barHeight})`);
        this.topBarState = this.createBarState(canvasWidth, barHeight);
        this.bottomBarState = this.createBarState(canvasWidth, barHeight);
      }
    }

    if (hasVerticalBars) {
      const barWidth = Math.floor((canvasWidth - gridWidth) / 2);
      if (!this.leftBarState || this.leftBarState.width !== barWidth) {
        console.log(`[Letterbox] Creating vertical bars (width: ${barWidth})`);
        this.leftBarState = this.createBarState(barWidth, canvasHeight);
        this.rightBarState = this.createBarState(barWidth, canvasHeight);
      }
    }

    // Filter events by edge and update wave fields
    if (hasHorizontalBars && this.topBarState && this.bottomBarState) {
      const topEvents = wrapEvents.filter(e => e.edge === 'top');
      const bottomEvents = wrapEvents.filter(e => e.edge === 'bottom');

      this.updateWaveField(this.topBarState, topEvents, params, gridWidth, 'horizontal', offsetX);
      this.updateWaveField(this.bottomBarState, bottomEvents, params, gridWidth, 'horizontal', offsetX);

      // Render horizontal bars
      this.renderHorizontalBar(ctx, this.topBarState, params, 0, 0, canvasWidth);
      this.renderHorizontalBar(
        ctx,
        this.bottomBarState,
        params,
        0,
        canvasHeight - this.bottomBarState.height,
        canvasWidth
      );
    }

    if (hasVerticalBars && this.leftBarState && this.rightBarState) {
      const leftEvents = wrapEvents.filter(e => e.edge === 'left');
      const rightEvents = wrapEvents.filter(e => e.edge === 'right');

      this.updateWaveField(this.leftBarState, leftEvents, params, gridHeight, 'vertical', offsetY);
      this.updateWaveField(this.rightBarState, rightEvents, params, gridHeight, 'vertical', offsetY);

      // Render vertical bars
      this.renderVerticalBar(ctx, this.leftBarState, params, 0, 0, canvasHeight);
      this.renderVerticalBar(
        ctx,
        this.rightBarState,
        params,
        canvasWidth - this.rightBarState.width,
        0,
        canvasHeight
      );
    }
  }

  /**
   * Create wave field state for a bar
   */
  private createBarState(width: number, height: number): LetterboxState {
    return {
      waveField: new Float32Array(width * height * 3), // RGB channels
      width,
      height,
    };
  }

  /**
   * Update wave field with new wrap events and propagation
   */
  private updateWaveField(
    state: LetterboxState,
    events: WrapEvent[],
    params: LetterboxParams,
    gridSize: number,
    orientation: 'horizontal' | 'vertical',
    offset: number
  ): void {
    const { waveField, width, height } = state;
    const size = width * height;

    // Debug: Log when processing events
    if (events.length > 0 && this.frameCount % 60 === 0) {
      console.log(`[Letterbox] updateWaveField: Processing ${events.length} events (orientation: ${orientation})`);
    }

    // 1. Decay existing waves
    for (let i = 0; i < size * 3; i++) {
      waveField[i] *= params.decayRate;
    }

    // 2. Add new wave sources from wrap events
    for (const event of events) {
      // Calculate position along the edge
      const edgePos = orientation === 'horizontal'
        ? event.x / gridSize  // 0-1 along x-axis
        : event.y / gridSize; // 0-1 along y-axis

      // Convert to pixel position
      const pixelPos = Math.floor(edgePos * (orientation === 'horizontal' ? width : height));

      // Calculate event age (for decay)
      const age = this.frameCount - event.timestamp;
      const ageDecay = Math.exp(-age * 0.05); // Exponential decay over time

      // Calculate amplitude from various sources
      let amplitude = ageDecay;

      if (params.useAgentColor) {
        amplitude *= params.agentColorWeight;
      }

      if (params.useTrailIntensity) {
        const trailSum = event.trailIntensity.red + event.trailIntensity.green + event.trailIntensity.blue;
        amplitude *= (1.0 + trailSum / 300.0 * params.trailIntensityWeight);
      }

      if (params.useForceVector) {
        amplitude *= (1.0 + event.speed * params.forceVectorWeight);
      }

      // Add wave source at edge position
      this.addWaveSource(
        state,
        pixelPos,
        0, // Start at edge
        event.r,
        event.g,
        event.b,
        amplitude,
        params,
        orientation
      );
    }

    // 3. Propagate waves into the bar (diffusion)
    if (this.frameCount % params.diffusionFreq === 0) {
      this.propagateWaves(state, params, orientation);
    }

    // 4. Calculate interference patterns
    if (params.interferenceEnabled && events.length > 1) {
      this.calculateInterference(state, events, params, gridSize, orientation, offset);
    }
  }

  /**
   * Add a wave source at a specific position
   */
  private addWaveSource(
    state: LetterboxState,
    posAlong: number, // Position along the edge
    posInto: number,  // Position into the bar
    r: number,
    g: number,
    b: number,
    amplitude: number,
    params: LetterboxParams,
    orientation: 'horizontal' | 'vertical'
  ): void {
    const { waveField, width, height } = state;

    // Calculate index
    const x = orientation === 'horizontal' ? posAlong : posInto;
    const y = orientation === 'horizontal' ? posInto : posAlong;

    if (x < 0 || x >= width || y < 0 || y >= height) return;

    const idx = (y * width + x) * 3;

    // Add color with amplitude
    const blendMode = params.blendMode;
    if (blendMode === 'additive') {
      waveField[idx + 0] = Math.min(255, waveField[idx + 0] + r * amplitude);
      waveField[idx + 1] = Math.min(255, waveField[idx + 1] + g * amplitude);
      waveField[idx + 2] = Math.min(255, waveField[idx + 2] + b * amplitude);
    } else if (blendMode === 'alpha') {
      const alpha = amplitude * 0.5;
      waveField[idx + 0] = waveField[idx + 0] * (1 - alpha) + r * alpha;
      waveField[idx + 1] = waveField[idx + 1] * (1 - alpha) + g * alpha;
      waveField[idx + 2] = waveField[idx + 2] * (1 - alpha) + b * alpha;
    } else if (blendMode === 'multiply') {
      waveField[idx + 0] *= r / 255 * amplitude;
      waveField[idx + 1] *= g / 255 * amplitude;
      waveField[idx + 2] *= b / 255 * amplitude;
    }
  }

  /**
   * Propagate waves into the bar (diffusion from edge)
   */
  private propagateWaves(
    state: LetterboxState,
    params: LetterboxParams,
    orientation: 'horizontal' | 'vertical'
  ): void {
    const { waveField, width, height } = state;
    const tempField = new Float32Array(waveField);

    const diffusionRate = params.diffusionRate;
    // Note: params.propagationSpeed could be used for directional wave velocity in future

    // Diffuse along the perpendicular axis (into the bar)
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 3;

        // Get neighbors
        const neighbors: number[][] = [];

        if (orientation === 'horizontal') {
          // Propagate downward into bar
          if (y > 0) neighbors.push(Array.from(tempField.slice((y - 1) * width * 3 + x * 3, (y - 1) * width * 3 + x * 3 + 3)));
          if (y < height - 1) neighbors.push(Array.from(tempField.slice((y + 1) * width * 3 + x * 3, (y + 1) * width * 3 + x * 3 + 3)));
          // Also diffuse horizontally
          if (x > 0) neighbors.push(Array.from(tempField.slice(y * width * 3 + (x - 1) * 3, y * width * 3 + (x - 1) * 3 + 3)));
          if (x < width - 1) neighbors.push(Array.from(tempField.slice(y * width * 3 + (x + 1) * 3, y * width * 3 + (x + 1) * 3 + 3)));
        } else {
          // Propagate rightward into bar
          if (x > 0) neighbors.push(Array.from(tempField.slice(y * width * 3 + (x - 1) * 3, y * width * 3 + (x - 1) * 3 + 3)));
          if (x < width - 1) neighbors.push(Array.from(tempField.slice(y * width * 3 + (x + 1) * 3, y * width * 3 + (x + 1) * 3 + 3)));
          // Also diffuse vertically
          if (y > 0) neighbors.push(Array.from(tempField.slice((y - 1) * width * 3 + x * 3, (y - 1) * width * 3 + x * 3 + 3)));
          if (y < height - 1) neighbors.push(Array.from(tempField.slice((y + 1) * width * 3 + x * 3, (y + 1) * width * 3 + x * 3 + 3)));
        }

        // Apply diffusion
        if (neighbors.length > 0) {
          for (let c = 0; c < 3; c++) {
            const neighborAvg = neighbors.reduce((sum, n) => sum + n[c], 0) / neighbors.length;
            waveField[idx + c] = tempField[idx + c] * (1 - diffusionRate) + neighborAvg * diffusionRate;
          }
        }
      }
    }
  }

  /**
   * Calculate interference patterns (constructive/destructive)
   */
  private calculateInterference(
    state: LetterboxState,
    events: WrapEvent[],
    params: LetterboxParams,
    gridSize: number,
    orientation: 'horizontal' | 'vertical',
    _offset: number
  ): void {
    if (!params.showInterferencePattern) return;

    const { waveField, width, height } = state;
    const waveLength = params.waveLength;
    const coherenceLength = params.coherenceLength;

    // Calculate interference at each pixel
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 3;

        // Calculate phase from each wave source
        let totalPhase = 0;
        let totalAmplitude = 0;

        for (const event of events) {
          const edgePos = orientation === 'horizontal' ? event.x / gridSize : event.y / gridSize;
          const pixelPosAlong = orientation === 'horizontal' ? x : y;
          const pixelPosInto = orientation === 'horizontal' ? y : x;

          // Distance from wave source
          const alongDist = Math.abs(pixelPosAlong - edgePos * (orientation === 'horizontal' ? width : height));
          const intoDist = pixelPosInto;
          const distance = Math.sqrt(alongDist * alongDist + intoDist * intoDist);

          // Calculate phase based on distance and wavelength
          const phase = (distance / waveLength) * Math.PI * 2;
          const amplitude = Math.exp(-distance / coherenceLength);

          totalPhase += phase;
          totalAmplitude += amplitude;
        }

        // Calculate interference factor
        const avgPhase = totalPhase / events.length;
        let interference = 1.0;

        if (params.interferenceType === 'constructive') {
          interference = (Math.cos(avgPhase) + 1) / 2; // 0-1
        } else if (params.interferenceType === 'destructive') {
          interference = (Math.sin(avgPhase) + 1) / 2; // 0-1
        } else { // 'both'
          interference = Math.abs(Math.cos(avgPhase)); // 0-1 with both peaks and valleys
        }

        // Apply interference to existing colors
        for (let c = 0; c < 3; c++) {
          waveField[idx + c] *= (1.0 + interference * totalAmplitude * 0.5);
        }
      }
    }
  }

  /**
   * Render horizontal bar
   */
  private renderHorizontalBar(
    ctx: CanvasRenderingContext2D,
    state: LetterboxState,
    params: LetterboxParams,
    x: number,
    y: number,
    canvasWidth: number
  ): void {
    const { waveField, width, height } = state;
    const imageData = ctx.createImageData(canvasWidth, height);
    const data = imageData.data;

    // Apply hue cycling if enabled
    const hueShift = params.hueCycling ? (this.frameCount * params.hueCyclingSpeed) % 360 : 0;

    for (let py = 0; py < height; py++) {
      for (let px = 0; px < canvasWidth; px++) {
        const srcX = Math.floor(px * width / canvasWidth);
        const srcIdx = (py * width + srcX) * 3;
        const dstIdx = (py * canvasWidth + px) * 4;

        let r = waveField[srcIdx + 0];
        let g = waveField[srcIdx + 1];
        let b = waveField[srcIdx + 2];

        // Apply brightness
        r *= params.brightness;
        g *= params.brightness;
        b *= params.brightness;

        // Apply hue shift if enabled
        if (hueShift > 0) {
          const [h, s, l] = rgbToHsl(r, g, b);
          [r, g, b] = hslToRgb((h + hueShift) % 360, s, l);
        }

        // Clamp values
        data[dstIdx + 0] = Math.min(255, Math.max(0, r));
        data[dstIdx + 1] = Math.min(255, Math.max(0, g));
        data[dstIdx + 2] = Math.min(255, Math.max(0, b));
        data[dstIdx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, x, y);

    // Apply blur if needed (using canvas filter)
    if (params.blur > 0) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvasWidth;
      tempCanvas.height = height;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.filter = `blur(${params.blur}px)`;
        tempCtx.drawImage(ctx.canvas, x, y, canvasWidth, height, 0, 0, canvasWidth, height);
        ctx.clearRect(x, y, canvasWidth, height);
        ctx.drawImage(tempCanvas, x, y);
      }
    }
  }

  /**
   * Render vertical bar
   */
  private renderVerticalBar(
    ctx: CanvasRenderingContext2D,
    state: LetterboxState,
    params: LetterboxParams,
    x: number,
    y: number,
    canvasHeight: number
  ): void {
    const { waveField, width, height } = state;
    const imageData = ctx.createImageData(width, canvasHeight);
    const data = imageData.data;

    // Apply hue cycling if enabled
    const hueShift = params.hueCycling ? (this.frameCount * params.hueCyclingSpeed) % 360 : 0;

    for (let py = 0; py < canvasHeight; py++) {
      for (let px = 0; px < width; px++) {
        const srcY = Math.floor(py * height / canvasHeight);
        const srcIdx = (srcY * width + px) * 3;
        const dstIdx = (py * width + px) * 4;

        let r = waveField[srcIdx + 0];
        let g = waveField[srcIdx + 1];
        let b = waveField[srcIdx + 2];

        // Apply brightness
        r *= params.brightness;
        g *= params.brightness;
        b *= params.brightness;

        // Apply hue shift if enabled
        if (hueShift > 0) {
          const [h, s, l] = rgbToHsl(r, g, b);
          [r, g, b] = hslToRgb((h + hueShift) % 360, s, l);
        }

        // Clamp values
        data[dstIdx + 0] = Math.min(255, Math.max(0, r));
        data[dstIdx + 1] = Math.min(255, Math.max(0, g));
        data[dstIdx + 2] = Math.min(255, Math.max(0, b));
        data[dstIdx + 3] = 255;
      }
    }

    ctx.putImageData(imageData, x, y);

    // Apply blur if needed
    if (params.blur > 0) {
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = canvasHeight;
      const tempCtx = tempCanvas.getContext('2d');
      if (tempCtx) {
        tempCtx.filter = `blur(${params.blur}px)`;
        tempCtx.drawImage(ctx.canvas, x, y, width, canvasHeight, 0, 0, width, canvasHeight);
        ctx.clearRect(x, y, width, canvasHeight);
        ctx.drawImage(tempCanvas, x, y);
      }
    }
  }

  /**
   * Reset all state (call when canvas size changes)
   */
  reset(): void {
    this.topBarState = null;
    this.bottomBarState = null;
    this.leftBarState = null;
    this.rightBarState = null;
  }
}

// Helper functions for HSL color manipulation
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return [h * 360, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}
