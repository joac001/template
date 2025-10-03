import type { ReactNode } from "react";
import { ColorKey, getColorClasses } from "@/types/ColorType";

interface TypographyProps {
    variant: 'h1' | 'h2' | 'subtitle' | 'body' | 'caption';
    children: ReactNode;
    color?: ColorKey;
}

const variantClasses: { [key in TypographyProps['variant']]: string } = {
    h1: 'font-bold text-2xl md:text-3xl lg:text-4xl',
    h2: 'font-semibold text-xl md:text-2xl lg:text3xl',
    subtitle: 'font-semibold text-lg md:text-xl ',
    body: 'font-normal text-lg md:text-lg',
    caption: 'font-light text-slate-400 text-xs md:text-sm',
};

export default function Typography({ variant, children, color }: TypographyProps) {
    const { text } = color ? getColorClasses(color) : { text: 'text-black' };
    const classes = `${variantClasses[variant]} ${text} text-pretty`.trim();

    switch (variant) {
        case 'h1':
            return <h1 className={classes}>{children}</h1>;
        case 'h2':
            return <h2 className={classes}>{children}</h2>;
        case 'subtitle':
            return <h3 className={classes}>{children}</h3>;
        case 'body':
            return <p className={classes}>{children}</p>;
        case 'caption':
            return <p className={classes}>{children}</p>;
        default:
            return <p className={classes}>{children}</p>;
    }
}
