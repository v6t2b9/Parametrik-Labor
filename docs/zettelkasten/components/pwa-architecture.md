---
id: component-pwa-architecture
title: PWA Architecture
type: component
category: infrastructure
status: active
created: 2025-11-20
updated: 2025-11-20
tags: [component, pwa, service-worker, offline]
related:
  - "[[react-components]]"
sources:
  - "[[../../development/ARCHITECTURE.md]]"
---

## Definition

**PWA Architecture** ermöglicht Progressive Web App Funktionalität: Offline-Nutzung, Installation, Service Worker Caching.

## PWA-Features

```yaml
1. Manifest (manifest.json):
   - App Name, Icons, Theme Color
   - Display Mode: standalone (fullscreen-like)
   - Installierbar auf Desktop/Mobile
   
2. Service Worker:
   - Caching von Assets (JS, CSS, HTML)
   - Offline-Verfügbarkeit
   - Background Sync (zukünftig)
   
3. IndexedDB / LocalStorage:
   - Parameter-Sets persistent speichern
   - Experiment-Daten lokal cachen
```

## Offline-Strategie

```yaml
Cache-First:
  - Static Assets (JS, CSS) → immer aus Cache
  - Schnelle Ladezeit, offline verfügbar

Network-First:
  - API Calls (falls vorhanden) → erst Netzwerk, dann Cache
  - Fallback auf gecachte Version bei Offline
```

## Installation

```yaml
Desktop (Chrome/Edge):
  - "Installieren"-Button im Browser
  - App läuft als eigenständiges Fenster

Mobile (iOS/Android):
  - "Zum Homescreen hinzufügen"
  - Icon auf Homescreen, App-artige Erfahrung
```

## Verwandte Komponenten

- [[react-components]] - PWA umschließt gesamte React-App
