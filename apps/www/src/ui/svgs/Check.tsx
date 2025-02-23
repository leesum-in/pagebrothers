interface CheckProps {
  className: string;
}

function Check({ className }: CheckProps) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth="3"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default Check;
