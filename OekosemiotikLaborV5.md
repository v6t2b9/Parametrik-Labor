```jsx:

// Importieren Sie notwendige Funktionen von React
const { useState, useEffect, useRef, useCallback } = React;

const OekosemiotikLaborV5 = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // === STEUERUNG & GLOBALE ZUSTÄNDE ===
  const [isRunning, setIsRunning] = useState(true);
  const [activeTab, setActiveTab] = useState('presets');
  const [speed, setSpeed] = useState(1); // Wie viele Simulationsschritte pro Frame

  // === SEMIOSIS PARAMETER (Zeichenprozesse) ===
  const [signProduction, setSignProduction] = useState(15);      // Deposit-Rate
  const [signPersistence, setSignPersistence] = useState(0.96);    // Decay-Rate
  const [signDiffusion, setSignDiffusion] = useState(3);         // Diffusions-Frequenz
  const [perceptionRange, setPerceptionRange] = useState(20);      // Sensor-Distanz
  const [perceptionAngle, setPerceptionAngle] = useState(0.45);    // Sensor-Winkel
  const [interpretationBias, setInterpretationBias] = useState(0.5); // Interpretations-Tendenz

  // === OIKOS PARAMETER (Umwelt) ===
  const [viscosity, setViscosity] = useState(0.15);              // Fade-Strength
  const [temperature, setTemperature] = useState(1.5);           // Agenten-Geschwindigkeit
  const [saturation, setSaturation] = useState(255);             // Maximale Zeichendichte
  const [rhythmicity, setRhythmicity] = useState(0);             // Chaos-Intervall
  const [rhythmAmplitude, setRhythmAmplitude] = useState(0.5);   // Chaos-Stärke
  const [populationDensity, setPopulationDensity] = useState(3000);// Agenten-Anzahl
  const [socialAttraction, setSocialAttraction] = useState(0.7); // Anziehung gleicher Zeichen
  const [socialRepulsion, setSocialRepulsion] = useState(-0.3);  // Abstoßung fremder Zeichen

  // === EMERGENZ PARAMETER (Selbstorganisation) ===
  const [adaptivity, setAdaptivity] = useState(0.3);             // Turn-Speed
  // Loop-Kollaps ersetzt das alte 'memoryDepth' und 'temporalHorizon' durch eine performantere, signalbasierte Methode
  const [loopThreshold, setLoopThreshold] = useState(150);      // Schwellenwert für Signaldichte
  const [loopCollapse, setLoopCollapse] = useState(0.15);        // Stärke des Loop-Kollaps

  // === VISUALISIERUNG ===
  const [brightness, setBrightness] = useState(2.5);
  const [colorRed, setColorRed] = useState({ r: 220, g: 50, b: 50 });
  const [colorGreen, setColorGreen] = useState({ r: 50, g: 220, b: 80 });
  const [colorBlue, setColorBlue] = useState({ r: 50, g: 100, b: 220 });
  const [colorBg, setColorBg] = useState({ r: 5, g: 5, b: 10 });
  
  const WIDTH = 800;
  const HEIGHT = 800;
  const GRID_SIZE = 400;
  const SCALE = WIDTH / GRID_SIZE;

  // === PRESETS ===
  const applyPreset = (preset) => {
    // Semiosis
    setSignProduction(preset.signProduction);
    setSignPersistence(preset.signPersistence);
    setSignDiffusion(preset.signDiffusion);
    setPerceptionRange(preset.perceptionRange);
    setPerceptionAngle(preset.perceptionAngle);
    setInterpretationBias(preset.interpretationBias);
    // Oikos
    setViscosity(preset.viscosity);
    setTemperature(preset.temperature);
    setSaturation(preset.saturation);
    setRhythmicity(preset.rhythmicity);
    setRhythmAmplitude(preset.rhythmAmplitude);
    setPopulationDensity(preset.populationDensity);
    setSocialAttraction(preset.socialAttraction);
    setSocialRepulsion(preset.socialRepulsion);
    // Emergenz
    setAdaptivity(preset.adaptivity);
    setLoopThreshold(preset.loopThreshold);
    setLoopCollapse(preset.loopCollapse);
    // Reset simulation
    handleReset();
  };

  const presets = {
    'Koordinative Emergenz 🌐': { signProduction: 20, signPersistence: 0.97, signDiffusion: 4, perceptionRange: 25, perceptionAngle: 0.4, interpretationBias: 0.6, viscosity: 0.1, temperature: 1.2, saturation: 255, rhythmicity: 0, rhythmAmplitude: 0, populationDensity: 2500, socialAttraction: 0.8, socialRepulsion: -0.2, adaptivity: 0.35, loopThreshold: 160, loopCollapse: 0.1 },
    'Parametrische Selbstorganisation 🔄': { signProduction: 15, signPersistence: 0.95, signDiffusion: 5, perceptionRange: 30, perceptionAngle: 0.5, interpretationBias: 0.5, viscosity: 0.2, temperature: 1.5, saturation: 200, rhythmicity: 200, rhythmAmplitude: 0.4, populationDensity: 3000, socialAttraction: 0.6, socialRepulsion: -0.4, adaptivity: 0.4, loopThreshold: 140, loopCollapse: 0.2 },
    'Semiotische Resonanz 🎵': { signProduction: 25, signPersistence: 0.98, signDiffusion: 2, perceptionRange: 20, perceptionAngle: 0.3, interpretationBias: 0.7, viscosity: 0.05, temperature: 0.8, saturation: 255, rhythmicity: 100, rhythmAmplitude: 0.2, populationDensity: 4000, socialAttraction: 0.9, socialRepulsion: -0.1, adaptivity: 0.25, loopThreshold: 180, loopCollapse: 0.05 },
    'Adaptive Störung 🌀': { signProduction: 10, signPersistence: 0.92, signDiffusion: 8, perceptionRange: 15, perceptionAngle: 0.8, interpretationBias: 0.3, viscosity: 0.3, temperature: 2.5, saturation: 180, rhythmicity: 50, rhythmAmplitude: 0.8, populationDensity: 5000, socialAttraction: 0.4, socialRepulsion: -0.6, adaptivity: 0.6, loopThreshold: 120, loopCollapse: 0.3 },
  };
  
  // === SIMULATION ENGINE ===
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const trails = {
        red: new Float32Array(GRID_SIZE * GRID_SIZE),
        green: new Float32Array(GRID_SIZE * GRID_SIZE),
        blue: new Float32Array(GRID_SIZE * GRID_SIZE),
    };
    const tempTrails = {
        red: new Float32Array(GRID_SIZE * GRID_SIZE),
        green: new Float32Array(GRID_SIZE * GRID_SIZE),
        blue: new Float32Array(GRID_SIZE * GRID_SIZE),
    };

    class Agent {
        constructor(x, y, angle, type) {
            this.x = x;
            this.y = y;
            this.angle = angle;
            this.type = type; // 'red', 'green', 'blue'
            this.rhythmPhase = Math.random();
        }

        sense(offsetAngle) {
            const senseAngle = this.angle + offsetAngle;
            const sx = Math.floor(this.x + Math.cos(senseAngle) * perceptionRange);
            const sy = Math.floor(this.y + Math.sin(senseAngle) * perceptionRange);
            
            if (sx < 0 || sx >= GRID_SIZE || sy < 0 || sy >= GRID_SIZE) return 0;
            const idx = sy * GRID_SIZE + sx;
            
            let selfSignal = trails[this.type][idx] * socialAttraction;
            let otherSignal = 0;
            if(this.type === 'red') otherSignal = (trails.green[idx] + trails.blue[idx]) * socialRepulsion;
            if(this.type === 'green') otherSignal = (trails.red[idx] + trails.blue[idx]) * socialRepulsion;
            if(this.type === 'blue') otherSignal = (trails.red[idx] + trails.green[idx]) * socialRepulsion;

            let totalSignal = selfSignal + otherSignal;
            
            // Interpretation Bias
            if (totalSignal > 1) {
              if (interpretationBias > 0.5) totalSignal = Math.pow(totalSignal, 1 + (interpretationBias - 0.5) * 2);
              else totalSignal = Math.pow(totalSignal, 1 - (0.5 - interpretationBias));
            }

            return totalSignal;
        }

        update(currentFrame) {
            // OIKOS: Rhythmicity
            if (rhythmicity > 0 && (currentFrame + this.rhythmPhase * rhythmicity) % rhythmicity < 1) {
                this.angle += (Math.random() - 0.5) * Math.PI * rhythmAmplitude;
            }

            // SEMIOSIS: Perception
            const forward = this.sense(0);
            const left = this.sense(perceptionAngle);
            const right = this.sense(-perceptionAngle);
            
            // EMERGENZ: Steering & Adaptivity
            if (forward > left && forward > right) { /* move forward */ }
            else if (left > right) { this.angle += adaptivity; }
            else if (right > left) { this.angle -= adaptivity; }
            else { this.angle += (Math.random() - 0.5) * adaptivity * 2; }
            
            // OIKOS: Movement & Temperature
            this.x = (this.x + Math.cos(this.angle) * temperature + GRID_SIZE) % GRID_SIZE;
            this.y = (this.y + Math.sin(this.angle) * temperature + GRID_SIZE) % GRID_SIZE;
            
            // SEMIOSIS: Sign Production
            const ix = Math.floor(this.x);
            const iy = Math.floor(this.y);
            const idx = iy * GRID_SIZE + ix;
            trails[this.type][idx] = Math.min(saturation, trails[this.type][idx] + signProduction);
        }
    }

    const agents = [];
    const types = ['red', 'green', 'blue'];
    for(let i = 0; i < populationDensity; i++) {
        agents.push(new Agent(
            Math.random() * GRID_SIZE,
            Math.random() * GRID_SIZE,
            Math.random() * Math.PI * 2,
            types[i % types.length]
        ));
    }

    const diffuseAndDecay = () => {
        for (let y = 1; y < GRID_SIZE - 1; y++) {
            for (let x = 1; x < GRID_SIZE - 1; x++) {
                const idx = y * GRID_SIZE + x;
                for(const type of types) {
                    const density = trails[type][idx];
                    // EMERGENZ: Loop Collapse
                    const decayBoost = density > loopThreshold ? (1 - loopCollapse * ((density - loopThreshold) / loopThreshold)) : 1;
                    
                    let sum = 0;
                    sum += trails[type][(y - 1) * GRID_SIZE + x];
                    sum += trails[type][(y + 1) * GRID_SIZE + x];
                    sum += trails[type][y * GRID_SIZE + (x - 1)];
                    sum += trails[type][y * GRID_SIZE + (x + 1)];
                    sum += trails[type][idx];
                    
                    tempTrails[type][idx] = (sum / 5) * signPersistence * decayBoost;
                }
            }
        }
        for(const type of types) {
             trails[type].set(tempTrails[type]);
        }
    };
    
    const render = () => {
        ctx.fillStyle = `rgba(${colorBg.r}, ${colorBg.g}, ${colorBg.b}, ${viscosity})`;
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        const imageData = ctx.createImageData(WIDTH, HEIGHT);
        const data = imageData.data;

        for (let y = 0; y < HEIGHT; y++) {
            for (let x = 0; x < WIDTH; x++) {
                const gridX = Math.floor(x / SCALE);
                const gridY = Math.floor(y / SCALE);
                const trailIdx = gridY * GRID_SIZE + gridX;
                const pixelIdx = (y * WIDTH + x) * 4;

                const r = trails.red[trailIdx] * brightness;
                const g = trails.green[trailIdx] * brightness;
                const b = trails.blue[trailIdx] * brightness;

                data[pixelIdx]     = colorBg.r + colorRed.r * r/255 + colorGreen.r * g/255 + colorBlue.r * b/255;
                data[pixelIdx + 1] = colorBg.g + colorRed.g * r/255 + colorGreen.g * g/255 + colorBlue.g * b/255;
                data[pixelIdx + 2] = colorBg.b + colorRed.b * r/255 + colorGreen.b * g/255 + colorBlue.b * b/255;
                data[pixelIdx + 3] = 255;
            }
        }
        ctx.putImageData(imageData, 0, 0);
    };

    let frameCount = 0;
    const animate = () => {
        if (isRunning) {
            for (let s = 0; s < speed; s++) {
                agents.forEach(agent => agent.update(frameCount));
                if (frameCount % signDiffusion === 0) {
                    diffuseAndDecay();
                }
                frameCount++;
            }
            render();
        }
        animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    return () => { cancelAnimationFrame(animationRef.current); };
  }, [
    isRunning, speed, signProduction, signPersistence, signDiffusion, perceptionRange,
    perceptionAngle, interpretationBias, viscosity, temperature, saturation, rhythmicity,
    rhythmAmplitude, populationDensity, socialAttraction, socialRepulsion, adaptivity,
    loopThreshold, loopCollapse, brightness, colorRed, colorGreen, colorBlue, colorBg
  ]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeout(() => setIsRunning(true), 50);
  };
  
  const tabs = [
    { id: 'theory', label: '📚 Theorie' },
    { id: 'presets', label: '🎯 Presets' },
    { id: 'semiosis', label: '🔣 Semiosis' },
    { id: 'oikos', label: '🌍 Oikos' },
    { id: 'emergenz', label: '✨ Emergenz' },
    { id: 'visual', label: '🎨 Visual' },
  ];
  
  // RENDER UI
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#0a0a15', fontFamily: 'system-ui, sans-serif', color: '#e0e0e0' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '16px', backgroundColor: '#0a0a15' }}>
            <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} style={{ width: '100%', maxWidth: '600px', aspectRatio: '1', borderRadius: '8px', border: '1px solid #2a2b3a' }} />
        </div>
        <div style={{ backgroundColor: '#13141f', borderTop: '1px solid #2a2b3a' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #2a2b3a' }}>
                <h1 style={{ fontSize: '1.2rem', margin: 0 }}>Ökosemiotik Labor v5</h1>
                <p style={{ fontSize: '0.8rem', margin: '4px 0 0 0', color: '#a0a0b0' }}>Zeichen × Umwelt × Emergenz</p>
            </div>
            <div style={{ padding: '16px', display: 'flex', gap: '8px', borderBottom: '1px solid #2a2b3a' }}>
                <button onClick={() => setIsRunning(!isRunning)} style={{ flex: 1, padding: '12px', backgroundColor: isRunning ? '#7d5dbd' : '#3d2d5d', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{isRunning ? 'Pause' : 'Start'}</button>
                <button onClick={handleReset} style={{ padding: '12px 16px', backgroundColor: '#1a1a2d', color: '#b8a0d4', border: '1px solid #3d2d5d', borderRadius: '8px', cursor: 'pointer' }}>Reset</button>
            </div>
            <div style={{ display: 'flex', overflowX: 'auto', gap: '4px', padding: '8px 16px', borderBottom: '1px solid #2a2b3a', backgroundColor: '#1a1a2d' }}>
                {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 12px', backgroundColor: activeTab === tab.id ? '#7d5dbd' : 'transparent', color: activeTab === tab.id ? '#fff' : '#a0a0b0', border: 'none', borderRadius: '6px', cursor: 'pointer', whiteSpace: 'nowrap' }}>{tab.label}</button>)}
            </div>
            <div style={{ padding: '16px', maxHeight: '400px', overflowY: 'auto' }}>
              {/* --- TAB CONTENT --- */}
              {activeTab === 'theory' && <div>... (Theorie-Text hier einfügen) ...</div>}
              {activeTab === 'presets' && <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>{Object.entries(presets).map(([name, preset]) => <button key={name} onClick={() => applyPreset(preset)} style={{ padding: '12px', backgroundColor: '#1a1a2d', color: '#e0e0e0', border: '1px solid #2a2b3a', borderRadius: '8px', cursor: 'pointer', textAlign: 'left' }}>{name}</button>)}</div>}
              
              {/* Parameter Slider werden hier gerendert */}
              {[['semiosis', [
                  { label: 'Zeichenproduktion', value: signProduction, setter: setSignProduction, min: 1, max: 50 },
                  { label: 'Zeichenpersistenz', value: signPersistence, setter: setSignPersistence, min: 0.8, max: 0.99, step: 0.01 },
                  { label: 'Zeichendiffusion', value: signDiffusion, setter: setSignDiffusion, min: 1, max: 10 },
                  { label: 'Wahrnehmungsreichweite', value: perceptionRange, setter: setPerceptionRange, min: 5, max: 50 },
                  { label: 'Wahrnehmungswinkel', value: perceptionAngle, setter: setPerceptionAngle, min: 0.1, max: 1.5, step: 0.05 },
                  { label: 'Interpretations-Bias', value: interpretationBias, setter: setInterpretationBias, min: 0, max: 1, step: 0.1 },
                ]],
                ['oikos', [
                  { label: 'Viskosität', value: viscosity, setter: setViscosity, min: 0.01, max: 0.5, step: 0.01 },
                  { label: 'Temperatur (Geschw.)', value: temperature, setter: setTemperature, min: 0.1, max: 3, step: 0.1 },
                  { label: 'Sättigung', value: saturation, setter: setSaturation, min: 100, max: 255 },
                  { label: 'Rhythmizität', value: rhythmicity, setter: setRhythmicity, min: 0, max: 500, step: 25 },
                  { label: 'Rhythmus-Amplitude', value: rhythmAmplitude, setter: setRhythmAmplitude, min: 0, max: 1, step: 0.1 },
                  { label: 'Populationsdichte', value: populationDensity, setter: setPopulationDensity, min: 100, max: 10000, step: 100 },
                  { label: 'Soziale Anziehung', value: socialAttraction, setter: setSocialAttraction, min: -1, max: 2, step: 0.1 },
                  { label: 'Soziale Abstoßung', value: socialRepulsion, setter: setSocialRepulsion, min: -2, max: 1, step: 0.1 },
                ]],
                ['emergenz', [
                  { label: 'Adaptivität (Wendigkeit)', value: adaptivity, setter: setAdaptivity, min: 0.1, max: 1, step: 0.05 },
                  { label: 'Loop-Schwelle (Dichte)', value: loopThreshold, setter: setLoopThreshold, min: 80, max: 250, step: 10 },
                  { label: 'Loop-Kollaps-Stärke', value: loopCollapse, setter: setLoopCollapse, min: 0.05, max: 0.35, step: 0.05 },
                ]],
                ['visual', [
                  { label: 'Helligkeit', value: brightness, setter: setBrightness, min: 0.5, max: 5, step: 0.1 },
                  // Hier könnten Farbwähler für die drei Farben und den Hintergrund hinzugefügt werden
                ]]
              ].find(([tabId]) => tabId === activeTab)?.[1].map(param => (
                  <div key={param.label} style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#a0a0b0', marginBottom: '6px' }}>
                          <span>{param.label}</span>
                          <span style={{ color: '#9d7dd4', fontWeight: '600' }}>{Number(param.value).toFixed(2)}</span>
                      </label>
                      <input type="range" {...param} onChange={(e) => param.setter(Number(e.target.value))} style={{ width: '100%', accentColor: '#7d5dbd', height: '6px' }} />
                  </div>
              ))}
            </div>
        </div>
    </div>
  );
};

<OekosemiotikLaborV5 />
```OekosemiotikLaborV5
