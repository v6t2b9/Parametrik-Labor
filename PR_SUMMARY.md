# Pull Request: Master Presets & Kaleidoscope Improvements

## Summary

This PR adds 8 stunning Master Presets that showcase the full potential of the app and fixes critical kaleidoscope rendering issues.

## 🌟 Master Presets - Complete Experiences

Added 8 carefully crafted presets that combine **ALL parameters** across physics, species, temporal, visuals, and effects:

1. **🌌 Cosmic Meditation** - Slow, hypnotic 8-way mandala with deep space colors
   - Now the default startup preset for impressive first impression
2. **🌈 Liquid Rainbow** - Fluid chaos with hue cycling and high diffusion
3. **🌀 Infinite Tunnel** - Recursive feedback zoom with radial blur
4. **💎 Crystal Palace** - 12-way mandala with mirror symmetry
5. **⚡ Electric Storm** - Chaotic lightning with chromatic aberration
6. **🌊 Deep Ocean** - Underwater fluid motion with deep blues
7. **🕉️ Sacred Geometry** - Recursive mandala with rotating kaleidoscope
8. **👾 Retro Arcade** - Pixelated scanlines with vibrant retro colors

### Technical Implementation
- New `src/presets/masterPresets.ts` with `MasterPreset` interface
- Each preset is a complete `AllParameters` object (not partial)
- New "🌟 Master Experiences" category in PresetGallery
- Exports integrated into `src/presets/index.ts`

## 🐛 Critical Bug Fixes

### 1. Circular Dependency (White Screen)
**Commit:** 3aafcfd

**Problem:** App showed white screen on startup with no error message
- `masterPresets.ts` imported `defaultPerformanceParams` from `index.ts`
- `index.ts` exported `masterPresets` from `masterPresets.ts`
- Build succeeded but runtime initialization failed

**Solution:** Define `defaultPerformanceParams` locally in `masterPresets.ts`

### 2. Kaleidoscope Geometry
**Commit:** 7af5273

**Problem:** Kaleidoscope rotated entire image, creating corner clipping artifacts
- Previous implementation showed full image for each segment
- Not true mandala/kaleidoscope geometry

**Solution:** Implement proper wedge clipping
- Use `ctx.arc()` to create triangular wedge clip paths
- Each segment shows only a pie-slice (segmentAngle/2)
- Vertical flip (scale 1, -1) for radial mirror symmetry
- Result: Clean star-shaped mandalas

### 3. Kaleidoscope Corner Coverage
**Commit:** 18a6727

**Problem:** Black corners remained in kaleidoscope mandalas
- Radius calculation used `max(width, height)`
- Only covered center circle, not diagonal corners

**Solution:** Use diagonal distance from center to corner
```javascript
const radius = Math.sqrt(centerX * centerX + centerY * centerY) * 1.5;
```
- Ensures wedges extend to all corners
- 1.5 multiplier provides safety margin

## 🎨 UI/UX Improvements

### Kaleidoscope Quick Presets
**Commit:** 94aa696

Added instant mandala effect buttons in Visuals tab:
- Off, 3△, 4✚, 6❄️, 8🔮, 12🕉️
- One-click activation of common kaleidoscope patterns

### Agent Visualization Improvements
**Commit:** 132a861

1. **Fixed agent mirroring** - Moved agent rendering to BEFORE Mirror/Kaleidoscope effects (line 527)
   - Agents now properly participate in symmetry effects
2. **Simplified UI** - Replaced "Lab Mode/Lavalamp Mode" toggle with simple "Show Agents" checkbox
3. **Better defaults** - Agents visible by default (`showAgents: true`)

### Non-functional Slider Cleanup
**Commit:** 4294166

- Removed Simple Bloom slider (replaced by Better Bloom)
- Removed Color LUT section (performance reasons)
- Removed Displacement sliders (performance reasons)
- Cleaner UI focused on functional effects

## 🌍 Internationalization

**Commit:** 4294166

All presets translated to English:
- Physics: Crystalline, Fluid, Gaseous, Sticky, Stable
- Species: Hunters, Gatherers, Scouts, Chaotic
- Temporal: Lightning, Marathon, Pulsating, Frozen, Mega-Dense

## ⚡ Performance Fixes

**Commit:** 4294166

Fixed FPS drops in Physics "Fluid" preset:
- Changed `diffusionFreq: 1` → `2`
- 50% reduction in diffusion calculations (every 2nd frame instead of every frame)

## 🔧 Bug Fixes

### TypeScript Build Error
**Commit:** 132a861

Fixed `TS1005: '=>' expected` in ParameterSlider.tsx:
- Changed inline parameter destructuring to explicit props parameter
- Extracted default values inside function body
- Resolves TypeScript parser confusion

### Missing Type Definitions
**Commit:** 132a861

Installed `@types/node` to resolve:
```
error TS2688: Cannot find type definition file for 'node'
```

## 📊 Files Changed

```
src/presets/masterPresets.ts          (NEW)  +891 lines
src/presets/index.ts                  (MOD)   +87/-90 lines
src/components/PresetGallery.tsx      (MOD)   +12/-2 lines
src/components/CanvasPanel.tsx        (MOD)   +41/-19 lines
src/components/VisualsOikosPanel.tsx  (MOD)   +15/-80 lines
src/components/ParameterSlider.tsx    (MOD)   +6/-4 lines
src/presets/tabPresets.ts             (MOD)   +30/-30 lines
CHANGELOG.md                          (MOD)   +40 lines
package.json                          (MOD)   +1 line
```

## 🎯 Testing

Tested scenarios:
- [x] App loads with Cosmic Meditation preset
- [x] All 8 Master Presets load correctly
- [x] Kaleidoscope creates full-screen star mandalas
- [x] No black corners in kaleidoscope mode
- [x] Agents mirror/kaleidoscope correctly
- [x] Quick preset buttons work
- [x] TypeScript builds without errors
- [x] No circular dependency errors

## 📸 Visual Examples

**Default Startup (Cosmic Meditation):**
- 8-way mandala in deep space colors (magenta, purple, pink)
- Slow, hypnotic agent movement
- Visible agents with gentle bloom effect

**Kaleidoscope Improvements:**
- Before: Corners clipped, black areas, rotated full images
- After: Full coverage, star-shaped geometry, proper wedge clipping

## 🚀 Deployment

Branch: `claude/fix-memory-leak-01KZ6pEQqKGvYEY66HiLcXfU`

Commits:
- df06694: Update CHANGELOG
- 18a6727: Fix kaleidoscope corners
- 7af5273: Fix kaleidoscope geometry + default preset
- 3aafcfd: Fix circular dependency
- 2cf3507: Add Master Presets
- 94aa696: Add kaleidoscope quick buttons
- 4294166: Cleanup & internationalization
- 132a861: Fix critical bugs

**Total:** 8 commits, production-ready

---

## Reviewer Notes

**Priority:** High - Fixes critical white screen bug

**Breaking Changes:** None
- Default preset changed but doesn't affect saved user presets
- All existing presets remain functional

**Performance Impact:** Neutral
- Kaleidoscope clipping is same complexity as before
- Master Presets don't change runtime performance

**User Experience:** Significantly improved
- Beautiful default startup experience
- Kaleidoscope works correctly
- Cleaner UI with removed non-functional controls
