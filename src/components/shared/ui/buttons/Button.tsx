'use client';

import { getColorClasses } from "@/types/ColorType";

export interface ButtonProps {
    type?: 'primary' | 'secondary';
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    htmlType?: 'button' | 'submit' | 'reset';
}

export default function Button({ type = 'primary', text, disabled = false, onClick, htmlType = 'button' }: ButtonProps) {
    const { bg, border } = getColorClasses(type);

    const handleClick = () => {
        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            type={htmlType}
            className={`flex w-fit h-fit ${type === 'primary' ? bg : 'bg-transparent'} ${border} rounded-full border-2 px-3 py-2 md:px-3 md:py-1 transition-all duration-200 ease-in-out ${disabled ? 'opacity-50' : 'cursor-pointer hover:scale-105'}`}
            onClick={handleClick}
            disabled={disabled}
        >
            <span className='font-semibold text-md md:text-lg md:font-bold text-pretty'>{text}</span>
        </button>
    );
}
