import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';
import { visualPresets } from '../presets/tabPresets';

export function VisualizationOikosPanel() {
  const { parameters, updateVisualizationParams } = useSimulationStore();
  const { visualization } = parameters;

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>🎨 Visualisierung</h3>
      <p style={styles.subtitle}>Darstellungs-Parameter (keine Dynamik-Effekte)</p>

      {/* Visual Presets Section */}
      <div style={styles.presetSection}>
        <h4 style={styles.presetTitle}>🌈 Visuelle Welten - Lavalampen Power!</h4>
        <p style={styles.presetDescription}>
          Jedes Preset kombiniert Farben, Helligkeit, Blend Mode und Trail-Intensität für einen einzigartigen Look.
        </p>
        <div style={styles.presetGrid}>
          {visualPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => updateVisualizationParams(preset.params)}
              style={styles.presetButton}
              title={preset.description}
            >
              <span style={styles.presetIcon}>{preset.icon}</span>
              <span style={styles.presetName}>{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.divider} />

      {/* Blend Mode Section */}
      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>🎭 Blend Mode</h4>
        <p style={styles.sectionDescription}>
          Wie werden die drei Spezies-Farben gemischt? Additive = leuchtend (auto-normalisiert bei Überlappung), Average = weich ohne Übersättigung.
        </p>
        <div style={styles.blendModeGrid}>
          {[
            { mode: 'additive' as const, label: '✨ Additive', desc: 'Leuchtend, normalisiert bei Überlappung - ideal für hohe Brightness' },
            { mode: 'average' as const, label: '🎨 Average', desc: 'Weicher Mix, keine Übersättigung - perfekt für Separation' },
            { mode: 'multiply' as const, label: '🌓 Multiply', desc: 'Dunkler Mix, hoher Kontrast - für Stabilität' },
            { mode: 'screen' as const, label: '🌟 Screen', desc: 'Helle weiche Kombination - für organische Flows' },
          ].map((item) => (
            <button
              key={item.mode}
              onClick={() => updateVisualizationParams({ blendMode: item.mode })}
              style={{
                ...styles.blendModeButton,
                backgroundColor: visualization.blendMode === item.mode ? '#7d5dbd' : '#1a1a2d',
                borderColor: visualization.blendMode === item.mode ? '#9d7dd4' : '#2a2b3a',
              }}
              title={item.desc}
            >
              <span style={styles.blendModeLabel}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={styles.divider} />

      {/* Brightness and Trail Intensity */}
      <ParameterSlider
        label="✨ Brightness (Helligkeit)"
        value={visualization.brightness}
        min={0.5}
        max={5.0}
        step={0.1}
        onChange={(value) => updateVisualizationParams({ brightness: value })}
        description="Gesamthelligkeit der Darstellung - höher = leuchtender"
      />

      <ParameterSlider
        label="🌫️ Trail Intensity"
        value={visualization.trailIntensity}
        min={80}
        max={280}
        step={10}
        onChange={(value) => updateVisualizationParams({ trailIntensity: value })}
        description="Sichtbarkeitsschwelle für Trails - niedriger = mehr sichtbare Details"
      />

      <div style={styles.divider} />

      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          💡 <strong>Tipp:</strong> Kombiniere verschiedene Blend Modes mit unterschiedlicher Trail Intensity für beeindruckende Effekte!
          <br/>
          • <strong>Additive</strong> + niedrige Intensity = glasklare leuchtende Strukturen (verhindert Auto-Übersättigung bei Überlappung)
          <br/>
          • <strong>Average</strong> + hohe Brightness = satte Farben ohne Weiß-Werden
          <br/>
          • <strong>Multiply</strong> + hohe Intensity = weiche Farbverläufe mit Kontrast
          <br/>
          • <strong>Screen</strong> + mittlere Intensity = organische leuchtende Flows
        </p>
      </div>

      <div style={styles.colorSection}>
        <h4 style={styles.colorTitle}>🎨 Farbkanäle</h4>
        <p style={styles.colorSubtitle}>
          Die Farben der drei Spezies und des Hintergrunds. Diese Einstellung beeinflusst nur die visuelle Darstellung.
        </p>

        <div style={styles.colorGrid}>
          <div style={styles.colorCard}>
            <div style={styles.colorLabel}>🔴 Rot-Kanal</div>
            <div
              style={{
                ...styles.colorPreview,
                backgroundColor: `rgb(${visualization.colorRed.r}, ${visualization.colorRed.g}, ${visualization.colorRed.b})`,
              }}
            />
            <div style={styles.colorValues}>
              RGB({visualization.colorRed.r}, {visualization.colorRed.g}, {visualization.colorRed.b})
            </div>
          </div>

          <div style={styles.colorCard}>
            <div style={styles.colorLabel}>🟢 Grün-Kanal</div>
            <div
              style={{
                ...styles.colorPreview,
                backgroundColor: `rgb(${visualization.colorGreen.r}, ${visualization.colorGreen.g}, ${visualization.colorGreen.b})`,
              }}
            />
            <div style={styles.colorValues}>
              RGB({visualization.colorGreen.r}, {visualization.colorGreen.g}, {visualization.colorGreen.b})
            </div>
          </div>

          <div style={styles.colorCard}>
            <div style={styles.colorLabel}>🔵 Blau-Kanal</div>
            <div
              style={{
                ...styles.colorPreview,
                backgroundColor: `rgb(${visualization.colorBlue.r}, ${visualization.colorBlue.g}, ${visualization.colorBlue.b})`,
              }}
            />
            <div style={styles.colorValues}>
              RGB({visualization.colorBlue.r}, {visualization.colorBlue.g}, {visualization.colorBlue.b})
            </div>
          </div>

          <div style={styles.colorCard}>
            <div style={styles.colorLabel}>⬛ Hintergrund</div>
            <div
              style={{
                ...styles.colorPreview,
                backgroundColor: `rgb(${visualization.colorBg.r}, ${visualization.colorBg.g}, ${visualization.colorBg.b})`,
              }}
            />
            <div style={styles.colorValues}>
              RGB({visualization.colorBg.r}, {visualization.colorBg.g}, {visualization.colorBg.b})
            </div>
          </div>
        </div>
      </div>

      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          ℹ️ <strong>Hinweis:</strong> Diese Parameter ändern NUR die Darstellung,
          nicht die zugrundeliegende Dynamik des Systems!
        </p>
      </div>
    </div>
  );
}

const styles = {
  panel: {
    padding: '20px',
    backgroundColor: '#13141f',
    borderRadius: '8px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  title: {
    fontSize: '18px',
    color: '#e0e0e0',
    marginBottom: '4px',
    fontWeight: 600,
  } as React.CSSProperties,
  subtitle: {
    fontSize: '12px',
    color: '#a0a0b0',
    marginBottom: '20px',
  } as React.CSSProperties,
  presetSection: {
    marginBottom: '20px',
  } as React.CSSProperties,
  presetTitle: {
    fontSize: '15px',
    color: '#9d7dd4',
    marginBottom: '8px',
    fontWeight: 600,
  } as React.CSSProperties,
  presetDescription: {
    fontSize: '11px',
    color: '#7d7d8d',
    marginBottom: '12px',
    lineHeight: '1.4',
  } as React.CSSProperties,
  presetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
  } as React.CSSProperties,
  presetButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '10px 8px',
    backgroundColor: '#0a0a15',
    border: '1px solid #2a2b3a',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '11px',
    color: '#e0e0e0',
  } as React.CSSProperties,
  presetIcon: {
    fontSize: '20px',
    marginBottom: '4px',
  } as React.CSSProperties,
  presetName: {
    fontSize: '9px',
    textAlign: 'center',
    lineHeight: '1.2',
  } as React.CSSProperties,
  divider: {
    height: '1px',
    backgroundColor: '#2a2b3a',
    margin: '20px 0',
  } as React.CSSProperties,
  section: {
    marginBottom: '20px',
  } as React.CSSProperties,
  sectionTitle: {
    fontSize: '14px',
    color: '#e0e0e0',
    marginBottom: '6px',
    fontWeight: 600,
  } as React.CSSProperties,
  sectionDescription: {
    fontSize: '11px',
    color: '#7d7d8d',
    marginBottom: '12px',
    lineHeight: '1.3',
  } as React.CSSProperties,
  blendModeGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
  } as React.CSSProperties,
  blendModeButton: {
    padding: '12px',
    border: '2px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: 600,
    fontSize: '12px',
  } as React.CSSProperties,
  blendModeLabel: {
    display: 'block',
    textAlign: 'center',
    color: '#e0e0e0',
  } as React.CSSProperties,
  infoBox: {
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #3d2d5d',
    marginBottom: '20px',
  } as React.CSSProperties,
  infoText: {
    fontSize: '11px',
    color: '#a0a0b0',
    lineHeight: '1.6',
    margin: 0,
  } as React.CSSProperties,
  colorSection: {
    marginTop: '24px',
  } as React.CSSProperties,
  colorTitle: {
    fontSize: '16px',
    color: '#e0e0e0',
    marginBottom: '8px',
    fontWeight: 600,
  } as React.CSSProperties,
  colorSubtitle: {
    fontSize: '11px',
    color: '#6a6a7a',
    marginBottom: '16px',
    lineHeight: '1.4',
  } as React.CSSProperties,
  colorGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  } as React.CSSProperties,
  colorCard: {
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
  } as React.CSSProperties,
  colorLabel: {
    fontSize: '12px',
    color: '#e0e0e0',
    marginBottom: '8px',
    textAlign: 'center',
    fontWeight: 600,
  } as React.CSSProperties,
  colorPreview: {
    width: '100%',
    height: '40px',
    borderRadius: '4px',
    border: '1px solid #2a2b3a',
    marginBottom: '6px',
  } as React.CSSProperties,
  colorValues: {
    fontSize: '9px',
    color: '#6a6a7a',
    textAlign: 'center',
    fontFamily: 'monospace',
  } as React.CSSProperties,
};
