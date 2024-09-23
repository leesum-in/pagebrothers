export interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variants: 'primary' | 'default' | 'white' | 'dashed' | 'textPrimary' | 'textDefault';
  size: 'small' | 'medium' | 'large';
  disabled?: boolean;
  addition?: string;
}

export const Button = ({
  children,
  onClick,
  variants,
  size,
  disabled,
  addition,
  ...props
}: ButtonProps) => {
  const BUTTON_COLOR: { [key: string]: string } = {
    primary: 'bg-indigo-600 text-white drop-shadow-md hover:bg-indigo-700 disabled:opacity-40',
    default:
      'bg-slate-100 border border-solid border-slate-200 text-slate-900 drop-shadow-md hover:bg-slate-200 disabled:opacity-40',
    white:
      'bg-white border border-solid border-slate-200 text-slate-900 drop-shadow-md hover:bg-slate-50 disabled:opacity-40',
    dashed:
      'bg-transparent border border-dashed border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-700 disabled:opacity-40',
    textPrimary: 'bg-transparent text-indigo-600 hover:text-indigo-700 disabled:opacity-40',
    textDefault: 'bg-transparent text-slate-700 hover:text-slate-800 disabled:opacity-40',
  };

  const BUTTON_SIZE: { [key: string]: string } = {
    small: `h-[32px] ${/^text/g.test(variants) ? 'px-[4px]' : 'px-[8px]'} text-[12px] rounded-[4px] gap-[2px]`,
    medium: `h-[48px] ${/^text/g.test(variants) ? 'px-[4px]' : 'px-[16px]'} text-[14px] rounded-[6px] gap-[4px]`,
    large: `h-[56px] ${/^text/g.test(variants) ? 'px-[4px]' : 'px-[24px]'} text-[16px] rounded-[8px] gap-[4px]`,
  };
  return (
    <button
      type="button"
      className={`${BUTTON_COLOR[variants]} ${BUTTON_SIZE[size]} ${addition} flex justify-center items-center font-bold box-border `}
      onClick={onClick}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
