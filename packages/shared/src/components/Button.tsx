export interface ButtonProps {
  label: string;
  onClick?: () => void;
  colorType: string;
}

const BUTTON_COLOR: { [key: string]: string } = {
  primary: 'bg-[#4F46E5] text-[#fff]',
};

export const Button = ({ label, onClick, colorType, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${BUTTON_COLOR[colorType]} w-full h-[48px] px-[16px] rounded-md text-[14px] font-bold box-border drop-shadow-md`}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
