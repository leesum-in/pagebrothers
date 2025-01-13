interface CongratulationLayoutCollapsibleProps {
  className: string;
}

function CongratulationLayoutCollapsible({ className }: CongratulationLayoutCollapsibleProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect opacity="0.5" x="6" y="6" width="12" height="4" rx="2" fill="#94A3B8" />
      <rect opacity="0.5" x="3" y="13" width="18" height="5" rx="1" fill="#6366F1" />
    </svg>
  );
}

export default CongratulationLayoutCollapsible;
