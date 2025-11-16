import type { RGBColor, HueCyclingParams, VisualizationParams } from '../types';

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return [h * 360, s * 100, l * 100];
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGBColor {
  h /= 360;
  s /= 100;
  l /= 100;

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

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Rotate the hue of an RGB color
 */
export function rotateHue(color: RGBColor, hueShift: number): RGBColor {
  const [h, s, l] = rgbToHsl(color.r, color.g, color.b);
  const newHue = (h + hueShift) % 360;
  return hslToRgb(newHue, s, l);
}

/**
 * Apply hue cycling to visualization colors based on current time
 */
export function applyHueCycling(
  visualization: VisualizationParams,
  time: number
): VisualizationParams {
  const { hueCycling } = visualization;

  if (!hueCycling.enabled) {
    return visualization;
  }

  // Calculate oscillating hue value (sine wave between startHue and endHue)
  const range = hueCycling.endHue - hueCycling.startHue;
  const oscillation = Math.sin(time * hueCycling.speed * 0.001) * 0.5 + 0.5; // 0 to 1
  const currentHue = hueCycling.startHue + range * oscillation;

  // Calculate hue shift needed
  const baseHue = 0; // Assume original colors are at hue 0 (red-ish)
  const hueShift = currentHue - baseHue;

  // Apply hue shift to all color channels
  return {
    ...visualization,
    colorRed: rotateHue(visualization.colorRed, hueShift),
    colorGreen: rotateHue(visualization.colorGreen, hueShift),
    colorBlue: rotateHue(visualization.colorBlue, hueShift),
    // Keep background unchanged (or apply shift if desired)
    // colorBg: rotateHue(visualization.colorBg, hueShift),
  };
}
