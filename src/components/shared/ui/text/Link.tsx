'use client';

import Box from '@/components/shared/ui/content/Box';
import { getColorClasses } from '@/types/ColorType';

export interface LinkProps {
    text: string;
    url: string;
    newWindow?: boolean;
    icon?: string;
}

export default function Link({ icon, text, url, newWindow = true }: LinkProps) {
    const { bgHover } = getColorClasses('secondary');
    const normalizeUrl = (url: string): string => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        return `https://${url}`;
    };

    const handleClick = () => {
        if (!url) return;

        const normalizedUrl = normalizeUrl(url);

        if (newWindow) {
            window.open(normalizedUrl, '_blank', 'noopener,noreferrer');
        } else {
            window.location.href = normalizedUrl;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleClick();
        }
    };

    return (
        <Box
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Open link to ${text}`}
            className={`flex items-center w-fit gap-2 text-lg md:text-lg text-pretty select-none ${bgHover} cursor-pointer transition-all duration-500 ease-in-out`}
        >
            {icon && <i className={`${icon} w-5 h-fit text-center`} aria-hidden="true" />}
            <Box
                className={`underline md:no-underline md:hover:underline font-medium transition-all duration-500 ease-in-out`}
            >
                {text}
            </Box>
        </Box>
    );
}
