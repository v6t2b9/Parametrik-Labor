declare module 'gif.js.optimized' {
  interface GIFOptions {
    workers?: number;
    quality?: number;
    width?: number;
    height?: number;
    workerScript?: string;
    background?: string;
    transparent?: string | null;
    repeat?: number;
    dither?: boolean | 'FloydSteinberg' | 'FalseFloydSteinberg' | 'Stucki' | 'Atkinson';
  }

  interface AddFrameOptions {
    copy?: boolean;
    delay?: number;
  }

  class GIF {
    constructor(options: GIFOptions);
    addFrame(
      canvas: HTMLCanvasElement | CanvasRenderingContext2D | ImageData,
      options?: AddFrameOptions
    ): void;
    render(): void;
    on(event: 'finished', callback: (blob: Blob) => void): void;
    on(event: 'progress', callback: (progress: number) => void): void;
    abort(): void;
  }

  export default GIF;
}
