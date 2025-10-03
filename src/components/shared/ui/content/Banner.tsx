import Typography from "@/components/shared/ui/text/Typography";
import Box from "@/components/shared/ui/content/Box";

type ColorKey =
    | "primary"   // naranja (brand)
    | "accent"    // azul
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "neutral";

export interface BannerProps {
    icon: string;       // clase completa: "fas fa-info-circle"
    color: ColorKey;
    title: string;
    description: string;
}

export default function Banner({ icon, color, title, description }: BannerProps) {
    return (
        <Box
            data-banner={color}
            className={[
                "relative flex w-full items-start md:items-center gap-4",
                "rounded-2xl p-4 md:p-5",
                // colores/estilos via variables
                "bg-[var(--bn-surface)] border border-[var(--bn-border)]",
                "shadow-[0_10px_25px_-5px_rgba(0,0,0,.12),_0_8px_10px_-6px_rgba(0,0,0,.12)]",
            ].join(" ")}
        >
            {/* Barra decorativa izquierda */}
            <span
                aria-hidden
                className={[
                    "pointer-events-none absolute inset-y-3 left-2 w-1.5 rounded-full",
                    "bg-gradient-to-b from-[var(--bn-bar-from)] to-[var(--bn-bar-to)]",
                    "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
                ].join(" ")}
            />

            {/* Icono en pastilla */}
            <div
                className={[
                    "flex items-center justify-center",
                    "h-11 w-11 md:h-12 md:w-12 rounded-xl text-white ring-1 ring-white/40",
                    "bg-gradient-to-br from-[var(--bn-icon-from)] to-[var(--bn-icon-to)]",
                    "shadow-[0_8px_20px_rgba(0,0,0,0.12)]",
                ].join(" ")}
            >
                <i className={icon} />
            </div>

            {/* Texto */}
            <div className="flex flex-col text-left">
                <Typography variant="h2">{title}</Typography>
                <Typography variant="body">{description}</Typography>
            </div>
        </Box>
    );
}
