/**
 * WebGL-based trail renderer for high-performance visualization
 * Moves trail rendering from CPU (pixel-by-pixel) to GPU (shader-based)
 * Expected performance gain: 10-20ms per frame
 */

import type { Trails, VisualizationParams } from '../types/index.js';

export class WebGLTrailRenderer {
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private canvas: HTMLCanvasElement;
  private gridSize: number;
  private canvasWidth: number;
  private canvasHeight: number;

  // Textures for trail data
  private redTexture: WebGLTexture | null = null;
  private greenTexture: WebGLTexture | null = null;
  private blueTexture: WebGLTexture | null = null;

  // Vertex buffer
  private vertexBuffer: WebGLBuffer | null = null;

  // Uniform locations
  private uniformLocations: {
    redTexture?: WebGLUniformLocation | null;
    greenTexture?: WebGLUniformLocation | null;
    blueTexture?: WebGLUniformLocation | null;
    colorRed?: WebGLUniformLocation | null;
    colorGreen?: WebGLUniformLocation | null;
    colorBlue?: WebGLUniformLocation | null;
    colorBg?: WebGLUniformLocation | null;
    blendMode?: WebGLUniformLocation | null;
    trailIntensity?: WebGLUniformLocation | null;
    brightness?: WebGLUniformLocation | null;
  } = {};

  constructor(canvasWidth: number, canvasHeight: number, gridSize: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.gridSize = gridSize;
    this.canvas = document.createElement('canvas');
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;

    this.initWebGL();
  }

  private initWebGL(): void {
    const gl = this.canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
    });

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    this.gl = gl;

    // Enable float texture extension (important for high-quality trail rendering)
    const floatExt = gl.getExtension('OES_texture_float');
    if (!floatExt) {
      console.warn('OES_texture_float not supported - visual quality may be reduced');
    }
    // Enable linear filtering for float textures
    gl.getExtension('OES_texture_float_linear');

    // Create shader program
    const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

    if (!vertexShader || !fragmentShader) {
      console.error('Failed to create shaders');
      return;
    }

    this.program = this.createProgram(vertexShader, fragmentShader);
    if (!this.program) {
      console.error('Failed to create program');
      return;
    }

    gl.useProgram(this.program);

    // Set up vertex buffer (full-screen quad)
    const vertices = new Float32Array([
      -1, -1,  // bottom-left
       1, -1,  // bottom-right
      -1,  1,  // top-left
       1,  1,  // top-right
    ]);

    this.vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(this.program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Create textures
    this.redTexture = this.createTexture();
    this.greenTexture = this.createTexture();
    this.blueTexture = this.createTexture();

    // Get uniform locations
    this.uniformLocations = {
      redTexture: gl.getUniformLocation(this.program, 'u_redTexture'),
      greenTexture: gl.getUniformLocation(this.program, 'u_greenTexture'),
      blueTexture: gl.getUniformLocation(this.program, 'u_blueTexture'),
      colorRed: gl.getUniformLocation(this.program, 'u_colorRed'),
      colorGreen: gl.getUniformLocation(this.program, 'u_colorGreen'),
      colorBlue: gl.getUniformLocation(this.program, 'u_colorBlue'),
      colorBg: gl.getUniformLocation(this.program, 'u_colorBg'),
      blendMode: gl.getUniformLocation(this.program, 'u_blendMode'),
      trailIntensity: gl.getUniformLocation(this.program, 'u_trailIntensity'),
      brightness: gl.getUniformLocation(this.program, 'u_brightness'),
    };
  }

  private createShader(type: number, source: string): WebGLShader | null {
    const gl = this.gl;
    if (!gl) return null;

    const shader = gl.createShader(type);
    if (!shader) return null;

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null {
    const gl = this.gl;
    if (!gl) return null;

    const program = gl.createProgram();
    if (!program) return null;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }

    return program;
  }

  private createTexture(): WebGLTexture | null {
    const gl = this.gl;
    if (!gl) return null;

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set texture parameters for non-power-of-2 textures
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    return texture;
  }

  public render(trails: Trails, visualization: VisualizationParams): HTMLCanvasElement {
    const gl = this.gl;
    if (!gl || !this.program) return this.canvas;

    gl.useProgram(this.program);

    // Update textures with trail data
    this.updateTexture(this.redTexture, trails.red, 0);
    this.updateTexture(this.greenTexture, trails.green, 1);
    this.updateTexture(this.blueTexture, trails.blue, 2);

    // Set uniforms
    gl.uniform1i(this.uniformLocations.redTexture!, 0);
    gl.uniform1i(this.uniformLocations.greenTexture!, 1);
    gl.uniform1i(this.uniformLocations.blueTexture!, 2);

    gl.uniform3f(
      this.uniformLocations.colorRed!,
      visualization.colorRed.r / 255,
      visualization.colorRed.g / 255,
      visualization.colorRed.b / 255
    );
    gl.uniform3f(
      this.uniformLocations.colorGreen!,
      visualization.colorGreen.r / 255,
      visualization.colorGreen.g / 255,
      visualization.colorGreen.b / 255
    );
    gl.uniform3f(
      this.uniformLocations.colorBlue!,
      visualization.colorBlue.r / 255,
      visualization.colorBlue.g / 255,
      visualization.colorBlue.b / 255
    );
    gl.uniform3f(
      this.uniformLocations.colorBg!,
      visualization.colorBg.r / 255,
      visualization.colorBg.g / 255,
      visualization.colorBg.b / 255
    );

    // Set blend mode (0=additive, 1=average, 2=screen)
    const blendModeIndex =
      visualization.blendMode === 'additive' ? 0 :
      visualization.blendMode === 'average' ? 1 :
      visualization.blendMode === 'multiply' ? 1 : // same as average
      visualization.blendMode === 'screen' ? 2 : 0;
    gl.uniform1i(this.uniformLocations.blendMode!, blendModeIndex);

    gl.uniform1f(this.uniformLocations.trailIntensity!, visualization.trailIntensity);
    gl.uniform1f(this.uniformLocations.brightness!, visualization.brightness);

    // Clear and draw
    gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
    gl.clearColor(
      visualization.colorBg.r / 255,
      visualization.colorBg.g / 255,
      visualization.colorBg.b / 255,
      1
    );
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    return this.canvas;
  }

  private updateTexture(texture: WebGLTexture | null, data: Float32Array, unit: number): void {
    const gl = this.gl;
    if (!gl || !texture) return;

    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Use FLOAT texture to preserve high trail intensity values (important for visual effects)
    // This preserves the full dynamic range needed for lavalamp-like effects
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.LUMINANCE,
      this.gridSize,
      this.gridSize,
      0,
      gl.LUMINANCE,
      gl.FLOAT,
      data // Use original float data directly - shader will handle normalization
    );
  }

  public destroy(): void {
    const gl = this.gl;
    if (!gl) return;

    if (this.redTexture) gl.deleteTexture(this.redTexture);
    if (this.greenTexture) gl.deleteTexture(this.greenTexture);
    if (this.blueTexture) gl.deleteTexture(this.blueTexture);
    if (this.vertexBuffer) gl.deleteBuffer(this.vertexBuffer);
    if (this.program) gl.deleteProgram(this.program);
  }
}

