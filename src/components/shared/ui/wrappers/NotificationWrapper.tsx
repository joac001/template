"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { ColorKey, getColorClasses } from '@/types/ColorType';


interface NotificationWrapperProps {
    children: ReactNode;
    isOpen: boolean;
    duration: number;
    onClose?: () => void;
    props: {
        icon: string; color: ColorKey; title: string; description: string;
    };
}

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({
    isOpen,
    duration,
    onClose,
    props,
}: NotificationWrapperProps) => {
    const [visible, setVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            setIsFadingOut(false);

            if (duration > 0) {
                const timer = setTimeout(() => {
                    setIsFadingOut(true);
                    setTimeout(() => {
                        setVisible(false);
                        onClose?.();
                    }, 300);
                }, duration);

                return () => clearTimeout(timer);
            }
        } else {
            setIsFadingOut(true);
            setVisible(false);
        }
    }, [isOpen, duration, onClose]);

    if (!visible) return null;

    const { color, icon, title, description } = props || { color: 'info' as ColorKey, icon: 'info', title: '', description: '' };
    const { bg } = getColorClasses(color);

    return (
        <div className={`w-fit max-w-md items-center px-1 py-1 md:px-4 md:py-2 rounded-md ${bg} fixed top-5 left-1/2 transform -translate-x-1/2 z-notification shadow-lg shadow-gray-950 transition-all duration-500 ease-in-out ${isFadingOut ? 'opacity-0 -translate-y-full' : 'opacity-100 translate-y-0'}`}>
            <div className='flex items-center'>
                <i className={`fas fa-${icon} text-white text-lg md:text-xl mr-2 md:mr-6`} />
                <div className="text-pretty">
                    <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
                    <p className="text-md md:text-lg font-normal">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default NotificationWrapper;
