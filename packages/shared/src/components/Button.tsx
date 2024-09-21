export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variants: string;
  size: string;
  disabled?: boolean;
  width?: string;
}

export const Button = ({ label, onClick, variants, size, disabled, ...props }: ButtonProps) => {
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
    small: `h-[32px] ${/^text/g.test(variants) ? 'px-[4px]' : 'px-[8px]'} text-[12px] rounded-[4px]`,
    medium: `h-[48px] ${/^text/g.test(variants) ? 'px-[4px]' : 'px-[16px]'} text-[14px] rounded-[6px]`,
    large: `h-[56px] ${/^text/g.test(variants) ? 'px-[4px]' : 'px-[24px]'} text-[16px] rounded-[8px]`,
  };
  return (
    <button
      type="button"
      className={`${BUTTON_COLOR[variants]} ${BUTTON_SIZE[size]} font-bold box-border`}
      onClick={onClick}
      {...props}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
