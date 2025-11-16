import { useState, useEffect } from 'react';
import type { RGBColor } from '../types';

interface ColorPickerProps {
  label: string;
  color: RGBColor;
  onChange: (color: RGBColor) => void;
}

// Helper: RGB to Hex
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

// Helper: Hex to RGB
function hexToRgb(hex: string): RGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function ColorPicker({ label, color, onChange }: ColorPickerProps) {
  const [hexValue, setHexValue] = useState(rgbToHex(color.r, color.g, color.b));

  // Update hex when RGB changes externally
  useEffect(() => {
    setHexValue(rgbToHex(color.r, color.g, color.b));
  }, [color.r, color.g, color.b]);

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: number) => {
    const newColor = { ...color, [channel]: value };
    onChange(newColor);
  };

  const handleHexChange = (value: string) => {
    setHexValue(value);

    // Only update RGB if valid hex
    if (value.match(/^#[0-9A-Fa-f]{6}$/)) {
      const rgb = hexToRgb(value);
      if (rgb) {
        onChange(rgb);
      }
    }
  };

  const handleHexBlur = () => {
    // On blur, ensure hex matches current RGB
    setHexValue(rgbToHex(color.r, color.g, color.b));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <label style={styles.label}>{label}</label>
        <div
          style={{
            ...styles.colorPreview,
            backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
          }}
        />
      </div>

      {/* Hex Input */}
      <div style={styles.hexContainer}>
        <label style={styles.hexLabel}>Hex</label>
        <input
          type="text"
          value={hexValue}
          onChange={(e) => handleHexChange(e.target.value)}
          onBlur={handleHexBlur}
          style={styles.hexInput}
          placeholder="#RRGGBB"
          maxLength={7}
        />
      </div>

      {/* RGB Sliders */}
      <div style={styles.slidersContainer}>
        {/* Red Slider */}
        <div style={styles.sliderRow}>
          <label style={styles.sliderLabel}>R</label>
          <input
            type="range"
            min={0}
            max={255}
            step={1}
            value={color.r}
            onChange={(e) => handleRgbChange('r', parseInt(e.target.value))}
            style={{
              ...styles.slider,
              background: `linear-gradient(to right,
                rgb(0, ${color.g}, ${color.b}) 0%,
                rgb(255, ${color.g}, ${color.b}) 100%)`,
            }}
          />
          <span style={styles.sliderValue}>{Math.round(color.r)}</span>
        </div>

        {/* Green Slider */}
        <div style={styles.sliderRow}>
          <label style={styles.sliderLabel}>G</label>
          <input
            type="range"
            min={0}
            max={255}
            step={1}
            value={color.g}
            onChange={(e) => handleRgbChange('g', parseInt(e.target.value))}
            style={{
              ...styles.slider,
              background: `linear-gradient(to right,
                rgb(${color.r}, 0, ${color.b}) 0%,
                rgb(${color.r}, 255, ${color.b}) 100%)`,
            }}
          />
          <span style={styles.sliderValue}>{Math.round(color.g)}</span>
        </div>

        {/* Blue Slider */}
        <div style={styles.sliderRow}>
          <label style={styles.sliderLabel}>B</label>
          <input
            type="range"
            min={0}
            max={255}
            step={1}
            value={color.b}
            onChange={(e) => handleRgbChange('b', parseInt(e.target.value))}
            style={{
              ...styles.slider,
              background: `linear-gradient(to right,
                rgb(${color.r}, ${color.g}, 0) 0%,
                rgb(${color.r}, ${color.g}, 255) 100%)`,
            }}
          />
          <span style={styles.sliderValue}>{Math.round(color.b)}</span>
        </div>
      </div>

      {/* RGB Display */}
      <div style={styles.rgbDisplay}>
        RGB({Math.round(color.r)}, {Math.round(color.g)}, {Math.round(color.b)})
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  } as React.CSSProperties,
  label: {
    fontSize: '13px',
    color: '#e0e0e0',
    fontWeight: 600,
  } as React.CSSProperties,
  colorPreview: {
    width: '40px',
    height: '24px',
    borderRadius: '4px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  hexContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  } as React.CSSProperties,
  hexLabel: {
    fontSize: '12px',
    color: '#a0a0b0',
    width: '30px',
  } as React.CSSProperties,
  hexInput: {
    flex: 1,
    padding: '6px 8px',
    backgroundColor: '#13141f',
    color: '#e0e0e0',
    border: '1px solid #2a2b3a',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
    outline: 'none',
  } as React.CSSProperties,
  slidersContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '8px',
  } as React.CSSProperties,
  sliderRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  } as React.CSSProperties,
  sliderLabel: {
    fontSize: '11px',
    color: '#a0a0b0',
    width: '15px',
    fontWeight: 600,
  } as React.CSSProperties,
  slider: {
    flex: 1,
    height: '6px',
    borderRadius: '3px',
    outline: 'none',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
  } as React.CSSProperties,
  sliderValue: {
    fontSize: '11px',
    color: '#7d5dbd',
    fontFamily: 'monospace',
    width: '28px',
    textAlign: 'right',
  } as React.CSSProperties,
  rgbDisplay: {
    fontSize: '10px',
    color: '#6a6a7a',
    textAlign: 'center',
    fontFamily: 'monospace',
  } as React.CSSProperties,
};
