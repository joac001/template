'use client';

import type { KeyboardEvent } from 'react';
import Box from '@/components/shared/ui/content/Box';

export interface LinkProps {
    text: string;
    url: string;
    newWindow?: boolean;
    icon?: string;
    color?: string;
}

export default function Link({
    icon,
    text,
    url,
    newWindow = true,
    color = 'primary',
}: LinkProps) {
    const normalizeUrl = (u: string) =>
        u.startsWith('http://') || u.startsWith('https://') ? u : `https://${u}`;

    const handleClick = () => {
        if (!url) return;
        const href = normalizeUrl(url);
        if (newWindow) {
            window.open(href, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = href;
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    const hoverBg = "hover:bg-[var(--color-" + color + "-600)]/20";

    return (
        <Box
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Open link to ${text}`}
            className={[
                'flex items-center w-fit gap-2 text-lg md:text-lg text-pretty select-none',
                'cursor-pointer transition-all duration-500 ease-in-out',
                // chip + foco accesible
                'rounded-md px-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-600)]/40',
                hoverBg,
            ].join(' ')}
        >
            {icon && <i className={`${icon} w-5 h-fit text-center`} aria-hidden />}
            <Box className="underline md:no-underline md:hover:underline font-medium transition-all duration-500 ease-in-out">
                {text}
            </Box>
        </Box>
    );
}
