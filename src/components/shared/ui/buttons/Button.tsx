'use client';

import { getColorClasses } from "@/types/ColorType";

export interface ButtonProps {
    type?: string;
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    htmlType?: 'button' | 'submit' | 'reset';
}

export default function Button({ type, text, disabled = false, onClick, htmlType = 'button' }: ButtonProps) {
    const { gradient, bg, border, text: textColor } = getColorClasses(type);
    console.log(bg, border);
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            type={htmlType}
            className={`
                    flex w-fit h-fit
                    ${bg || 'bg-transparent'}
                    ${gradient}
                    ${border}
                    rounded-full border-2 px-3 py-2 md:px-3 md:py-1
                    transition-all duration-200 ease-in-out
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
                    ${textColor || 'text-black'}
                `}
            onClick={handleClick}
            disabled={disabled}
        >
            <span className='font-semibold text-md md:text-lg md:font-bold text-pretty'>{text}</span>
        </button >
    );
}
