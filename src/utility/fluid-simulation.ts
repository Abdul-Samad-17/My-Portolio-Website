/**
 * High-Performance WebGL Navier-Stokes Fluid Simulation Engine
 * 
 * Recreates the exact fluid smoke dynamics seen in modern portfolio websites (e.g., Nikunj Khitha / PavelDoGreat):
 * - Navier-Stokes incompressible fluid dynamics: Advection, Vorticity Confinement, Pressure Poisson Solver, Divergence.
 * - Dynamic color transitions: Lerps seamlessly between --accent (Teal) and --cursor-trail-secondary (Violet).
 * - Full-featured interaction:
 *   - Hover / Mouse move: Leaves curling wisps of colored fluid smoke.
 *   - Stationary Click (mousedown without moving): Injects a radial vortex burst forming an expanding smoke ring.
 *   - Mouse Drag (click with moving): Injects high-velocity turbulent dye streams.
 * - Multi-pass Bloom post-processing for a luminous neon vapor glow.
 * - Window-level pointer tracking (operates smoothly behind/over UI elements).
 * - Clean lifecycle: Resizes smoothly, frees GPU memory on unmount, respects prefers-reduced-motion.
 */

export interface FluidSimulationConfig {
  simResolution?: number;
  dyeResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  pressureIterations?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  bloom?: boolean;
  bloomIterations?: number;
  bloomResolution?: number;
  bloomIntensity?: number;
  bloomThreshold?: number;
  bloomSoftKnee?: number;
  shading?: boolean;
}

interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBO;
  write: FBO;
  swap: () => void;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hslToRgb(h: number, s: number, l: number): RGB {
  h = h / 360;
  let r: number, g: number, b: number;
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
  return { r, g, b };
}

function resolveCssColor(varName: string, fallback: RGB): RGB {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
  if (!raw) return fallback;

  const parts = raw.split(/\s+/);
  if (parts.length >= 3) {
    const h = parseFloat(parts[0]) || 0;
    const s = (parseFloat(parts[1]) || 0) / 100;
    const l = (parseFloat(parts[2]) || 0) / 100;
    return hslToRgb(h, s, l);
  }
  return fallback;
}

export class FluidSimulation {
  private canvas: HTMLCanvasElement;
  private gl!: WebGLRenderingContext | WebGL2RenderingContext;
  private isWebGL2 = false;
  private ext: any = {};

  // Simulation parameters tuned to reference site behavior:
  // - Small circular splat radius, moderate splat force (no pointed streaks)
  // - Fast dissipation (clears in ~0.5-1s, no persistent pooling)
  // - Low curl (swirl stays tightly localized near cursor tip within 100-200px)
  private SIM_RES = 128;
  private DYE_RES = 1024;
  private DENSITY_DISSIPATION = 1.6; // Slow, graceful dissipation — holds persistent shape as it fades
  private VELOCITY_DISSIPATION = 4.5; // High velocity damping — prevents churning/shredding into separated wisps
  private PRESSURE = 0.8;
  private PRESSURE_ITERATIONS = 20;
  private CURL = 0.3; // Low curl — prevents tearing dye into powder/wisps, keeping a cohesive wave
  private SPLAT_RADIUS = 0.34; // Generous width for a full, present fluid body
  private SPLAT_FORCE = 1100; // Soft forward impulse — doesn't shear the fluid envelope
  private BLOOM = true;
  private BLOOM_ITERATIONS = 8;
  private BLOOM_RES = 256;
  private BLOOM_INTENSITY = 0.20; // Subtle neon sheen without noisy speckles
  private BLOOM_THRESHOLD = 0.5;
  private BLOOM_SOFT_KNEE = 0.7;
  private SHADING = false; // Disabled harsh 3D normal-map to eliminate powdery/granular artifacts

  // Framebuffers
  private density!: DoubleFBO;
  private velocity!: DoubleFBO;
  private divergence!: FBO;
  private curlFbo!: FBO;
  private pressureFbo!: DoubleFBO;
  private bloomFbos: FBO[] = [];
  private ditherTexture!: FBO;

  // Programs & Shaders
  private splatProgram!: any;
  private advectionProgram!: any;
  private divergenceProgram!: any;
  private curlProgram!: any;
  private vorticityProgram!: any;
  private pressureProgram!: any;
  private gradSubtractProgram!: any;
  private clearProgram!: any;
  private displayProgram!: any;
  private bloomPrefilterProgram!: any;
  private bloomBlurProgram!: any;
  private bloomFinalProgram!: any;

