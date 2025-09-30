import { ColorKey, getColorClasses } from "@/types/ColorType";
import Typography from "@/components/shared/ui/text/Typography";
import Box from "@/components/shared/ui/content/Box";

export interface BannerProps {
    icon: string;
    color: ColorKey;
    title: string;
    description: string;
}

export default function Banner({ icon, color, title, description }: BannerProps) {

    const { bg70, border } = getColorClasses(color);

    const glassClasses = `backdrop-blur-2xl transition-all duration-300 ease-in-out`;

    return (
        <Box className={`flex w-full flex-col md:flex-row items-start md:items-center mt-2 md:mt-4 py-2 px-4 md:px-2 md:space-x-2 lg:space-x-4 rounded-xl border-l-8 ${glassClasses} ${border} ${bg70}`}>
            <Box className="flex items-center justify-center h-fit w-fit px-4 py-2 md:px-6 md:py-5 rounded-xl bg-white/15 shadow-inner shadow-white/20">
                <i className={`fas fa-${icon} text-lg text-white md:text-2xl`}></i>
            </Box>

            <Box className="flex flex-col text-left">
                <Typography variant="h2">{title}</Typography>
                <Typography variant="body">{description}</Typography>
            </Box>
        </Box>
    );
}
