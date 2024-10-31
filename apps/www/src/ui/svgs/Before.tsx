interface BeforeProps {
  className: string;
  isDouble?: boolean;
}

function Before({ className, isDouble }: BeforeProps) {
  return (
    <svg
      className={className}
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isDouble ? (
        <>
          <polyline points="11 17 6 12 11 7" />
          <polyline points="18 17 13 12 18 7" />
        </>
      ) : (
        <polyline points="15 18 9 12 15 6" />
      )}
    </svg>
  );
}

export default Before;