  // Blit helper
  private blit!: (destination: WebGLFramebuffer | null) => void;

  // Interaction State
  private lastX = 0;
  private lastY = 0;
  private isMouseDown = false;
  private colorPhase = 0;
  private primaryColor: RGB = { r: 32 / 255, g: 141 / 255, b: 147 / 255 }; // Teal
  private secondaryColor: RGB = { r: 138 / 255, g: 99 / 255, b: 210 / 255 }; // Violet

  // RAF & Lifecycle
  private animId: number | null = null;
  private lastTime = performance.now();
  private boundMouseMove!: (e: MouseEvent) => void;
  private boundMouseDown!: (e: MouseEvent) => void;
  private boundMouseUp!: (e: MouseEvent) => void;
  private boundTouchMove!: (e: TouchEvent) => void;
  private boundTouchStart!: (e: TouchEvent) => void;
  private boundTouchEnd!: () => void;
  private boundResize!: () => void;
  private destroyed = false;

  constructor(canvas: HTMLCanvasElement, config?: FluidSimulationConfig) {
    this.canvas = canvas;
    if (config) {
      if (config.simResolution) this.SIM_RES = config.simResolution;
      if (config.dyeResolution) this.DYE_RES = config.dyeResolution;
      if (config.densityDissipation !== undefined) this.DENSITY_DISSIPATION = config.densityDissipation;
      if (config.velocityDissipation !== undefined) this.VELOCITY_DISSIPATION = config.velocityDissipation;
      if (config.pressure !== undefined) this.PRESSURE = config.pressure;
      if (config.pressureIterations !== undefined) this.PRESSURE_ITERATIONS = config.pressureIterations;
      if (config.curl !== undefined) this.CURL = config.curl;
      if (config.splatRadius !== undefined) this.SPLAT_RADIUS = config.splatRadius;
      if (config.splatForce !== undefined) this.SPLAT_FORCE = config.splatForce;
      if (config.bloom !== undefined) this.BLOOM = config.bloom;
      if (config.bloomIterations !== undefined) this.BLOOM_ITERATIONS = config.bloomIterations;
      if (config.bloomIntensity !== undefined) this.BLOOM_INTENSITY = config.bloomIntensity;
      if (config.shading !== undefined) this.SHADING = config.shading;
    }

    this.updateColors();
    const success = this.initGL();
    if (!success) {
      console.warn("WebGL fluid simulation is not supported on this device/browser.");
      return;
    }

    this.initShaders();
    this.initFBOs();
    this.bindEvents();

    // Subtle initial pulse at center
    this.burst(0.5, 0.4, 6, 800, 0.15);

    this.loop();
  }

  public updateColors(): void {
    const p = resolveCssColor("--accent", { r: 32 / 255, g: 141 / 255, b: 147 / 255 });
    const s = resolveCssColor("--cursor-trail-secondary", { r: 138 / 255, g: 99 / 255, b: 210 / 255 });
    this.primaryColor = p;
    this.secondaryColor = s;
  }

  private getIntensityMultiplier(): number {
    if (typeof document === "undefined") return 0.15;
    const isDark = document.documentElement.classList.contains("dark");
    // Softer, lighter per-color intensity (0.15 dark / 0.10 light)
    // Ensures smooth gradient transitions without bright mixed patches
    return isDark ? 0.15 : 0.10;
  }

  private getCurrentColor(brightness = 1.0): RGB {
    // Reference intensity: ~0.20 in dark mode, ~0.14 in light mode applied per-color.
    // Prevents additive-blending blowout to solid white where teal and violet overlap.
    const intensity = this.getIntensityMultiplier() * brightness;
    const t = (Math.sin(this.colorPhase) + 1.0) * 0.5;
    return {
      r: (this.primaryColor.r * (1 - t) + this.secondaryColor.r * t) * intensity,
      g: (this.primaryColor.g * (1 - t) + this.secondaryColor.g * t) * intensity,
      b: (this.primaryColor.b * (1 - t) + this.secondaryColor.b * t) * intensity,
    };
  }

