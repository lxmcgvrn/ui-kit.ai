import type { ThemeInput } from './palette'

/** A theme the editor can start from, named for the picker. */
export interface Preset {
    input: ThemeInput
    label: string
    name: string
}

/** The `md` radius step in rem, when the theme leaves it out. */
export const DEFAULT_RADIUS = 0.375

export const DEFAULT_THEME: ThemeInput = {
    colors: {
        default: '#3E63DD',
        error: '#E54666',
        info: '#3E63DD',
        success: '#29A383',
        warning: '#FFC53D',
    },
}

export const PRESETS: readonly Preset[] = [
    {
        input: {
            colors: {
                default: '#FFA057',
                error: '#FF977D',
                info: '#FFA057',
                success: '#3E7949',
                warning: '#F6E2B4',
            },
        },
        label: 'Autumnal',
        name: 'autumnal',
    },
    {
        input: {
            colors: {
                default: '#2A7E68',
                error: '#C8462D',
                info: '#2A7E68',
                success: '#2A7E68',
                warning: '#F5B961',
            },
        },
        label: 'Boreal',
        name: 'boreal',
    },
    {
        input: {
            colors: {
                default: '#70B8FF',
                error: '#FF92AD',
                info: '#70B8FF',
                success: '#0BD8B6',
                warning: '#F6EEB4',
            },
        },
        label: 'Glacial',
        name: 'glacial',
    },
    {
        input: {
            colors: {
                default: '#111111',
                error: '#B54548',
                info: '#111111',
                success: '#30A46C',
                warning: '#FFC53D',
            },
        },
        label: 'Neutral',
        name: 'neutral',
    },
    {
        input: {
            colors: {
                default: '#591C47',
                error: '#E93D82',
                info: '#591C47',
                success: '#0BD8B6',
                warning: '#F6EEB4',
            },
        },
        label: 'Nocturnal',
        name: 'nocturnal',
    },
    {
        input: DEFAULT_THEME,
        label: 'Professional',
        name: 'professional',
    },
]
