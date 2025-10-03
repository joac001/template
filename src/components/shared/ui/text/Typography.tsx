import type { ReactNode } from "react";

/**
 * Extra: permitimos "inherit" para que en componentes como Banner
 * el texto tome el color del contenedor (p.ej. --ntf-fg).
 */
type TypographyColor = string | "inherit";

interface TypographyProps {
    variant: "h1" | "h2" | "subtitle" | "body" | "caption";
    children: ReactNode;
    color?: TypographyColor;
}

const variantClasses: Record<TypographyProps["variant"], string> = {
    h1: "font-bold text-2xl md:text-3xl lg:text-4xl",
    h2: "font-semibold text-xl md:text-2xl lg:text-3xl",
    subtitle: "font-semibold text-lg md:text-xl",
    body: "font-normal text-lg md:text-lg",
    caption: "font-light text-xs md:text-sm",
};

export default function Typography({ variant, children, color }: TypographyProps) {
    // Si no viene color, heredamos o caemos al token base del tema.
    const colorClass =
        color ? "text-[var(--color-" + color + "-700)]" : "text-black";

    // En caption damos un pelín de menor contraste por defecto
    const extra =
        variant === "caption" ? " text-slate-500/90 dark:text-slate-400/90" : "";

    const classes = `${variantClasses[variant]} ${colorClass} text-pretty${extra}`.trim();

    switch (variant) {
        case "h1":
            return <h1 className={classes}>{children}</h1>;
        case "h2":
            return <h2 className={classes}>{children}</h2>;
        case "subtitle":
            return <h3 className={classes}>{children}</h3>;
        case "body":
            return <p className={classes}>{children}</p>;
        case "caption":
            return <p className={classes}>{children}</p>;
        default:
            return <p className={classes}>{children}</p>;
    }
}
