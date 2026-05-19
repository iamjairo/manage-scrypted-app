import { ref } from "vue";
import { useTheme } from "vuetify";

// Default theme key used when nothing is saved in localStorage and the user
// has not toggled. Matches the IoT Dashboard look.
const DEFAULT_THEME = 'mediamtxNeon';
const KNOWN_THEMES = new Set(['light', 'dark', 'mediamtxNeon']);

export function getThemeManager() {

    const theme = ref<string | undefined>();
    const usedTheme = useTheme();
    const globalTheme = usedTheme.global.name;

    function setTheme(theme?: string) {
        if (theme)
            localStorage.setItem('globalTheme', theme);
        else
            localStorage.removeItem('globalTheme');
        updateTheme();
    }

    function updateTheme() {
        const themeValue = localStorage.getItem('globalTheme');
        if (themeValue && KNOWN_THEMES.has(themeValue)) {
            usedTheme.change(themeValue);
        }
        else {
            // No explicit choice — apply the dashboard neon theme regardless of
            // OS preference. (Users who want OS-following light/dark can pick
            // "System Default" from the toggle.)
            if (themeValue === 'system') {
                const dark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                usedTheme.change(dark ? 'dark' : 'light');
            }
            else {
                usedTheme.change(DEFAULT_THEME);
            }
        }
        theme.value = themeValue || undefined;
    }

    theme.value = localStorage.getItem('globalTheme') || undefined;

    function getThemeName() {
        if (theme.value === 'light')
            return 'Light';
        if (theme.value === 'dark')
            return 'Dark';
        if (theme.value === 'mediamtxNeon')
            return 'MediaMTX Neon';
        if (theme.value === 'system')
            return 'System Default';
        return 'MediaMTX Neon';
    }

    function getThemes() {
        return [
            {
                id: 'mediamtxNeon',
                text: 'MediaMTX Neon',
            },
            {
                id: 'dark',
                text: 'Dark',
            },
            {
                id: 'light',
                text: 'Light',
            },
            {
                id: 'system',
                text: 'System Default',
            }
        ]
    }

    return {
        getThemes,
        getThemeName,
        theme,
        globalTheme,
        setTheme,
        updateTheme,
    }
}
