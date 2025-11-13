/**
 * Complex number utilities for quantum-inspired stigmergy (M3 model)
 * Based on Supplement B: Computational Model Protocol
 */

import type { ComplexNumber, QuantumAmplitudes } from '../types/index.js';

/**
 * Create a complex number
 */
export function complex(re: number, im: number = 0): ComplexNumber {
  return { re, im };
}

/**
 * Complex multiplication: (a+bi)*(c+di) = (ac-bd) + (ad+bc)i
 */
export function cmul(z1: ComplexNumber, z2: ComplexNumber): ComplexNumber {
  return {
    re: z1.re * z2.re - z1.im * z2.im,
    im: z1.re * z2.im + z1.im * z2.re,
  };
}

/**
 * Complex addition: (a+bi) + (c+di) = (a+c) + (b+d)i
 */
export function cadd(z1: ComplexNumber, z2: ComplexNumber): ComplexNumber {
  return {
    re: z1.re + z2.re,
    im: z1.im + z2.im,
  };
}

/**
 * Complex scalar multiplication: k * (a+bi) = (ka) + (kbi)
 */
export function cscale(z: ComplexNumber, k: number): ComplexNumber {
  return {
    re: z.re * k,
    im: z.im * k,
  };
}

/**
 * Complex magnitude squared: |a+bi|² = a² + b²
 */
export function cabs2(z: ComplexNumber): number {
  return z.re * z.re + z.im * z.im;
}

/**
 * Complex magnitude: |a+bi| = sqrt(a² + b²)
 */
export function cabs(z: ComplexNumber): number {
  return Math.sqrt(cabs2(z));
}

/**
 * Complex exponential: exp(iφ) = cos(φ) + i*sin(φ)
 */
export function cexp(phase: number): ComplexNumber {
  return {
    re: Math.cos(phase),
    im: Math.sin(phase),
  };
}

/**
 * Normalize quantum amplitudes to unit magnitude
 * After normalization: |α_left|² + |α_forward|² + |α_right|² = 1
 */
export function normalizeAmplitudes(ψ: QuantumAmplitudes): QuantumAmplitudes {
  const norm = Math.sqrt(
    cabs2(ψ.left) + cabs2(ψ.forward) + cabs2(ψ.right)
  );

  // Avoid division by zero
  if (norm < 1e-10) {
    // Reset to equal superposition
    const val = 1 / Math.sqrt(3);
    return {
      left: complex(val, 0),
      forward: complex(val, 0),
      right: complex(val, 0),
    };
  }

  return {
    left: cscale(ψ.left, 1 / norm),
    forward: cscale(ψ.forward, 1 / norm),
    right: cscale(ψ.right, 1 / norm),
  };
}

/**
 * Initialize quantum amplitudes to equal superposition
 * Each direction has 1/√3 probability amplitude
 */
export function initializeQuantumState(): QuantumAmplitudes {
  const val = 1 / Math.sqrt(3); // 1/√3
  return {
    left: complex(val, 0),
    forward: complex(val, 0),
    right: complex(val, 0),
  };
}

/**
 * Measure quantum state (collapse to classical choice)
 * Uses Born rule: P(direction) = |amplitude|²
 * Returns: 'left', 'forward', or 'right'
 */
export function measureDirection(ψ: QuantumAmplitudes): 'left' | 'forward' | 'right' {
  const P_left = cabs2(ψ.left);
  const P_forward = cabs2(ψ.forward);
  const P_right = cabs2(ψ.right);

  // Sample from probability distribution
  const rand = Math.random();

  if (rand < P_left) {
    return 'left';
  } else if (rand < P_left + P_forward) {
    return 'forward';
  } else {
    return 'right';
  }
}

/**
 * Calculate effective pheromone strength with phase dependency
 * For M3: effectiveStrength = magnitude * cos(phase)
 *
 * When phase ≈ 0: cos(0) = +1 → attractive (fresh trail)
 * When phase ≈ π: cos(π) = -1 → repulsive (stale trail)
 * When phase ≈ π/2: cos(π/2) = 0 → neutral
 */
export function effectiveStrengthWithPhase(magnitude: number, phase: number): number {
  return magnitude * Math.cos(phase);
}
