'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import Box from "@/components/shared/ui/content/Box";
import Typography from "@/components/shared/ui/text/Typography";

export interface NavLink {
    icon: string;
    label: string;
    href: string;
}

interface NavBarProps {
    title: string;
    links: NavLink[];
}

export default function NavBar({ title, links }: NavBarProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    const handleOpen = () => setIsOpen((v) => !v);

    const handleOpenPage = (href: string) => {
        router.push(href);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                navRef.current &&
                linksRef.current &&
                !navRef.current.contains(event.target as Node) &&
                !linksRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    // clases base/estado para los chips del menú
    const navLinkBase =
        "flex items-center justify-center space-x-2 mt-2 ml-2 w-fit h-fit rounded-2xl py-2 px-4 backdrop-blur-md shadow-lg cursor-pointer transition-all duration-100 ease-in-out select-none";
    const navLinkActive =
        // activo: naranja brand sólido (usa tu escala primaria)
        "bg-[var(--color-secondary-500)] text-white";
    const navLinkHover =
        // hover en inactivos: naranja medio
        "hover:bg-[var(--color-secondary-300)]";
    const navLinkHidden = "-translate-x-full opacity-50 invisible";
    const navLinkShown = "translate-x-0 opacity-100";

    return (
        <>
            {/* Top bar */}
            <div
                ref={navRef}
                className="sticky top-2 mb-2 z-navbar rounded-2xl mx-2 md:mx-3 bg-gradient-to-br from-slate-600/50 to-slate-600/50 backdrop-blur-md shadow-lg transition-all duration-300"
                role="navigation"
                aria-label="Barra de navegación"
            >
                <Box className="flex h-fit w-full items-center p-2 select-none">
                    <Box className="flex w-full items-center">
                        <button
                            onClick={handleOpen}
                            aria-expanded={isOpen}
                            aria-controls="app-sidemenu"
                            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            <i
                                className={`fas ${isOpen ? "fa-times" : "fa-bars"} p-4 text-lg md:text-2xl cursor-pointer transition-all duration-300`}
                            />
                        </button>

                        <Typography variant="h1">{title}</Typography>
                    </Box>
                </Box>
            </div>

            {/* Side links */}
            <div
                id="app-sidemenu"
                ref={linksRef}
                className="fixed top-20 left-2 z-navbar"
            >
                {links.map((link, index) => {
                    const isCurrentPage = pathname === link.href;

                    return (
                        <Box
                            key={`${link.href}-${index}`}
                            role="link"
                            aria-current={isCurrentPage ? "page" : undefined}
                            className={[
                                navLinkBase,
                                isCurrentPage ? navLinkActive : navLinkHover,
                                "hover:scale-105",
                                isOpen ? navLinkShown : navLinkHidden,
                            ].join(" ")}
                            style={{
                                transitionDelay: isOpen
                                    ? `${index * 25}ms`
                                    : `${(3 - index) * 50}ms`,
                            }}
                            onClick={() => handleOpenPage(link.href)}
                        >
                            <i
                                className={[
                                    link.icon,
                                    "text-white/85",
                                    "group-hover:text-white",
                                    isCurrentPage ? "text-white/60" : "",
                                ].join(" ")}
                            />
                            <Typography variant="subtitle">{link.label}</Typography>
                        </Box>
                    );
                })}
            </div>
        </>
    );
}
