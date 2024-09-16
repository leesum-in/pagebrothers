export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variants: string;
}

const BUTTON_COLOR: { [key: string]: string } = {
  primary: 'bg-[#4F46E5] text-[#fff] drop-shadow-md',
  default: 'bg-[#F1F5F9] border border-solid border-[#E2E8F0] text-[#0F172A] drop-shadow-md',
  white: 'bg-[#fff] border border-solid border-[#E2E8F0] text-[#0F172A] drop-shadow-md',
  dashed: 'bg-transparent border border-dashed border-[#CBD5E1] text-[#475569]',
  textPrimary: 'bg-transparent text-[#4F46E5]',
  textDefault: 'bg-transparent text-black',
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
