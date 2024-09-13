export interface ButtonProps {
  label: string;
  onClick?: () => void;
  backgroundColor: string;
}

export const Button = ({ label, onClick, backgroundColor, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`${backgroundColor} w-full h-[48px] px-[16px] rounded-md`}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