// Vertex Shader: Simple pass-through
const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_position * 0.5 + 0.5;
  }
`;

// Fragment Shader: Trail blending and coloring
const fragmentShaderSource = `
  precision mediump float;

  varying vec2 v_texCoord;

  uniform sampler2D u_redTexture;
  uniform sampler2D u_greenTexture;
  uniform sampler2D u_blueTexture;

  uniform vec3 u_colorRed;
  uniform vec3 u_colorGreen;
  uniform vec3 u_colorBlue;
  uniform vec3 u_colorBg;

  uniform int u_blendMode; // 0=additive, 1=average, 2=screen
  uniform float u_trailIntensity;
  uniform float u_brightness;

  void main() {
    float redVal = texture2D(u_redTexture, v_texCoord).r;
    float greenVal = texture2D(u_greenTexture, v_texCoord).r;
    float blueVal = texture2D(u_blueTexture, v_texCoord).r;

    vec3 color = u_colorBg;

    if (u_blendMode == 0) {
      // Additive blending
      float tR = min(1.0, redVal / u_trailIntensity);
      float tG = min(1.0, greenVal / u_trailIntensity);
      float tB = min(1.0, blueVal / u_trailIntensity);

      // Soft normalization to prevent white-out
      float totalIntensity = tR + tG + tB;
      float normFactor = totalIntensity > 1.5 ? (1.5 / totalIntensity) : 1.0;
      float effectiveBrightness = u_brightness * normFactor;

      color += u_colorRed * tR * effectiveBrightness;
      color += u_colorGreen * tG * effectiveBrightness;
      color += u_colorBlue * tB * effectiveBrightness;

    } else if (u_blendMode == 1) {
      // Average/Multiply blending
      float totalTrail = redVal + greenVal + blueVal;
      if (totalTrail > 0.0) {
        float t = min(1.0, totalTrail / u_trailIntensity);
        color = (u_colorRed * redVal + u_colorGreen * greenVal + u_colorBlue * blueVal)
                / totalTrail * t * u_brightness;
      }

    } else if (u_blendMode == 2) {
      // Screen blending
      float tR = min(1.0, redVal / u_trailIntensity) * u_brightness;
      float tG = min(1.0, greenVal / u_trailIntensity) * u_brightness;
      float tB = min(1.0, blueVal / u_trailIntensity) * u_brightness;

      vec3 c1 = u_colorRed * tR;
      vec3 c2 = u_colorGreen * tG;
      vec3 c3 = u_colorBlue * tB;

      // Screen formula: 1 - (1-a)(1-b)(1-c)
      color = vec3(1.0) - (vec3(1.0) - c1) * (vec3(1.0) - c2) * (vec3(1.0) - c3);
    }

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;