  private initGL(): boolean {
    const params = {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    };

    let gl: any = this.canvas.getContext("webgl2", params);
    this.isWebGL2 = !!gl;

    if (!gl) {
      gl = this.canvas.getContext("webgl", params) ||
        this.canvas.getContext("experimental-webgl", params);
    }

    if (!gl) return false;
    this.gl = gl;

    let halfFloatTexType: number;
    let formatRGBA: any;
    let formatRG: any;
    let formatR: any;
    let supportLinearFiltering: any;

    if (this.isWebGL2) {
      const gl2 = gl as WebGL2RenderingContext;
      gl2.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = gl2.getExtension("OES_texture_float_linear");
      halfFloatTexType = gl2.HALF_FLOAT;
      formatRGBA = this.getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, halfFloatTexType);
      formatRG = this.getSupportedFormat(gl2, gl2.RG16F, gl2.RG, halfFloatTexType);
      formatR = this.getSupportedFormat(gl2, gl2.R16F, gl2.RED, halfFloatTexType);
    } else {
      const halfFloatExt = gl.getExtension("OES_texture_half_float");
      supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
      halfFloatTexType = halfFloatExt ? halfFloatExt.HALF_FLOAT_OES : gl.FLOAT;
      formatRGBA = this.getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatRG = this.getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      formatR = this.getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
    }

    if (!formatRGBA) return false;

