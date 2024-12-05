interface VerticalProps {
  className?: string;
}

export default function Vertical({ className }: VerticalProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="6.5" y="7" width="12" height="3" rx="1.5" fill="#94A3B8" />
      <rect x="4.5" y="14" width="16" height="3" rx="1.5" fill="#E2E8F0" />
    </svg>
  );
}
