export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variants: string;
}

const BUTTON_COLOR: { [key: string]: string } = {
  primary: 'bg-indigo-600 text-white drop-shadow-md hover:bg-indigo-700',
  default:
    'bg-slate-100 border border-solid border-slate-200 text-slate-900 drop-shadow-md hover:bg-slate-200',
  white:
    'bg-white border border-solid border-slate-200 text-slate-900 drop-shadow-md hover:bg-slate-50',
  dashed:
    'bg-transparent border border-dashed border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-700',
  textPrimary: 'bg-transparent text-indigo-600 hover:text-indigo-700',
  textDefault: 'bg-transparent text-slate-700 hover:text-slate-800',
};

export const Button = ({ label, onClick, variants, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${BUTTON_COLOR[variants]} w-full h-[48px] px-[16px] rounded-md text-[14px] font-bold box-border`}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
