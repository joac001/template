export default function Button({
    type, // 'primary' | 'accent' | 'neutral' | 'success'
    text,
    disabled = false,
    onClick,
    htmlType = 'button',
}: {
    type?: 'primary' | 'accent' | 'neutral' | 'success';
    text: string;
    disabled?: boolean;
    onClick?: () => void;
    htmlType?: 'button' | 'submit' | 'reset';
}) {
    return (
        <button
            type={htmlType}
            data-variant={type ?? undefined}
            className={`
        flex w-fit h-fit
        ${type ? 'bg-[var(--btn-bg)] hover:bg-[var(--btn-hover)] --border-light --border-soft text-white' : 'bg-transparent text-black border-transparent'}
        ${type ? 'bg-[image:var(--btn-bg-gradient)]' : ''}
        rounded-full border-2 px-3 py-2 md:px-3 md:py-1
        transition-all duration-200 ease-in-out
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
      `}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="font-semibold text-md md:text-lg md:font-bold text-pretty">{text}</span>
        </button>
    );
}
