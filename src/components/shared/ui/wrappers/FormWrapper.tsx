'use client';
import React, { FormEvent, ReactNode, useRef, Children, cloneElement, isValidElement } from 'react';
import Button, { ButtonProps } from '@/components/shared/ui/buttons/Button';
import Box from '@/components/shared/ui/content/Box';
import { InputRef } from '@/components/shared/ui/inputs/Input';
import { DropMenuRef } from '@/components/shared/ui/inputs/DropMenu';
import Typography from '../text/Typography';

interface FormWrapperProps {
    children: ReactNode;
    onSubmit: (formData: FormData) => void | Promise<void>;
    buttons: Array<ButtonProps>;
    onError?: (error: Error) => void;
    className?: string;
    title?: string;
}

export default function FormWrapper({
    children,
    onSubmit,
    buttons,
    onError,
    className = '',
    title,
}: FormWrapperProps) {
    const formFieldRefs = useRef<(InputRef | DropMenuRef)[]>([]);
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar todos los campos personalizados primero
        let hasErrors = false;
        let firstErrorMessage = '';

        for (const fieldRef of formFieldRefs.current) {
            if (fieldRef && typeof fieldRef.validate === 'function') {
                const isValid = fieldRef.validate();
                if (!isValid && !hasErrors) {
                    hasErrors = true;
                    // Obtener el primer error para mostrarlo
                    firstErrorMessage = 'Hay errores en el formulario. Por favor, revisa los campos marcados.';
                }
            }
        }

        // Si hay errores en los campos personalizados, no continuar
        if (hasErrors) {
            if (onError) {
                onError(new Error(firstErrorMessage));
            }
            return;
        }

        // Check if form is valid using HTML5 validation
        const form = e.currentTarget;
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        try {
            const formData = new FormData(e.currentTarget);
            await onSubmit(formData);
        } catch (error) {
            const formError = error instanceof Error ? error : new Error('Unknown form error');
            if (onError) {
                onError(formError);
            } else {
                console.error('Form submission error:', formError);
            }
        }
    };

    const hasSubmitButton = buttons.some(button => button.htmlType === 'submit');

    if (!hasSubmitButton) {
        throw new Error('FormWrapper requires at least one submit button');
    }

    // Función para clonar children y asignar refs
    const renderChildren = (children: ReactNode): ReactNode => {
        let refIndex = 0;

        const cloneChild = (child: ReactNode): ReactNode => {
            if (!isValidElement(child)) {
                return child;
            }

            // Si es un Input o DropMenu, asignar ref
            if (child.type && ((child.type as any).displayName === 'Input' || (child.type as any).displayName === 'DropMenu')) {
                const currentRefIndex = refIndex++;
                return cloneElement(child as any, {
                    ...child.props,
                    ref: (ref: InputRef | DropMenuRef) => {
                        if (ref) {
                            formFieldRefs.current[currentRefIndex] = ref;
                        }
                    }
                });
            }

            // Si tiene children, procesarlos recursivamente
            if (child.props && (child.props as any).children) {
                return cloneElement(child as any, {
                    ...(child.props || {}),
                    children: Children.map((child.props as any).children, cloneChild)
                });
            }

            return child;
        };

        return Children.map(children, cloneChild);
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            {title && (
                <Typography variant="h2">{title}</Typography>
            )}
            {renderChildren(children)}

            <Box className="flex justify-evenly mt-4">
                {buttons.map((button, index) => (
                    <Button key={index} type={button.type || 'primary'} text={button.text} htmlType={button.htmlType} disabled={button.disabled} onClick={button.onClick} />
                ))}
            </Box>
        </form>
    );
};