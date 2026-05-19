import { ref, computed } from 'vue';

// Embed mode — when this Scrypted UI is rendered inside the IoT Dashboard's
// iframe, the dashboard provides its own outer sidebar + header chrome.
// Showing Scrypted's own AppBar + Drawer on top would look like a double
// shell, so we hide them.
//
// Detection (in priority order):
//   1. URL query param `?embed=1`
//   2. Window is in an iframe (window !== window.top)
//   3. Explicit localStorage flag `scrypted-embed-mode=1`
//
// Anything truthy → embed mode is on. The check runs once at module load
// time; treat it as a render-time constant.

function detectEmbedMode(): boolean {
    if (typeof window === 'undefined') return false;

    try {
        const params = new URLSearchParams(window.location.search);
        if (params.get('embed') === '1' || params.get('embed') === 'true') return true;
    } catch { /* ignore parse failures */ }

    try {
        if (window.self !== window.top) return true;
    } catch {
        // Cross-origin frame access throws — that IS an iframe context, so embed.
        return true;
    }

    try {
        if (localStorage.getItem('scrypted-embed-mode') === '1') return true;
    } catch { /* ignore storage failures */ }

    return false;
}

const _isEmbedded = ref(detectEmbedMode());

export function useEmbedMode() {
    return {
        isEmbedded: computed(() => _isEmbedded.value),
        // Programmatic overrides (rarely needed; mainly for tests/devtools).
        setEmbedded(v: boolean) {
            _isEmbedded.value = v;
            try {
                if (v) localStorage.setItem('scrypted-embed-mode', '1');
                else localStorage.removeItem('scrypted-embed-mode');
            } catch { /* ignore */ }
        },
    };
}
