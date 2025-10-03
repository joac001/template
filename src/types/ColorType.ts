// src/types/ColorType.ts
export type ColorKey =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'neutral';

type Classes = {
    bg: string;
    bgHover?: string;
    bg60?: string;
    border: string;
    ring?: string;
    shadow?: string;
    text: string;
    gradient: string;

    softBg?: string;
    softBorder?: string;
    softRing?: string;
    softShadow?: string;
    iconGradient?: string;
};

export const CLASS_MAP: Record<ColorKey, Classes> = {
    // NARANJA (accentOrange1 → accentOrange2)
    primary: {
        bg: 'bg-[#ff5722]',
        bgHover: 'hover:bg-[#ff5722]',
        bg60: 'bg-[#ff5722]/60',
        border: 'border-[#ff9800]',
        ring: 'ring-[#ff5722]',
        shadow: 'shadow-[0_2px_8px_rgba(0,0,0,0.12)]',
        text: 'text-[#ffffff]',
        gradient: 'bg-gradient-to-br from-[#ff5722] to-[#ff9800]',

        // SOFT
        softBg: 'bg-[#fff7ed]',                                 // orange-50
        softBorder: 'border border-[#ff5722]/60',
        softRing: 'ring-1 ring-inset ring-[#ff5722]/15',
        softShadow: 'shadow-[0_14px_32px_rgba(255,87,34,0.12)]',
        iconGradient: 'bg-gradient-to-br from-[#ff6a2a] to-[#ff9800]',
    },

    // NARANJA CLARO
    secondary: {
        bg: 'bg-[#ff9800]',
        bgHover: 'hover:bg-[#ff9800]',
        bg60: 'bg-[#ff9800]/60',
        border: 'border-[#ff5722]',
        ring: 'ring-[#ff9800]',
        shadow: 'shadow-[0_2px_8px_rgba(0,0,0,0.12)]',
        text: 'text-[#ffffff]',
        gradient: 'bg-gradient-to-br from-[#ff9800] to-[#ff5722]',

        // SOFT
        softBg: 'bg-[#ffedd5]',                                 // orange-100
        softBorder: 'border border-[#ff9800]/60',
        softRing: 'ring-1 ring-inset ring-[#ff9800]/15',
        softShadow: 'shadow-[0_14px_32px_rgba(255,152,0,0.12)]',
        iconGradient: 'bg-gradient-to-br from-[#ffb74d] to-[#ff9800]',
    },

    // VERDE (SUCCESS)
    success: {
        // sólidos
        bg: 'bg-[#4caf50]',
        bg60: 'bg-[#4caf50]/60',
        border: 'border-[#16a34a]',
        text: 'text-[#ffffff]',
        gradient: 'bg-gradient-to-br from-[#22c55e] to-[#16a34a]',

        // SOFT (igual a tu ejemplo)
        softBg: 'bg-[#ecfdf5]',                                 // emerald-50
        softBorder: 'border border-[#22c55e]/60',
        softRing: 'ring-1 ring-inset ring-[#22c55e]/15',
        softShadow: 'shadow-[0_14px_32px_rgba(16,185,129,0.12)]',
        iconGradient: 'bg-gradient-to-br from-[#22c55e] to-[#16a34a]',
    },

    // ROJO (ERROR)
    error: {
        // sólidos
        bg: 'bg-[#f44336]',
        bg60: 'bg-[#f44336]/60',
        border: 'border-[#f44336]',
        text: 'text-[#ffffff]',
        gradient: 'bg-gradient-to-br from-[#e53935] to-[#f44336]',

        // SOFT
        softBg: 'bg-[#fef2f2]',                                 // red-50
        softBorder: 'border border-[#f44336]/60',
        softRing: 'ring-1 ring-inset ring-[#f44336]/15',
        softShadow: 'shadow-[0_14px_32px_rgba(244,67,54,0.12)]',
        iconGradient: 'bg-gradient-to-br from-[#ef5350] to-[#d32f2f]',
    },

    // AMARILLO / NARANJA (WARNING)
    warning: {
        // sólidos
        bg: 'bg-[#ff9800]',
        bg60: 'bg-[#ff9800]/60',
        border: 'border-[#ff9800]',
        text: 'text-[#ffffff]',
        gradient: 'bg-gradient-to-br from-[#ffb74d] to-[#ff9800]',

        // SOFT
        softBg: 'bg-[#fffbeb]',                                 // amber-50
        softBorder: 'border border-[#ff9800]/60',
        softRing: 'ring-1 ring-inset ring-[#ff9800]/15',
        softShadow: 'shadow-[0_14px_32px_rgba(255,152,0,0.12)]',
        iconGradient: 'bg-gradient-to-br from-[#ffb74d] to-[#ff9800]',
    },

    // AZUL PROFUNDO (INFO)
    info: {
        // sólidos
        bg: 'bg-[#1976d2]',
        bg60: 'bg-[#1976d2]/60',
        border: 'border-[#2196f3]',
        text: 'text-[#ffffff]',
        gradient: 'bg-gradient-to-br from-[#1976d2] to-[#2196f3]',

        // SOFT
        softBg: 'bg-[#eff6ff]',                                 // blue-50
        softBorder: 'border border-[#1976d2]/60',
        softRing: 'ring-1 ring-inset ring-[#1976d2]/15',
        softShadow: 'shadow-[0_14px_32px_rgba(25,118,210,0.12)]',
        iconGradient: 'bg-gradient-to-br from-[#1d4ed8] to-[#2563eb]',
    },

    // AZUL MEDIO (NEUTRAL)
    neutral: {
        // sólidos
        bg: 'bg-[#2196f3]',
        bg60: 'bg-[#2196f3]/60',
        border: 'border-[#1976d2]',
        text: 'text-[#ffffff]',
        gradient: 'bg-gradient-to-br from-[#2196f3] to-[#1976d2]',

        // SOFT
        softBg: 'bg-[#e3f2fd]',                                 // light-blue-50
        softBorder: 'border border-[#2196f3]/60',
        softRing: 'ring-1 ring-inset ring-[#2196f3]/15',
        softShadow: 'shadow-[0_14px_32px_rgba(33,150,243,0.12)]',
        iconGradient: 'bg-gradient-to-br from-[#1e88e5] to-[#1976d2]',
    },
};

export function getColorClasses(input?: string): Classes {
    const key = (input ?? 'primary') as ColorKey;
    return CLASS_MAP[key] ?? CLASS_MAP.primary;
}
