'use client';

import { useState, useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from "react";
import Box from "@/components/shared/ui/content/Box";
import { getColorClasses } from "@/types/ColorType";

export interface DropMenuOption {
    value: string | number;
    label?: string;
}

interface DropMenuProps {
    options: DropMenuOption[];
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    name?: string; // Para FormData
    defaultValue?: string | number | null; // Para formularios no controlados
    // Callback para comunicar cambios de valor al padre
    onValueChange?: (value: string | number | null) => void;
    // Valor controlado desde el padre
    value?: string | number | null;
    // Callback para comunicar estado de validación al padre
    onValidationChange?: (isValid: boolean, errorMessage: string | null) => void;
    required?: boolean;
    customErrorMessage?: string | null;
}

export interface DropMenuRef {
    getValue: () => string | number | null;
    setValue: (value: string | number | null) => void;
    validate: () => boolean;
    focus: () => void;
}

const DropMenu = forwardRef<DropMenuRef, DropMenuProps>(({
    options,
    disabled = false,
    placeholder = "Selecciona una opción",
    label = "",
    name,
    defaultValue,
    onValueChange,
    value,
    onValidationChange,
    required = false,
    customErrorMessage,
}, ref) => {

    const [selectedValue, setSelectedValue] = useState<string | number | null>(value ?? defaultValue ?? null);
    const [selectedLabel, setSelectedLabel] = useState<string>(placeholder);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const isEmpty = (val: string | number | null): boolean => val === null || val === undefined || val === '';

    const performValidation = useCallback((val: string | number | null): { isValid: boolean; errorMessage: string | null } => {
        if (customErrorMessage !== undefined && customErrorMessage !== null && customErrorMessage !== '') {
            return { isValid: false, errorMessage: customErrorMessage };
        }

        if (required && isEmpty(val)) {
            return { isValid: false, errorMessage: 'Este campo es requerido.' };
        }

        return { isValid: true, errorMessage: null };
    }, [customErrorMessage, required]);

    // Función para obtener la etiqueta de una opción basada en su valor
    const getLabelByValue = useCallback((val: string | number | null): string => {
        if (val === null || val === undefined) return placeholder;
        const option = options.find(opt => opt.value === val);
        return option ? (option.label ?? String(option.value)) : placeholder;
    }, [options, placeholder]);

    // Manejar selección de opción
    const handleSelectOption = (option: DropMenuOption) => {
        if (disabled) return;

        setSelectedValue(option.value);
        setSelectedLabel(option.label ?? String(option.value));
        setIsOpen(false);

        const validation = performValidation(option.value);
        setIsValid(validation.isValid);
        setErrorMessage(validation.errorMessage);

        // Notificar al padre sobre el cambio de valor
        if (onValueChange) {
            onValueChange(option.value);
        }
    };

    // Manejar toggle del dropdown
    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
        }
    };

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Sincronizar valor controlado desde el padre
    useEffect(() => {
        if (value !== undefined && value !== selectedValue) {
            setSelectedValue(value);
            setSelectedLabel(getLabelByValue(value));
        }
    }, [value, selectedValue, getLabelByValue]);

    // Sincronizar valor inicial
    useEffect(() => {
        if (selectedValue !== null) {
            setSelectedLabel(getLabelByValue(selectedValue));
        }
    }, [selectedValue, getLabelByValue]);

    // Validar cuando el valor cambia o dependencias relevantes se actualizan
    useEffect(() => {
        const validation = performValidation(selectedValue);
        setIsValid(validation.isValid);
        setErrorMessage(validation.errorMessage);
    }, [selectedValue, performValidation]);

    // Notificar al padre sobre el estado de validación
    useEffect(() => {
        if (onValidationChange) {
            onValidationChange(isValid, errorMessage);
        }
    }, [isValid, errorMessage, onValidationChange]);

    // Exponer métodos a través de ref
    useImperativeHandle(ref, () => ({
        getValue: () => selectedValue,
        setValue: (value: string | number | null) => {
            setSelectedValue(value);
            setSelectedLabel(getLabelByValue(value));
        },
        validate: () => {
            const validation = performValidation(selectedValue);
            setIsValid(validation.isValid);
            setErrorMessage(validation.errorMessage);
            return validation.isValid;
        },
        focus: () => dropdownRef.current?.focus()
    }));

    const { bg: bgSelectedLabel, bgHover: bgHoverLabel } = getColorClasses('primary');

    return (
        <Box className="relative w-full">
            {/* Input hidden para FormData */}
            <input
                ref={hiddenInputRef}
                type="hidden"
                name={name}
                value={selectedValue ?? ''}
                required={required}
            />
            {label && (
                <Box className="flex flex-row">
                    <label className="text-md font-medium md:text-lg">{label}</label>
                    {required && <span className="pl-1 text-sm font-semibold text-red-500 sm:text-base md:text-lg">*</span>}
                </Box>
            )}
            <div ref={dropdownRef} >
                <Box
                    className={`flex w-full items-center justify-between ${isOpen ? 'rounded-t-lg rounded-b-none' : 'rounded-lg'} border ${isValid ? 'border-white/15' : 'border-red-500'} bg-slate-800 cursor-pointer px-3 py-2 text-md md:text-lg transition-all duration-200 ease-in-out ${disabled ? 'cursor-not-allowed opacity-50' : isValid ? 'hover:border-white/30' : 'hover:border-red-500'}`}
                    onClick={handleToggle}
                >
                    <span className={selectedValue === null ? 'text-gray-400' : ''}>
                        {selectedLabel}
                    </span>
                    <i className={`fas fa-angle-down text-sm md:text-md transition-all duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                </Box>

                {(isOpen && !disabled &&
                    <Box className={`absolute left-0 right-0 z-50 max-h-60 overflow-y-auto border border-white/15 bg-slate-800/90 cursor-pointer shadow-xl backdrop-blur transition-all duration-100 ease-in-out ${isOpen ? 'rounded-b-lg rounded-t-none' : 'rounded-lg'}`}>
                        {options.length === 0 ? (
                            // Quede aca
                            <Box className="p-2 md:p-3 text-center text-md md:text-lg text-gray-400">
                                No hay opciones disponibles
                            </Box>
                        ) : (
                            options.map((option, index) => (
                                <Box
                                    key={`${option.value}-${index}`}
                                    className={`p-2 md:p-3 text-md md:text-lg text-pretty transition-all duration-600 ease-out ${selectedValue === option.value ? bgSelectedLabel : ''} ${bgHoverLabel}`}
                                    onClick={() => handleSelectOption(option)}
                                >
                                    {option.label || option.value}
                                </Box>
                            ))
                        )}
                    </Box>
                )}
            </div>
            {!isValid && errorMessage && (
                <Box className="text-xs md:text-md font-light text-red-500">
                    {errorMessage}
                </Box>
            )}
        </Box>
    );
});

DropMenu.displayName = 'DropMenu';

export default DropMenu;