    this.ext = {
      formatRGBA,
      formatRG,
      formatR,
      halfFloatTexType,
      supportLinearFiltering: !!supportLinearFiltering,
    };

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    this.initBlit();
    return true;
  }

  private getSupportedFormat(gl: any, internalFormat: number, format: number, type: number): any {
    if (!this.supportRenderTextureFormat(gl, internalFormat, format, type)) {
      switch (internalFormat) {
        case gl.R16F:
          return this.getSupportedFormat(gl, gl.RG16F, gl.RG, type);
        case gl.RG16F:
          return this.getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
        default:
          return null;
      }
    }
    return { internalFormat, format };
  }

  private supportRenderTextureFormat(gl: any, internalFormat: number, format: number, type: number): boolean {
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);

    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

    const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    gl.deleteTexture(texture);
    gl.deleteFramebuffer(fbo);
    return status === gl.FRAMEBUFFER_COMPLETE;
  }

  private initBlit(): void {
    const gl = this.gl;
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);

    const elemBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elemBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);

    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    this.blit = (destination: WebGLFramebuffer | null) => {
      gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
  }

  private compileShader(type: number, source: string): WebGLShader {
    const gl = this.gl;
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader): any {
    const gl = this.gl;
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const uniforms: Record<string, WebGLUniformLocation> = {};
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const info = gl.getActiveUniform(program, i);
      if (info) {
        uniforms[info.name] = gl.getUniformLocation(program, info.name)!;
      }
    }

    return {
      program,
      uniforms,
      bind: () => gl.useProgram(program),
    };
  }

  private initShaders(): void {
    const gl = this.gl;

    const baseVertex = this.compileShader(
      gl.VERTEX_SHADER,
      `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          vL = vUv - vec2(texelSize.x, 0.0);
          vR = vUv + vec2(texelSize.x, 0.0);
          vT = vUv + vec2(0.0, texelSize.y);
          vB = vUv - vec2(0.0, texelSize.y);
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
      `
    );

    const blurVertex = this.compileShader(
      gl.VERTEX_SHADER,
      `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      uniform vec2 texelSize;
      void main () {
          vUv = aPosition * 0.5 + 0.5;
          float offset = 1.33333333;
          vL = vUv - texelSize * offset;
          vR = vUv + texelSize * offset;
          gl_Position = vec4(aPosition, 0.0, 1.0);
      }
      `
    );

    const clearFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      uniform sampler2D uTexture;
      uniform float value;
      void main () {
          gl_FragColor = value * texture2D(uTexture, vUv);
      }
      `
    );
    this.clearProgram = this.createProgram(baseVertex, clearFrag);

    const splatFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTarget;
      uniform float aspectRatio;
      uniform vec3 color;
      uniform vec2 point;
      uniform float radius;
      void main () {
          vec2 p = vUv - point.xy;
          p.x *= aspectRatio;
          vec3 splat = exp(-dot(p, p) / radius) * color;
          vec3 base = texture2D(uTarget, vUv).xyz;
          gl_FragColor = vec4(base + splat, 1.0);
      }
      `
    );
    this.splatProgram = this.createProgram(baseVertex, splatFrag);

    const advectionFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      uniform sampler2D uVelocity;
      uniform sampler2D uSource;
      uniform vec2 texelSize;
      uniform float dt;
      uniform float dissipation;

      vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
          vec2 st = uv / tsize - 0.5;
          vec2 iuv = floor(st);
          vec2 fuv = fract(st);
          vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
          vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
          vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
          vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);
          return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
      }

      void main () {
          vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
          vec4 result = bilerp(uSource, coord, texelSize);
          float decay = 1.0 + dissipation * dt;
          gl_FragColor = result / decay;
      }
      `
    );
    this.advectionProgram = this.createProgram(baseVertex, advectionFrag);

    const divergenceFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).x;
          float R = texture2D(uVelocity, vR).x;
          float T = texture2D(uVelocity, vT).y;
          float B = texture2D(uVelocity, vB).y;
          vec2 C = texture2D(uVelocity, vUv).xy;
          if (vL.x < 0.0) { L = -C.x; }
          if (vR.x > 1.0) { R = -C.x; }
          if (vT.y > 1.0) { T = -C.y; }
          if (vB.y < 0.0) { B = -C.y; }
          float div = 0.5 * (R - L + T - B);
          gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
      }
      `
    );
    this.divergenceProgram = this.createProgram(baseVertex, divergenceFrag);

    const curlFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uVelocity, vL).y;
          float R = texture2D(uVelocity, vR).y;
          float T = texture2D(uVelocity, vT).x;
          float B = texture2D(uVelocity, vB).x;
          float vorticity = R - L - T + B;
          gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
      }
      `
    );
    this.curlProgram = this.createProgram(baseVertex, curlFrag);

    const vorticityFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uVelocity;
      uniform sampler2D uCurl;
      uniform float curl;
      uniform float dt;
      void main () {
          float L = texture2D(uCurl, vL).x;
          float R = texture2D(uCurl, vR).x;
          float T = texture2D(uCurl, vT).x;
          float B = texture2D(uCurl, vB).x;
          float C = texture2D(uCurl, vUv).x;
          vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
          force /= length(force) + 0.0001;
          force *= curl * C;
          force.y *= -1.0;
          vec2 vel = texture2D(uVelocity, vUv).xy;
          gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
      }
      `
    );
    this.vorticityProgram = this.createProgram(baseVertex, vorticityFrag);

    const pressureFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uDivergence;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          float divergence = texture2D(uDivergence, vUv).x;
          float pressure = (L + R + B + T - divergence) * 0.25;
          gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
      }
      `
    );
    this.pressureProgram = this.createProgram(baseVertex, pressureFrag);

    const gradSubtractFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying highp vec2 vUv;
      varying highp vec2 vL;
      varying highp vec2 vR;
      varying highp vec2 vT;
      varying highp vec2 vB;
      uniform sampler2D uPressure;
      uniform sampler2D uVelocity;
      void main () {
          float L = texture2D(uPressure, vL).x;
          float R = texture2D(uPressure, vR).x;
          float T = texture2D(uPressure, vT).x;
          float B = texture2D(uPressure, vB).x;
          vec2 velocity = texture2D(uVelocity, vUv).xy;
          velocity.xy -= vec2(R - L, T - B);
          gl_FragColor = vec4(velocity, 0.0, 1.0);
      }
      `
    );
    this.gradSubtractProgram = this.createProgram(baseVertex, gradSubtractFrag);

    // Bloom shaders
    const bloomPrefilterFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vUv;
      uniform sampler2D uTexture;
      uniform vec3 curve;
      uniform float threshold;
      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          float br = max(c.r, max(c.g, c.b));
          float rq = clamp(br - curve.x, 0.0, curve.y);
          rq = curve.z * rq * rq;
          c *= max(rq, br - threshold) / max(br, 0.0001);
          gl_FragColor = vec4(c, 0.0);
      }
      `
    );
    this.bloomPrefilterProgram = this.createProgram(baseVertex, bloomPrefilterFrag);

    const bloomBlurFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vL;
      varying vec2 vR;
      uniform sampler2D uTexture;
      void main () {
          vec4 sum = vec4(0.0);
          sum += texture2D(uTexture, vL) * 0.5;
          sum += texture2D(uTexture, vR) * 0.5;
          gl_FragColor = sum;
      }
      `
    );
    this.bloomBlurProgram = this.createProgram(blurVertex, bloomBlurFrag);

    const bloomFinalFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision mediump float;
      precision mediump sampler2D;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform float intensity;
      void main () {
          vec4 sum = vec4(0.0);
          sum += texture2D(uTexture, vL);
          sum += texture2D(uTexture, vR);
          sum += texture2D(uTexture, vT);
          sum += texture2D(uTexture, vB);
          sum *= 0.25;
          gl_FragColor = sum * intensity;
      }
      `
    );
    this.bloomFinalProgram = this.createProgram(baseVertex, bloomFinalFrag);

    // Display output shader with Shading and Bloom
    const displayFrag = this.compileShader(
      gl.FRAGMENT_SHADER,
      `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uBloom;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0.0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0.0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          
          #ifdef BLOOM
          vec3 bloom = texture2D(uBloom, vUv).rgb;
          c += bloom * 0.35;
          #endif

          // Luminous organic fluid transparency without grain
          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
      `
    );
    this.displayProgram = this.createProgram(baseVertex, displayFrag);

    // 1x1 white dither placeholder texture
    const ditherTex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, ditherTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255]));
    this.ditherTexture = {
      texture: ditherTex,
      fbo: null as any,
      width: 1,
      height: 1,
      texelSizeX: 1,
      texelSizeY: 1,
      attach: (id: number) => {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, ditherTex);
        return id;
      },
    };
  }

  private createFBO(w: number, h: number, internalFormat: number, format: number, type: number, filtering: number): FBO {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0);
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filtering);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filtering);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    const fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return {
      texture,
      fbo,
      width: w,
      height: h,
      texelSizeX: 1 / w,
      texelSizeY: 1 / h,
      attach: (id: number) => {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        return id;
      },
    };
  }

  private createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, filtering: number): DoubleFBO {
    let fbo1 = this.createFBO(w, h, internalFormat, format, type, filtering);
    let fbo2 = this.createFBO(w, h, internalFormat, format, type, filtering);
    return {
      width: w,
      height: h,
      texelSizeX: fbo1.texelSizeX,
      texelSizeY: fbo1.texelSizeY,
      get read() {
        return fbo1;
      },
      set read(val) {
        fbo1 = val;
      },
      get write() {
        return fbo2;
      },
      set write(val) {
        fbo2 = val;
      },
      swap: () => {
        const temp = fbo1;
        fbo1 = fbo2;
        fbo2 = temp;
      },
    };
  }

  private getResolution(resolution: number): { width: number; height: number } {
    let aspectRatio = this.gl.drawingBufferWidth / this.gl.drawingBufferHeight;
    if (aspectRatio < 1) aspectRatio = 1 / aspectRatio;

    const min = Math.round(resolution);
    const max = Math.round(resolution * aspectRatio);

    if (this.gl.drawingBufferWidth > this.gl.drawingBufferHeight) {
      return { width: max, height: min };
    } else {
      return { width: min, height: max };
    }
  }

  private initFBOs(): void {
    const simRes = this.getResolution(this.SIM_RES);
    const dyeRes = this.getResolution(this.DYE_RES);

    const type = this.ext.halfFloatTexType;
    const rgba = this.ext.formatRGBA;
    const rg = this.ext.formatRG;
    const r = this.ext.formatR;
    const filtering = this.ext.supportLinearFiltering ? this.gl.LINEAR : this.gl.NEAREST;

    this.density = this.createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, type, filtering);
    this.velocity = this.createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, type, filtering);
    this.divergence = this.createFBO(simRes.width, simRes.height, r.internalFormat, r.format, type, this.gl.NEAREST);
    this.curlFbo = this.createFBO(simRes.width, simRes.height, r.internalFormat, r.format, type, this.gl.NEAREST);
    this.pressureFbo = this.createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, type, this.gl.NEAREST);

    this.initBloomFBOs();
  }

  private initBloomFBOs(): void {
    const res = this.getResolution(this.BLOOM_RES);
    const type = this.ext.halfFloatTexType;
    const rgba = this.ext.formatRGBA;
    const filtering = this.ext.supportLinearFiltering ? this.gl.LINEAR : this.gl.NEAREST;

    this.bloomFbos = [];
    for (let i = 0; i < this.BLOOM_ITERATIONS; i++) {
      const w = res.width >> (i + 1);
      const h = res.height >> (i + 1);
      if (w < 2 || h < 2) break;
      const fbo = this.createFBO(w, h, rgba.internalFormat, rgba.format, type, filtering);
      this.bloomFbos.push(fbo);
    }
  }

  private correctRadius(radius: number): number {
    const aspectRatio = this.canvas.width / this.canvas.height;
    if (aspectRatio > 1) {
      return radius * aspectRatio;
    }
    return radius;
  }

  public splat(x: number, y: number, dx: number, dy: number, color?: RGB, radius?: number): void {
    const gl = this.gl;
    const dyeColor = color || this.getCurrentColor(this.isMouseDown ? 1.15 : 1.0);
    const rad = radius !== undefined ? radius : this.SPLAT_RADIUS;
    const correctedRadius = this.correctRadius(rad / 100.0);

    // Splat velocity
    gl.viewport(0, 0, this.velocity.width, this.velocity.height);
    this.splatProgram.bind();
    gl.uniform1i(this.splatProgram.uniforms.uTarget, this.velocity.read.attach(0));
    gl.uniform1f(this.splatProgram.uniforms.aspectRatio, this.canvas.width / this.canvas.height);
    gl.uniform2f(this.splatProgram.uniforms.point, x, y);
    gl.uniform3f(this.splatProgram.uniforms.color, dx, dy, 0.0);
    gl.uniform1f(this.splatProgram.uniforms.radius, correctedRadius);
    this.blit(this.velocity.write.fbo);
    this.velocity.swap();

    // Splat dye color
    gl.viewport(0, 0, this.density.width, this.density.height);
    gl.uniform1i(this.splatProgram.uniforms.uTarget, this.density.read.attach(0));
    gl.uniform3f(this.splatProgram.uniforms.color, dyeColor.r, dyeColor.g, dyeColor.b);
    this.blit(this.density.write.fbo);
    this.density.swap();
  }

  /**
   * Radial vortex burst — produces the signature soft expanding smoke puff
   * when clicking stationary, without washing out or blowing up.
   */
  public burst(x: number, y: number, splatCount = 8, force = 1200, radius = 0.32, customColor?: RGB): void {
    const color = customColor || this.getCurrentColor(1.0);
    const aspect = this.canvas.height / this.canvas.width;

    // Center subtle dye puff
    this.splat(x, y, 0, 0, color, radius);

    // Soft radial outward velocity impulses arranged in a circle
    for (let i = 0; i < splatCount; i++) {
      const angle = (i / splatCount) * Math.PI * 2;
      const offset = 0.008;
      const px = x + Math.cos(angle) * offset * aspect;
      const py = y + Math.sin(angle) * offset;
      const vx = Math.cos(angle) * force;
      const vy = Math.sin(angle) * force;
      this.splat(px, py, vx, vy, color, radius * 0.75);
    }
  }

  private step(dt: number): void {
    const gl = this.gl;

    gl.disable(gl.BLEND);
    gl.viewport(0, 0, this.velocity.width, this.velocity.height);

    // 1. Curl
    this.curlProgram.bind();
    gl.uniform2f(this.curlProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
    gl.uniform1i(this.curlProgram.uniforms.uVelocity, this.velocity.read.attach(0));
    this.blit(this.curlFbo.fbo);

    // 2. Vorticity Confinement
    this.vorticityProgram.bind();
    gl.uniform2f(this.vorticityProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
    gl.uniform1i(this.vorticityProgram.uniforms.uVelocity, this.velocity.read.attach(0));
    gl.uniform1i(this.vorticityProgram.uniforms.uCurl, this.curlFbo.attach(1));
    gl.uniform1f(this.vorticityProgram.uniforms.curl, this.CURL);
    gl.uniform1f(this.vorticityProgram.uniforms.dt, dt);
    this.blit(this.velocity.write.fbo);
    this.velocity.swap();

    // 3. Divergence
    this.divergenceProgram.bind();
    gl.uniform2f(this.divergenceProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
    gl.uniform1i(this.divergenceProgram.uniforms.uVelocity, this.velocity.read.attach(0));
    this.blit(this.divergence.fbo);

    // 4. Pressure Clear
    this.clearProgram.bind();
    gl.uniform1i(this.clearProgram.uniforms.uTexture, this.pressureFbo.read.attach(0));
    gl.uniform1f(this.clearProgram.uniforms.value, this.PRESSURE);
    this.blit(this.pressureFbo.write.fbo);
    this.pressureFbo.swap();

    // 5. Pressure Poisson Solver (Jacobi iterations)
    this.pressureProgram.bind();
    gl.uniform2f(this.pressureProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
    gl.uniform1i(this.pressureProgram.uniforms.uDivergence, this.divergence.attach(0));
    for (let i = 0; i < this.PRESSURE_ITERATIONS; i++) {
      gl.uniform1i(this.pressureProgram.uniforms.uPressure, this.pressureFbo.read.attach(1));
      this.blit(this.pressureFbo.write.fbo);
      this.pressureFbo.swap();
    }

    // 6. Gradient Subtraction (Enforce incompressibility)
    this.gradSubtractProgram.bind();
    gl.uniform2f(this.gradSubtractProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
    gl.uniform1i(this.gradSubtractProgram.uniforms.uPressure, this.pressureFbo.read.attach(0));
    gl.uniform1i(this.gradSubtractProgram.uniforms.uVelocity, this.velocity.read.attach(1));
    this.blit(this.velocity.write.fbo);
    this.velocity.swap();

    // 7. Advect Velocity
    this.advectionProgram.bind();
    gl.uniform2f(this.advectionProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
    gl.uniform1i(this.advectionProgram.uniforms.uVelocity, this.velocity.read.attach(0));
    gl.uniform1i(this.advectionProgram.uniforms.uSource, this.velocity.read.attach(0));
    gl.uniform1f(this.advectionProgram.uniforms.dt, dt);
    gl.uniform1f(this.advectionProgram.uniforms.dissipation, this.VELOCITY_DISSIPATION);
    this.blit(this.velocity.write.fbo);
    this.velocity.swap();

    // 8. Advect Density (Dye smoke)
    gl.viewport(0, 0, this.density.width, this.density.height);
    gl.uniform2f(this.advectionProgram.uniforms.texelSize, this.velocity.texelSizeX, this.velocity.texelSizeY);
    gl.uniform1i(this.advectionProgram.uniforms.uVelocity, this.velocity.read.attach(0));
    gl.uniform1i(this.advectionProgram.uniforms.uSource, this.density.read.attach(1));
    gl.uniform1f(this.advectionProgram.uniforms.dissipation, this.DENSITY_DISSIPATION);
    this.blit(this.density.write.fbo);
    this.density.swap();
  }

  private applyBloom(source: FBO, destination: FBO): void {
    if (this.bloomFbos.length < 2) return;
    const gl = this.gl;

    let last = destination;
    gl.disable(gl.BLEND);

    // Prefilter
    this.bloomPrefilterProgram.bind();
    const knee = this.BLOOM_THRESHOLD * this.BLOOM_SOFT_KNEE + 0.0001;
    const curve0 = this.BLOOM_THRESHOLD - knee;
    const curve1 = knee * 2;
    const curve2 = 0.25 / knee;
    gl.uniform3f(this.bloomPrefilterProgram.uniforms.curve, curve0, curve1, curve2);
    gl.uniform1f(this.bloomPrefilterProgram.uniforms.threshold, this.BLOOM_THRESHOLD);
    gl.uniform1i(this.bloomPrefilterProgram.uniforms.uTexture, source.attach(0));
    gl.viewport(0, 0, last.width, last.height);
    this.blit(last.fbo);

    // Downsample blur chain
    this.bloomBlurProgram.bind();
    for (let i = 0; i < this.bloomFbos.length; i++) {
      const dest = this.bloomFbos[i];
      gl.uniform2f(this.bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(this.bloomBlurProgram.uniforms.uTexture, last.attach(0));
      gl.viewport(0, 0, dest.width, dest.height);
      this.blit(dest.fbo);
      last = dest;
    }

    // Upsample and accumulate
    gl.blendFunc(gl.ONE, gl.ONE);
    gl.enable(gl.BLEND);
    for (let i = this.bloomFbos.length - 2; i >= 0; i--) {
      const baseTarget = this.bloomFbos[i];
      gl.uniform2f(this.bloomBlurProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
      gl.uniform1i(this.bloomBlurProgram.uniforms.uTexture, last.attach(0));
      gl.viewport(0, 0, baseTarget.width, baseTarget.height);
      this.blit(baseTarget.fbo);
      last = baseTarget;
    }

    gl.disable(gl.BLEND);
    this.bloomFinalProgram.bind();
    gl.uniform2f(this.bloomFinalProgram.uniforms.texelSize, last.texelSizeX, last.texelSizeY);
    gl.uniform1i(this.bloomFinalProgram.uniforms.uTexture, last.attach(0));
    gl.uniform1f(this.bloomFinalProgram.uniforms.intensity, this.BLOOM_INTENSITY);
    gl.viewport(0, 0, destination.width, destination.height);
    this.blit(destination.fbo);
  }

  private render(): void {
    const gl = this.gl;
    const w = this.canvas.width;
    const h = this.canvas.height;

    if (this.BLOOM && this.bloomFbos.length > 0) {
      this.applyBloom(this.density.read, this.bloomFbos[0]);
    }

    gl.viewport(0, 0, w, h);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);

    this.displayProgram.bind();
    gl.uniform2f(this.displayProgram.uniforms.texelSize, 1 / w, 1 / h);
    gl.uniform1i(this.displayProgram.uniforms.uTexture, this.density.read.attach(0));
    if (this.BLOOM && this.bloomFbos.length > 0) {
      gl.uniform1i(this.displayProgram.uniforms.uBloom, this.bloomFbos[0].attach(1));
    }

    this.blit(null);
  }

  private resizeCanvas(): boolean {
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
      this.canvas.style.width = `${window.innerWidth}px`;
      this.canvas.style.height = `${window.innerHeight}px`;
      return true;
    }
    return false;
  }

  private bindEvents(): void {
    const updatePointer = (clientX: number, clientY: number, forceSplat = false) => {
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const x = (clientX * dpr) / this.canvas.width;
      const y = 1.0 - (clientY * dpr) / this.canvas.height;

      const dx = clientX - this.lastX;
      const dy = clientY - this.lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      this.lastX = clientX;
      this.lastY = clientY;

      if (dist > 0 || forceSplat) {
        // Shift color phase subtly with movement
        this.colorPhase += dist * 0.005 + 0.015;

        // Clamp step displacement to prevent hyper-accelerated comet/cone streaks on fast flicks
        const maxStep = 35;
        const clampedDx = Math.max(-maxStep, Math.min(maxStep, dx));
        const clampedDy = Math.max(-maxStep, Math.min(maxStep, dy));

        const forceMultiplier = this.isMouseDown ? 1.15 : 0.85;
        const velX = (clampedDx / window.innerWidth) * this.SPLAT_FORCE * forceMultiplier;
        const velY = (-clampedDy / window.innerHeight) * this.SPLAT_FORCE * forceMultiplier;

        this.splat(x, y, velX, velY, undefined, this.SPLAT_RADIUS);
      }
    };

    this.boundMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY);
    };

    this.boundMouseDown = (e: MouseEvent) => {
      this.isMouseDown = true;
      const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const x = (e.clientX * dpr) / this.canvas.width;
      const y = 1.0 - (e.clientY * dpr) / this.canvas.height;

      // Soft burst on stationary click (and start of drag)
      this.burst(x, y, 8, 800, 0.32);
      this.lastX = e.clientX;
      this.lastY = e.clientY;
    };

    this.boundMouseUp = () => {
      this.isMouseDown = false;
    };

    this.boundTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        this.isMouseDown = true;
        const touch = e.touches[0];
        const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
        const x = (touch.clientX * dpr) / this.canvas.width;
        const y = 1.0 - (touch.clientY * dpr) / this.canvas.height;
        this.burst(x, y, 6, 700, 0.28);
        this.lastX = touch.clientX;
        this.lastY = touch.clientY;
      }
    };

    this.boundTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updatePointer(touch.clientX, touch.clientY);
      }
    };

    this.boundTouchEnd = () => {
      this.isMouseDown = false;
    };

    this.boundResize = () => {
      if (this.resizeCanvas()) {
        this.initFBOs();
      }
    };

    window.addEventListener("mousemove", this.boundMouseMove, { passive: true });
    window.addEventListener("mousedown", this.boundMouseDown, { passive: true });
    window.addEventListener("mouseup", this.boundMouseUp, { passive: true });
    window.addEventListener("touchstart", this.boundTouchStart, { passive: true });
    window.addEventListener("touchmove", this.boundTouchMove, { passive: true });
    window.addEventListener("touchend", this.boundTouchEnd, { passive: true });
    window.addEventListener("resize", this.boundResize);

    this.resizeCanvas();
  }

  private loop = (): void => {
    if (this.destroyed) return;

    const now = performance.now();
    let dt = (now - this.lastTime) / 1000;
    dt = Math.min(dt, 0.033); // Clamp dt to prevent explosion on tab resume
    this.lastTime = now;

    if (this.resizeCanvas()) {
      this.initFBOs();
    }

    this.step(dt);
    this.render();

    this.animId = requestAnimationFrame(this.loop);
  };

  public destroy(): void {
    this.destroyed = true;
    if (this.animId !== null) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }

    window.removeEventListener("mousemove", this.boundMouseMove);
    window.removeEventListener("mousedown", this.boundMouseDown);
    window.removeEventListener("mouseup", this.boundMouseUp);
    window.removeEventListener("touchstart", this.boundTouchStart);
    window.removeEventListener("touchmove", this.boundTouchMove);
    window.removeEventListener("touchend", this.boundTouchEnd);
    window.removeEventListener("resize", this.boundResize);
  }
}
