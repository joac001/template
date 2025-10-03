"use client";

import { useState, useRef, useEffect, type ComponentType, type SVGProps } from "react";
import { useRouter, usePathname } from "next/navigation";

import Box from "@/components/shared/ui/content/Box";
import Typography from "@/components/shared/ui/text/Typography";

/** Acepta ícono como clases (FA) o como componente React (Lucide u otros) */
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;
type IconType = string | IconComponent;

export interface NavLink {
    icon: IconType;      // "fas fa-home"  O  un componente SVG
    label: string;
    href: string;
}

interface NavBarProps {
    title: string;
    links: NavLink[];
}

/** Renderiza ícono según el tipo recibido */
function RenderIcon({
    icon,
    className,
    size = 18,
}: {
    icon: IconType;
    className?: string;
    size?: number;
}) {
    if (typeof icon === "string") {
        return <i className={[icon, className].filter(Boolean).join(" ")} aria-hidden="true" />;
    }
    const SvgIcon = icon;
    return <SvgIcon className={className} width={size} height={size} />;
}

export default function NavBar({ title, links }: NavBarProps) {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    const handleOpen = () => setIsOpen(v => !v);

    const handleOpenPage = (href: string) => {
        router.push(href);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                navRef.current &&
                menuRef.current &&
                !navRef.current.contains(event.target as Node) &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // chips del menú
    const navLinkBase =
        "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 select-none";
    const navLinkShown = "translate-x-0 opacity-100";
    const navLinkHidden = "-translate-x-full opacity-0";

    // estados visuales (usa tus tokens/variables)
    const navLinkActive =
        "bg-[var(--color-primary-600)] text-white shadow-lg shadow-black/10";
    const navLinkInactive =
        "bg-white text-slate-700 border border-[var(--border-soft)] hover:bg-[var(--color-neutral-50)] hover:border-[var(--color-primary-300)]";

    return (
        <>
            {/* Top bar */}
            <div
                ref={navRef}
                className="sticky top-2 mb-2 z-navbar rounded-2xl mx-2 md:mx-3 bg-white/70 backdrop-blur-md border border-[var(--border-soft)] shadow-lg transition-all duration-300"
                role="navigation"
                aria-label="Barra de navegación"
            >
                <Box className="flex items-center justify-between p-3">
                    <Box className="flex items-center gap-3">
                        {/* Botón hamburguesa */}
                        <button
                            onClick={handleOpen}
                            aria-expanded={isOpen}
                            aria-controls="app-sidemenu"
                            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                            className="w-10 h-10 rounded-xl border-2 border-[var(--border-soft)] hover:border-[var(--color-primary-400)] flex items-center justify-center transition-all duration-300 group"
                        >
                            <div className="space-y-1">
                                <span
                                    className={`block w-4 h-0.5 bg-slate-600 transition-all duration-300 group-hover:bg-[var(--color-primary-600)] ${isOpen ? "rotate-45 translate-y-1.5" : ""
                                        }`}
                                />
                                <span
                                    className={`block w-4 h-0.5 bg-slate-600 transition-all duration-300 group-hover:bg-[var(--color-primary-600)] ${isOpen ? "opacity-0" : ""
                                        }`}
                                />
                                <span
                                    className={`block w-4 h-0.5 bg-slate-600 transition-all duration-300 group-hover:bg-[var(--color-primary-600)] ${isOpen ? "-rotate-45 -translate-y-1.5" : ""
                                        }`}
                                />
                            </div>
                        </button>

                        <Typography variant="h1">{title}</Typography>
                    </Box>

                    {/* status decorativo */}
                    <Box className="hidden md:flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[var(--color-primary-600)]" />
                        <div className="w-2 h-2 rounded-full bg-[var(--border-light)]" />
                        <div className="w-2 h-2 rounded-full bg-[var(--color-secondary-600)]" />
                    </Box>
                </Box>
            </div>

            {/* Side menu */}
            <div id="app-sidemenu" ref={menuRef} className="fixed top-20 left-2 z-navbar space-y-2">
                {links.map((link, index) => {
                    const isActive = pathname === link.href;

                    return (
                        <button
                            key={`${link.href}-${index}`}
                            onClick={() => handleOpenPage(link.href)}
                            className={[
                                navLinkBase,
                                isOpen ? navLinkShown : navLinkHidden,
                                isActive ? navLinkActive : navLinkInactive,
                                "hover:scale-105",
                            ].join(" ")}
                            style={{
                                transitionDelay: isOpen
                                    ? `${index * 40}ms`
                                    : `${(links.length - index) * 30}ms`,
                            }}
                            aria-current={isActive ? "page" : undefined}
                        >
                            {/* Ícono: gris por defecto; blanco si activo */}
                            <RenderIcon
                                icon={link.icon}
                                className={[
                                    isActive ? "text-white" : "text-slate-500",
                                    "group-hover:text-slate-700",
                                ].join(" ")}
                                size={18}
                            />

                            <span className="text-sm font-medium">{link.label}</span>
                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
                        </button>
                    );
                })}
            </div>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/5 z-[1000] transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                    aria-hidden
                />
            )}
        </>
    );
}
