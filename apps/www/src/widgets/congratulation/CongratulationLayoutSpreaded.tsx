interface CongratulationLayoutSpreadedProps {
  className: string;
}

function CongratulationLayoutSpreaded({ className }: CongratulationLayoutSpreadedProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect opacity="0.5" x="3" y="5" width="12" height="4" rx="2" fill="#6366F1" />
      <rect opacity="0.5" x="3" y="13" width="18" height="6" rx="1" fill="#94A3B8" />
    </svg>
  );
}

export default CongratulationLayoutSpreaded;
