import { ColorKey, getColorClasses } from "@/types/ColorType";
import Typography from "@/components/shared/ui/text/Typography";
import Box from "@/components/shared/ui/content/Box";

export interface BannerProps {
    icon: string;        // pasá la clase completa (ej: "fas fa-info")
    color: ColorKey;
    title: string;
    description: string;
}

export default function Banner({ icon, color, title, description }: BannerProps) {
    const c = getColorClasses(color);

    return (
        <Box
            className={[
                "relative flex w-full items-start md:items-center gap-4",
                "rounded-2xl p-4 md:p-5",
                c.bg60, c.border, c.softBorder, c.softShadow,
            ].join(" ")}
        >
            {/* Barra decorativa izquierda (no afecta el borde) */}
            <span
                className={[
                    "pointer-events-none absolute inset-y-3 left-2",
                    "w-1.5 rounded-full",
                    c.gradient,                                  // gradiente del color
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                ].join(" ")}
            />

            {/* Icono en pastilla */}
            <div
                className={[
                    "flex items-center justify-center",
                    "h-11 w-11 md:h-12 md:w-12 rounded-xl text-white",
                    c.iconGradient, "ring-1 ring-white/40",
                    "shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                ].join(" ")}
            >
                <i className={icon} /> {/* ya no concatenamos 'fas fa-' */}
            </div>

            {/* Texto */}
            <div className="flex flex-col text-left">
                <Typography variant="h2">{title}</Typography>
                <Typography variant="body">{description}</Typography>
            </div>
        </Box>
    );
}
