import { ColorKey, getColorClasses } from "@/types/ColorType";

interface ChipProps {
    text?: string;
    color?: ColorKey;
    hasShadow: boolean;
}

export default function Chip({ text, color, hasShadow = false }: ChipProps) {

    const { bg, shadow } = getColorClasses(color || '' as ColorKey);

    return (
        <span className={`flex items-center justify-center ${text ? 'w-fit h-fit' : 'w-4 h-4'} py-1 px-2 rounded-full text-sm md:text-md font-semibold ${bg} ${hasShadow && !text ? `shadow-lg ${shadow}` : ''}`}>
            {text}
        </span>
    );
}