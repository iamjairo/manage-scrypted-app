/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 *
 * Custom dashboard restyle:
 * - Registers `mediamtxNeon` theme (slate-900 surfaces, cyan-400 accents)
 *   to match the IoT Dashboard look & feel.
 * - mediamtxNeon is the default theme; light/dark are still selectable.
 */

// import 'vuetify/styles'
import '../styles/theme.scss'

// Styles
import '@xterm/xterm/css/xterm.css';
import 'highlight.js/styles/github-dark.css';

import { aliases, fa } from 'vuetify/iconsets/fa'

import '../../scripts/font-awesome'

// Lexend Deca is loaded from Google Fonts via index.html for fastest first paint.
// Inter + Quicksand kept available for components that still reference them.
import '../fonts/inter-4/inter.css'
import '../styles/quicksand.css'

// Component overrides applied after Vuetify base styles.
import '../styles/iot-overrides.scss'


// Composables
import { createVuetify } from 'vuetify'

const customLightTheme = {
  colors: {
    background: '#f1f5f9',  // slate-100
    surface:    '#ffffff',
    primary:    '#0891b2',  // cyan-600 (darker cyan for light contrast)
    secondary:  '#64748b',
    error:      '#dc2626',
    info:       '#0284c7',
    success:    '#16a34a',
    warning:    '#ca8a04',
  },
};

const customDarkTheme = {
  dark: true,
  colors: {
    background: '#020617',  // slate-950
    surface:    '#0f172a',  // slate-900
    primary:    '#22d3ee',  // cyan-400
    secondary:  '#94a3b8',
    error:      '#f87171',
    info:       '#38bdf8',
    success:    '#4ade80',
    warning:    '#facc15',
  },
};

// MediaMTX / IoT Dashboard signature theme — matches mediamtx-ui's palette.
// This is the default theme so first-load users see the dashboard look.
const mediamtxNeonTheme = {
  dark: true,
  colors: {
    background: '#0f172a',  // slate-900
    surface:    '#1e293b',  // slate-800
    'surface-bright': '#334155',  // slate-700
    'surface-variant': '#0b1424', // deeper for inputs / wells
    'on-surface-variant': '#cbd5e1',
    primary:    '#22d3ee',  // cyan-400 — signature accent
    'on-primary': '#0f172a',
    secondary:  '#8b5cf6',  // violet-500 — secondary accent (matches dashboard purples)
    'on-secondary': '#ffffff',
    accent:     '#22d3ee',
    error:      '#f87171',
    info:       '#38bdf8',
    success:    '#4ade80',
    warning:    '#facc15',
    'on-background': '#e2e8f0',
    'on-surface':    '#e2e8f0',
  },
  variables: {
    'border-color':       '148, 163, 184', // slate-400 rgb
    'border-opacity':     0.12,
    'high-emphasis-opacity':   1,
    'medium-emphasis-opacity': 0.74,
    'disabled-opacity':        0.4,
    'idle-opacity':            0.04,
    'hover-opacity':           0.06,
    'focus-opacity':           0.10,
    'selected-opacity':        0.12,
    'activated-opacity':       0.14,
    'pressed-opacity':         0.16,
    'dragged-opacity':         0.08,
    'theme-kbd':       '#22d3ee',
    'theme-on-kbd':    '#0f172a',
    'theme-code':      '#1e293b',
    'theme-on-code':   '#22d3ee',
  },
};

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'mediamtxNeon',
    themes: {
      light: customLightTheme,
      dark: customDarkTheme,
      mediamtxNeon: mediamtxNeonTheme,
    },
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    }
  },
  defaults: {
    // Soften and brand component defaults globally.
    VCard: {
      rounded: 'lg',
    },
    VBtn: {
      rounded: 'lg',
      variant: 'flat',
    },
    VTextField: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VTextarea: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VSelect: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VAutocomplete: {
      variant: 'outlined',
      density: 'comfortable',
    },
    VCombobox: {
      variant: 'outlined',
      density: 'comfortable',
    },
  },
})
