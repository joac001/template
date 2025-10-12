"use client";

import React, { ReactNode, useEffect, useState } from "react";

const normalize = (c: string) =>
    c === "secondary" ? "accent" : c === "error" ? "danger" : c;

interface NotificationWrapperProps {
    children?: ReactNode;
    isOpen: boolean;
    duration: number;
    onClose?: () => void;
    props: {
        icon?: string;
        color?: string;
        title?: string;
        description?: string;
    };
}

const NotificationWrapper: React.FC<NotificationWrapperProps> = ({
    isOpen,
    duration,
    onClose,
    props,
}) => {
    const [visible, setVisible] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            setIsFadingOut(false);
            if (duration > 0) {
                const timer = setTimeout(() => {
                    setIsFadingOut(true);
                    const t2 = setTimeout(() => {
                        setVisible(false);
                        onClose?.();
                    }, 300);
                    return () => clearTimeout(t2);
                }, duration);
                return () => clearTimeout(timer);
            }
        } else {
            setIsFadingOut(true);
            setVisible(false);
        }
    }, [isOpen, duration, onClose]);

    if (!visible) return null;

    const {
        color = "info",
        icon = "info-circle",
        title = "",
        description = "",
    } = props || {};

    const variant = normalize(color);

    return (
        <div
            role="status"
            aria-live="polite"
            data-ntf={variant}
            className={[
                "fixed top-5 left-1/2 -translate-x-1/2 z-notification",
                "max-w-md w-fit rounded-xl px-3 py-2 md:px-4 md:py-3",
                "shadow-[0_10px_25px_-5px_rgba(0,0,0,.12),_0_8px_10px_-6px_rgba(0,0,0,.12)]",
                // 👇 usa el canal color:
                "bg-[color:var(--ntf-bg)] text-[color:var(--ntf-fg)]",
                "transition-all duration-500 ease-in-out",
                isFadingOut ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0",
            ].join(" ")}
        >
            <div className="flex items-start gap-3">
                <i className={`${icon} text-lg md:text-xl mt-0.5`} />
                <div className="text-pretty">
                    {!!title && <h2 className="text-base md:text-lg font-semibold">{title}</h2>}
                    {!!description && <p className="text-sm md:text-base font-normal opacity-90">{description}</p>}
                </div>
            </div>
        </div>
    );
};

export default NotificationWrapper;
