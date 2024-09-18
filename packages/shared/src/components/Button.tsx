export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variants: string;
  disabled?: boolean;
}

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

export const Button = ({ label, onClick, variants, disabled, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${BUTTON_COLOR[variants]} w-full h-[48px] px-[16px] rounded-md text-[14px] font-bold box-border`}
      onClick={onClick}
      {...props}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
