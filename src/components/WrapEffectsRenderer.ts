/**
 * WrapEffectsRenderer - WebGL Reactive Letterbox Bars
 *
 * Creates organic, flowing effects in letterbox bars when agents wrap around edges.
 * Uses WebGL fragment shaders for GPU-accelerated visual effects.
 */

import type { WrapEvent, LetterboxParams } from '../types/index';

interface BarTexture {
  canvas: HTMLCanvasElement;
  gl: WebGLRenderingContext;
  program: WebGLProgram;
  texture: WebGLTexture;
  frameBuffer: WebGLFramebuffer;
  width: number;
  height: number;
  heatMap: Float32Array; // Heat/intensity values at each position
}

export class WrapEffectsRenderer {
  private topBar: BarTexture | null = null;
  private bottomBar: BarTexture | null = null;
  private leftBar: BarTexture | null = null;
  private rightBar: BarTexture | null = null;

  /**
   * Vertex shader (simple passthrough for fullscreen quad)
   */
  private readonly vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;

    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  /**
   * Fragment shader - Organic lava/nebula effect
   */
  private readonly fragmentShaderSource = `
    precision mediump float;

    varying vec2 v_uv;
    uniform sampler2D u_heatTexture;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform float u_intensity;
    uniform float u_glow;
    uniform float u_turbulence;

    // Simplex noise for organic movement
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = v_uv;

      // Sample heat from texture
      float heat = texture2D(u_heatTexture, uv).r;

      // Add organic movement with noise
      float noise1 = snoise(uv * 3.0 + u_time * 0.1 * u_turbulence);
      float noise2 = snoise(uv * 5.0 - u_time * 0.15 * u_turbulence);

      // Distort UV for liquid effect
      vec2 distortedUV = uv + vec2(noise1, noise2) * 0.02 * u_turbulence * heat;
      float distortedHeat = texture2D(u_heatTexture, distortedUV).r;

      // Combine heat with noise for organic look
      float finalHeat = mix(heat, distortedHeat, 0.5) + noise1 * 0.1;

      // Color gradient based on heat (lava-like)
      vec3 color = vec3(0.0);
      float alpha = 0.0;

      if (finalHeat > 0.01) {
        // Hot colors: dark red -> orange -> yellow -> white
        float t = clamp(finalHeat * u_intensity, 0.0, 1.0);

        if (t < 0.3) {
          // Dark red to red
          color = mix(vec3(0.3, 0.0, 0.0), vec3(1.0, 0.0, 0.0), t / 0.3);
        } else if (t < 0.6) {
          // Red to orange
          color = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 0.5, 0.0), (t - 0.3) / 0.3);
        } else if (t < 0.9) {
          // Orange to yellow
          color = mix(vec3(1.0, 0.5, 0.0), vec3(1.0, 1.0, 0.3), (t - 0.6) / 0.3);
        } else {
          // Yellow to white (hottest)
          color = mix(vec3(1.0, 1.0, 0.3), vec3(1.0, 1.0, 1.0), (t - 0.9) / 0.1);
        }

        // Add glow
        color *= (1.0 + u_glow * finalHeat);
        alpha = clamp(finalHeat * u_intensity * 2.0, 0.0, 1.0);
      } else {
        // DEBUG: Show bars even without heat (subtle dark red tint)
        color = vec3(0.2, 0.0, 0.0);
        alpha = 0.3;
      }

      gl_FragColor = vec4(color, alpha);
    }
  `;

