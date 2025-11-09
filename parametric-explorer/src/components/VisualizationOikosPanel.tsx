import { useSimulationStore } from '../store/useSimulationStore';
import { ParameterSlider } from './ParameterSlider';

export function VisualizationOikosPanel() {
  const { parameters, updateVisualizationParams } = useSimulationStore();
  const { visualization } = parameters;

  return (
    <div style={styles.panel}>
      <h3 style={styles.title}>🎨 Visualisierung</h3>
      <p style={styles.subtitle}>Darstellungs-Parameter (keine Dynamik-Effekte)</p>

      <ParameterSlider
        label="Brightness (Helligkeit)"
        value={visualization.brightness}
        min={0.5}
        max={5.0}
        step={0.1}
        onChange={(value) => updateVisualizationParams({ brightness: value })}
        description="Gesamthelligkeit der Darstellung"
      />

      <div style={styles.infoBox}>
        <p style={styles.infoText}>
          ℹ️ <strong>Hinweis:</strong> Diese Parameter ändern NUR die Darstellung,
          nicht die zugrundeliegende Dynamik des Systems!
        </p>
      </div>

      <div style={styles.colorSection}>
        <h4 style={styles.colorTitle}>Farbkanäle</h4>
        <p style={styles.colorSubtitle}>
          Die Farben der drei Spezies (rot, grün, blau) können hier angepasst werden.
          Diese Einstellung beeinflusst nur die visuelle Darstellung.
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
          </div>

          <div style={styles.colorCard}>
            <div style={styles.colorLabel}>🟢 Grün-Kanal</div>
            <div
              style={{
                ...styles.colorPreview,
                backgroundColor: `rgb(${visualization.colorGreen.r}, ${visualization.colorGreen.g}, ${visualization.colorGreen.b})`,
              }}
            />
          </div>

          <div style={styles.colorCard}>
            <div style={styles.colorLabel}>🔵 Blau-Kanal</div>
            <div
              style={{
                ...styles.colorPreview,
                backgroundColor: `rgb(${visualization.colorBlue.r}, ${visualization.colorBlue.g}, ${visualization.colorBlue.b})`,
              }}
            />
          </div>
        </div>
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
  infoBox: {
    padding: '12px',
    backgroundColor: '#0a0a15',
    borderRadius: '6px',
    border: '1px solid #2a2b3a',
    marginTop: '20px',
    marginBottom: '20px',
  } as React.CSSProperties,
  infoText: {
    fontSize: '12px',
    color: '#a0a0b0',
    lineHeight: '1.5',
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
    gridTemplateColumns: 'repeat(3, 1fr)',
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
  } as React.CSSProperties,
};
