import { cn } from '../../utils';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variants:
    | 'fill_primary'
    | 'fill_secondary'
    | 'fill_white'
    | 'ghost'
    | 'text_primary'
    | 'text_secondary';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

function Button({
  children,
  onClick,
  variants,
  size,
  disabled,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  const BUTTON_COLOR: Record<string, string> = {
    fill_primary: 'bg-indigo-600 text-white drop-shadow-md hover:bg-indigo-700 disabled:opacity-40',
    fill_secondary:
      'bg-slate-100 border border-solid border-slate-200 text-slate-900 drop-shadow-md hover:bg-slate-200 disabled:opacity-40',
    fill_white:
      'bg-white border border-solid border-slate-200 text-slate-900 drop-shadow-md hover:bg-slate-50 disabled:opacity-40',
    ghost:
      'bg-transparent border border-dashed border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-700 disabled:opacity-40',
    text_primary: 'bg-transparent text-indigo-600 hover:text-indigo-700 disabled:opacity-40',
    text_secondary: 'bg-transparent text-slate-700 hover:text-slate-800 disabled:opacity-40',
  };

  const BUTTON_SIZE: Record<string, string> = {
    small: `h-[32px] ${/^text/g.test(variants) ? 'px-[4px]' : 'px-[8px]'} text-[12px] rounded-[4px] gap-[2px]`,
    medium: `h-[48px] ${/^text/g.test(variants) ? 'px-[4px]' : 'px-[16px]'} text-[14px] rounded-[6px] gap-[4px]`,
    large: `h-[56px] ${/^text/g.test(variants) ? 'px-[4px]' : 'px-[24px]'} text-[16px] rounded-[8px] gap-[4px]`,
  };
  return (
    <button
      type={type}
      className={cn(
        `${BUTTON_COLOR[variants]} ${BUTTON_SIZE[size]} flex justify-center items-center font-bold box-border ${className}`,
      )}
      onClick={onClick}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
