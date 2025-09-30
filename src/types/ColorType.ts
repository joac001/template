export type ColorKey = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

export function getColorClasses(color: ColorKey) {
    switch (color) {
        case 'primary':
            return {
                bg: 'bg-amber-600',
                bgHover: 'hover:bg-amber-600/80',
                border: 'border-amber-600',
                ring: 'ring-amber-600',
                shadow: 'shadow-amber-600',
                text: 'text-amber-600'
            };
        case 'secondary':
            return {
                bg: 'bg-yellow-600',
                bgHover: 'hover:bg-yellow-600/80',
                border: 'border-yellow-600',
                ring: 'ring-yellow-600',
                shadow: 'shadow-yellow-600',
                text: 'text-yellow-600'
            };
        case 'success':
            return {
                bg: 'bg-green-600',
                bg70: 'bg-green-600/70',
                border: 'border-green-700',
                shadow: 'shadow-green-500',
                text: 'text-green-600'
            };
        case 'error':
            return {
                bg: 'bg-red-500/80',
                bg70: 'bg-red-500/70',
                border: 'border-red-800',
                shadow: 'shadow-red-500',
                text: 'text-red-600'
            };
        case 'warning':
            return {
                bg: 'bg-amber-500/80',
                bg70: 'bg-amber-500/70',
                border: 'border-amber-600',
                shadow: 'shadow-amber-500',
                text: 'text-amber-500'
            };
        case 'info':
            return {
                bg: 'bg-slate-600',
                bg70: 'bg-slate-600/70',
                border: 'border-slate-700',
                shadow: 'shadow-slate-500',
                text: 'text-slate-500'
            };
        case 'neutral':
            return {
                bg: 'bg-blue-500',
                border: 'border-blue-600',
                shadow: 'shadow-blue-500',
                text: 'text-blue-500'
            }
        default:
            return {
                bg: 'bg-white',
                border: 'border-white',
                shadow: 'shadow-white',
                text: 'text-white'
            };
    }
}
