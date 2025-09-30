export type ColorKey = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

export function getColorClasses(color: ColorKey) {
    switch (color) {
        case 'primary':
            return {
                bg: 'bg-emerald-600',
                border: 'border-emerald-600',
                shadow: 'shadow-emerald-600/50',
                text: 'text-emerald-600'
            };
        case 'secondary':
            return {
                bg: 'bg-emerald-700',
                border: 'border-emerald-700',
                shadow: 'shadow-emerald-700/50',
                text: 'text-emerald-700'
            };
        case 'success':
            return {
                bg: 'bg-lime-600',
                border: 'border-lime-700',
                shadow: 'shadow-lime-500/50',
                text: 'text-lime-600'
            };
        case 'error':
            return {
                bg: 'bg-orange-700',
                border: 'border-red-800',
                shadow: 'shadow-red-500/50',
                text: 'text-red-600'
            };
        case 'warning':
            return {
                bg: 'bg-yellow-600',
                border: 'border-yellow-700',
                shadow: 'shadow-yellow-500/50',
                text: 'text-yellow-500'
            };
        case 'info':
            return {
                bg: 'bg-slate-600',
                border: 'border-slate-700',
                shadow: 'shadow-slate-500/50',
                text: 'text-slate-500'
            };
        case 'neutral':
            return {
                bg: 'bg-blue-500',
                border: 'border-blue-600',
                shadow: 'shadow-blue-500/50',
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
