---
id: component-webgl-renderer
title: WebGL Renderer
type: component
category: rendering
status: active
location: src/rendering/
created: 2025-11-20
updated: 2025-11-20
tags: [component, webgl, rendering, shaders]
related:
  - "[[trail-system]]"
  - "[[react-components]]"
sources:
  - "[[../../development/ARCHITECTURE.md]]"
---

## Definition

**WebGL Renderer** visualisiert die Trail-Map mittels Hardware-beschleunigtem WebGL-Rendering mit Shadern für Bloom, Glow, und Farb-Effekte.

## Rendering-Pipeline

```yaml
1. Trail-Map Upload
   - Float32Array → WebGL Texture (GPU)
   
2. Fragment Shader
   - Liest Trail-Intensität
   - Mapped zu Farbe (RGB für Multi-Spezies)
   - Brightness/Contrast/Glow-Modulation
   
3. Post-Processing (Optional)
   - Bloom-Effekt (Gaussian Blur + Additive Blend)
   - Color Grading
   
4. Canvas Output
   - Final Frame → HTML Canvas Element
```

## Shader-Parameter

```yaml
Visuals Oikos (von Zustand Store):
  - brightness: Multiplikator für Intensität
  - glowIntensity: Bloom-Stärke
  - contrast: Kontrast-Kurve
  
Performance-abhängig:
  - Canvas Resolution (z.B. 800×800, 1920×1080)
  - Bloom Quality (On/Off)
```

## Multi-Spezies-Rendering

```yaml
MYZEL Mode:
  - Single Color (z.B. Grün)
  - trailMap → Green Channel
  
STIGMERGIE / RESONANZ Mode:
  - 3 Farben: R, G, B (3 Spezies)
  - trailMapR → Red Channel
  - trailMapG → Green Channel
  - trailMapB → Blue Channel
  - Composited final image
```

## Performance

```yaml
Optimization:
  - WebGL nutzt GPU (100× schneller als Canvas 2D)
  - Trail-Map als Texture (kein CPU→GPU Transfer pro Pixel)
  - Shader-basierte Effekte (parallelisiert auf GPU)

Bottleneck:
  - Hohe Agent Counts (>10000): CPU-bound (Agent-Update)
  - Hohe Canvas Resolution (>1920×1080): GPU-bound (Pixel-Shading)

Siehe: [[../metrics/ridge-point-analysis.md]] für Performance-Messungen
```

## Verwandte Komponenten

- [[trail-system]] - Liefert Trail-Map Daten
- [[react-components]] - Canvas-Panel hostet WebGL Canvas

## Verwandte Konzepte

- [[../properties/crystallinity.md]] - Visuelle Kristallinität durch Rendering sichtbar
- [[../properties/density.md]] - Hotspots als helle Regions visualisiert
