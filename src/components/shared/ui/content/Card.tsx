import type { ReactNode } from "react";
import { ActionButtonProps } from "@/components/shared/ui/buttons/ActionButton";
import ActionButton from "@/components/shared/ui/buttons/ActionButton";
import Typography from "@/components/shared/ui/text/Typography";
import Box from "@/components/shared/ui/content/Box";
import { getColorClasses } from "@/types/ColorType";

interface CardProps {
    title: string;
    subtitle?: string;
    actions?: ActionButtonProps[];
    children: ReactNode;
    size?: 'fit' | 'full';
}

export default function Card({ title, subtitle, actions, children, size = 'full' }: CardProps) {
    return (
        <Box className={`flex ${size === 'full' ? 'w-full h-full' : 'w-fit h-fit'} rounded-2xl border-[#E0DEDE] border-solid border-2 bg-[#FAFAFA] backdrop-blur-md p-2 md:p-3 lg:p-4 shadow-xl shadow-black/30 hover:border-white/30 hover:bg-white/5 md:hover:scale-101 md:hover:shadow-2xl transition-all duration-300 ease-in-out`}>
            <Box className="flex flex-col w-full justify-between">
                <Box className="flex flex-col">
                    <Typography variant='h2'>{title}</Typography>
                    {subtitle && <Typography variant='subtitle'>{subtitle}</Typography>}
                </Box>
                {/* Children */}
                <Box className="flex flex-col space-y-2 mt-2 w-full">
                    {children}
                </Box>
            </Box>
            <Box className="flex flex-col items-end gap-1">
                {actions &&
                    actions.map((action, index) =>
                        <ActionButton key={index} icon={action.icon} color={action.color} text={action.text} onClick={action.onClick} tooltip={action.tooltip} />
                    )
                }
            </Box>
        </Box>
    );
}