  /**
   * Create WebGL context and shaders for a bar
   */
  private createBarTexture(width: number, height: number): BarTexture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false
    });

    if (!gl) {
      throw new Error('WebGL not supported');
    }

    // Compile shaders
    const vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, this.vertexShaderSource);
    const fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, this.fragmentShaderSource);

    // Create program
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error('Shader program failed to link: ' + gl.getProgramInfoLog(program));
    }

    // Create texture for heat map
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, null);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // Create framebuffer
    const frameBuffer = gl.createFramebuffer()!;

    // Create fullscreen quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    return {
      canvas,
      gl,
      program,
      texture,
      frameBuffer,
      width,
      height,
      heatMap: new Float32Array(width * height),
    };
  }

  /**
   * Compile a WebGL shader
   */
  private compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error('Shader compilation failed: ' + info);
    }

    return shader;
  }

  /**
   * Add wrap event as heat impulse to the bar
   */
  private addHeatImpulse(
    bar: BarTexture,
    position: number, // 0-1 along the bar
    intensity: number,
    params: LetterboxParams
  ): void {
    const { width, height, heatMap } = bar;
    const orientation = width > height ? 'horizontal' : 'vertical';

    // Convert position to pixel coordinate
    const pixelPos = Math.floor(position * (orientation === 'horizontal' ? width : height));

    // Size of the heat spot (affected by particle size parameter)
    const spotSize = Math.max(2, Math.floor(params.particleSize * 0.5));

    // Add heat to the heatMap
    for (let dy = -spotSize; dy <= spotSize; dy++) {
      for (let dx = -spotSize; dx <= spotSize; dx++) {
        let x, y;

        if (orientation === 'horizontal') {
          x = pixelPos + dx;
          y = Math.floor(height / 2) + dy;
        } else {
          x = Math.floor(width / 2) + dx;
          y = pixelPos + dy;
        }

        if (x >= 0 && x < width && y >= 0 && y < height) {
          const distance = Math.sqrt(dx * dx + dy * dy);
          const falloff = Math.max(0, 1 - distance / spotSize);
          const idx = y * width + x;

          // Add heat with falloff
          heatMap[idx] = Math.min(1.0, heatMap[idx] + intensity * falloff * params.intensity);
        }
      }
    }
  }

  /**
   * Update heat map (decay and diffusion)
   */
  private updateHeatMap(bar: BarTexture, params: LetterboxParams): void {
    const { width, height, heatMap } = bar;
    const temp = new Float32Array(heatMap);

    // Decay
    const decay = 1.0 - (1.0 - params.particleLifetime / 3.0) * 0.05;

    for (let i = 0; i < heatMap.length; i++) {
      heatMap[i] *= decay;
    }

    // Simple diffusion (blur)
    const diffusion = params.turbulence * 0.1;

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = y * width + x;

        const neighbors = [
          temp[(y - 1) * width + x],
          temp[(y + 1) * width + x],
          temp[y * width + (x - 1)],
          temp[y * width + (x + 1)],
        ];

        const avg = neighbors.reduce((a, b) => a + b, 0) / 4;
        heatMap[idx] = temp[idx] * (1 - diffusion) + avg * diffusion;
      }
    }
  }

  /**
   * Render a bar using WebGL
   */
  private renderBar(bar: BarTexture, params: LetterboxParams, time: number): void {
    const { gl, program, texture, heatMap, width, height } = bar;

    // Upload heat map to texture
    const heatData = new Uint8Array(heatMap.map(v => Math.floor(v * 255)));
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, width, height, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, heatData);

    // Use shader program
    gl.useProgram(program);

    // Set uniforms
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const intensityLocation = gl.getUniformLocation(program, 'u_intensity');
    const glowLocation = gl.getUniformLocation(program, 'u_glow');
    const turbulenceLocation = gl.getUniformLocation(program, 'u_turbulence');
    const heatTextureLocation = gl.getUniformLocation(program, 'u_heatTexture');

    gl.uniform1f(timeLocation, time);
    gl.uniform2f(resolutionLocation, width, height);
    gl.uniform1f(intensityLocation, params.intensity);
    gl.uniform1f(glowLocation, params.glow);
    gl.uniform1f(turbulenceLocation, params.turbulence);
    gl.uniform1i(heatTextureLocation, 0);

    // Render
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
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
    currentFrame: number
  ): void {
    if (!params.enabled) {
      return;
    }

    // DEBUG: Draw a simple red rectangle to verify render is called
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(10, 10, 100, 50);
    ctx.fillStyle = 'white';
    ctx.font = '12px monospace';
    ctx.fillText('WrapEffects Active', 15, 35);

    const time = currentFrame * 0.016; // Approximate time in seconds

    // Determine bar sizes
    const hasHorizontalBars = gridHeight < canvasHeight;
    const hasVerticalBars = gridWidth < canvasWidth;

    // Initialize bars if needed
    if (hasHorizontalBars) {
      const barHeight = Math.floor((canvasHeight - gridHeight) / 2);
      if (!this.topBar || this.topBar.height !== barHeight) {
        this.topBar = this.createBarTexture(canvasWidth, barHeight);
        this.bottomBar = this.createBarTexture(canvasWidth, barHeight);
      }
    }

    if (hasVerticalBars) {
      const barWidth = Math.floor((canvasWidth - gridWidth) / 2);
      if (!this.leftBar || this.leftBar.width !== barWidth) {
        this.leftBar = this.createBarTexture(barWidth, canvasHeight);
        this.rightBar = this.createBarTexture(barWidth, canvasHeight);
      }
    }

    // Process wrap events and add heat impulses
    for (const event of wrapEvents) {
      // Only process recent events
      if (currentFrame - event.timestamp >= 5) continue;

      const intensity = params.useAgentColor ? (event.r + event.g + event.b) / (3 * 255) : 0.5;
      const trailBoost = params.trailInfluence * (
        event.trailIntensity.red + event.trailIntensity.green + event.trailIntensity.blue
      ) / (3 * 255);
      const finalIntensity = intensity * (1 + trailBoost);

      if (event.edge === 'top' && this.topBar) {
        this.addHeatImpulse(this.topBar, event.x / gridWidth, finalIntensity, params);
      } else if (event.edge === 'bottom' && this.bottomBar) {
        this.addHeatImpulse(this.bottomBar, event.x / gridWidth, finalIntensity, params);
      } else if (event.edge === 'left' && this.leftBar) {
        this.addHeatImpulse(this.leftBar, event.y / gridHeight, finalIntensity, params);
      } else if (event.edge === 'right' && this.rightBar) {
        this.addHeatImpulse(this.rightBar, event.y / gridHeight, finalIntensity, params);
      }
    }

    // Update and render bars
    if (this.topBar) {
      this.updateHeatMap(this.topBar, params);
      this.renderBar(this.topBar, params, time);
      ctx.drawImage(this.topBar.canvas, 0, 0);
    }

    if (this.bottomBar) {
      this.updateHeatMap(this.bottomBar, params);
      this.renderBar(this.bottomBar, params, time);
      ctx.drawImage(this.bottomBar.canvas, 0, canvasHeight - this.bottomBar.height);
    }

    if (this.leftBar) {
      this.updateHeatMap(this.leftBar, params);
      this.renderBar(this.leftBar, params, time);
      ctx.drawImage(this.leftBar.canvas, 0, 0);
    }

    if (this.rightBar) {
      this.updateHeatMap(this.rightBar, params);
      this.renderBar(this.rightBar, params, time);
      ctx.drawImage(this.rightBar.canvas, canvasWidth - this.rightBar.width, 0);
    }
  }

  /**
   * Reset/cleanup
   */
  reset(): void {
    // Clear heat maps
    if (this.topBar) this.topBar.heatMap.fill(0);
    if (this.bottomBar) this.bottomBar.heatMap.fill(0);
    if (this.leftBar) this.leftBar.heatMap.fill(0);
    if (this.rightBar) this.rightBar.heatMap.fill(0);
  }
}
