import type { AllParameters, Preset } from '../types/index.js';

/**
 * Exportiert Parameter als JSON-Datei zum Download
 */
export function exportPresetAsJSON(
  parameters: AllParameters,
  presetName: string = 'custom-preset'
): void {
  const preset: Preset = {
    name: presetName,
    icon: '💾',
    description: 'Custom saved preset',
    parameters,
  };

  const jsonString = JSON.stringify(preset, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${presetName.replace(/\s+/g, '-').toLowerCase()}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Importiert Parameter aus einer JSON-Datei
 */
export function importPresetFromJSON(
  file: File
): Promise<{ preset: Preset; error?: string }> {
  return new Promise((resolve) => {
    console.log('[PresetImport] Starting import of file:', file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        console.log('[PresetImport] File content loaded, length:', content?.length);

        const preset = JSON.parse(content) as Preset;
        console.log('[PresetImport] JSON parsed successfully:', {
          name: preset.name,
          hasParameters: !!preset.parameters,
        });

        // Validierung: Überprüfe ob die wichtigsten Felder vorhanden sind
        if (!preset.parameters) {
          console.error('[PresetImport] Validation failed: parameters missing');
          resolve({
            preset: preset,
            error: 'Ungültiges Preset-Format: "parameters" fehlt',
          });
          return;
        }

        // Weitere Validierung der Struktur
        const params = preset.parameters;
        console.log('[PresetImport] Checking parameter structure:', {
          hasUniversal: !!params.universal,
          hasVisualization: !!params.visualization,
        });

        if (!params.universal || !params.visualization) {
          console.error('[PresetImport] Validation failed: missing parameter groups');
          resolve({
            preset: preset,
            error: 'Ungültiges Preset-Format: Fehlende Parameter-Gruppen',
          });
          return;
        }

        console.log('[PresetImport] Validation successful, import complete');
        resolve({ preset });
      } catch (error) {
        console.error('[PresetImport] Parse error:', error);
        resolve({
          preset: { name: '', icon: '', description: '', parameters: {} as AllParameters },
          error: `Fehler beim Parsen der JSON-Datei: ${error}`,
        });
      }
    };

    reader.onerror = () => {
      console.error('[PresetImport] File read error');
      resolve({
        preset: { name: '', icon: '', description: '', parameters: {} as AllParameters },
        error: 'Fehler beim Lesen der Datei',
      });
    };

    reader.readAsText(file);
  });
}

/**
 * Exportiert mehrere Presets als JSON-Array
 */
export function exportPresetsAsJSON(presets: Preset[], filename: string = 'presets'): void {
  const jsonString = JSON.stringify(presets, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Kopiert Parameter als JSON in die Zwischenablage
 */
export async function copyPresetToClipboard(parameters: AllParameters): Promise<boolean> {
  try {
    const preset: Preset = {
      name: 'Clipboard Preset',
      icon: '📋',
      description: 'Preset from clipboard',
      parameters,
    };
    const jsonString = JSON.stringify(preset, null, 2);
    await navigator.clipboard.writeText(jsonString);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

/**
 * Importiert Parameter aus der Zwischenablage
 */
export async function pastePresetFromClipboard(): Promise<{
  preset: Preset | null;
  error?: string;
}> {
  try {
    const text = await navigator.clipboard.readText();
    const preset = JSON.parse(text) as Preset;

    // Validierung
    if (!preset.parameters) {
      return {
        preset: null,
        error: 'Ungültiges Preset-Format: "parameters" fehlt',
      };
    }

    return { preset };
  } catch (error) {
    return {
      preset: null,
      error: `Fehler beim Parsen der Zwischenablage: ${error}`,
    };
  }
}
