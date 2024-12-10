interface HorizontalProps {
  className?: string;
}

export default function Horizontal({ className }: HorizontalProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="16" y="11" width="5" height="3" rx="1.5" fill="#94A3B8" />
      <rect x="3" y="11" width="11" height="3" rx="1.5" fill="#E2E8F0" />
    </svg>
  );
}
