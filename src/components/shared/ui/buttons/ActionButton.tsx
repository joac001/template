'use client';

import { ColorKey, getColorClasses } from "@/types/ColorType";
import Box from "@/components/shared/ui/content/Box";
import Tooltip from "@/components/shared/ui/text/Tooltip";

export interface ActionButtonProps {
    icon: string;
    color: ColorKey;
    text: string;
    onClick?: () => void;
    tooltip?: string;
}

export default function ActionButton({ icon, color, text, onClick, tooltip }: ActionButtonProps) {
    const { bg } = getColorClasses(color);

    const button = (
        <Box
            className={`flex items-center w-fit h-fit min-w-0 rounded-full ${bg} py-1 px-2 md:py-2 md:px-4 font-normal text-lg md:text-lg transition-transform duration-200 ease-in-out hover:scale-105`}
            onClick={onClick}
        >
            <i className={`${icon} text-md md:text-lg m-1`}></i>
            {text && (
                <Box className="hidden md:inline">{text}</Box>
            )}
        </Box>
    );

    if (tooltip) {
        return (
            <Tooltip content={tooltip} placement="left">
                {button}
            </Tooltip>
        );
    }

    return (
        <>
            <Box className="md:hidden">
                <Tooltip content={text} placement="left">
                    {button}
                </Tooltip>
            </Box>
            <Box className="hidden md:block cursor-pointer">
                {button}
            </Box>
        </>
    );
}
