'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import Box from "@/components/shared/ui/content/Box";
import Typography from "@/components/shared/ui/text/Typography";
import { getColorClasses } from "@/types/ColorType";

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
    const [isMenuHovered, setIsMenuHovered] = useState<boolean>(false);
    const navRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();

    const { bg: navLinkBg, bgHover } = getColorClasses('secondary');

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleOpenPage = (href: string) => {
        router.push(href);
        handleOpen();
    }

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

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <div
                ref={navRef}
                className={`sticky top-2 mb-2 z-navbar rounded-2xl mx-2 md:mx-3 bg-gradient-to-br from-slate-600/50 to-slate-600/50 backdrop-blur-md shadow-lg transition-all duration-300`}
            >
                <Box className="flex h-fit w-full items-center p-2 select-none">
                    <Box className="flex w-full items-center">
                        <button onClick={handleOpen} className="">
                            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'} p-4 text-lg md:text-2xl cursor-pointer transition-all duration-300`} />
                        </button>

                        <Typography variant="h1">{title}</Typography>
                    </Box>
                </Box>
            </div>

            {/* Contenedor fijo para los links */}
            <div
                ref={linksRef}
                className="fixed top-20 left-2 z-navbar"
                onMouseEnter={() => setIsMenuHovered(true)}
                onMouseLeave={() => setIsMenuHovered(false)}
            >
                {links.map((link, index) => {
                    const isCurrentPage = pathname === link.href;
                    const shouldShowActiveStyle = isCurrentPage;

                    return (
                        <Box
                            key={index}
                            className={`flex items-center justify-center space-x-2 mt-2 ml-2 w-fit h-fit rounded-2xl py-2 px-4 backdrop-blur-md shadow-lg cursor-pointer transition-all duration-100 ease-in-out select-none
                            ${shouldShowActiveStyle
                                    ? navLinkBg
                                    : bgHover
                                }
                                hover:scale-105
                            ${isOpen
                                    ? 'translate-x-0 opacity-100'
                                    : '-translate-x-full opacity-50 invisible'
                                }`}
                            style={{
                                transitionDelay: isOpen ? `${index * 25}ms` : `${(3 - index) * 50}ms`
                            }}
                            onClick={() => handleOpenPage(link.href)}
                        >
                            <i className={link.icon} />
                            <Typography variant="subtitle">{link.label}</Typography>
                        </Box>
                    );
                })}
            </div>
        </>
    );
}
