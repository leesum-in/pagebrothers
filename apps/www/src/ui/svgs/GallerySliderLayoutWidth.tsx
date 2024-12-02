interface GallerySliderLayoutWidthProps {
  className?: string;
}

function GallerySliderLayoutWidth({ className }: GallerySliderLayoutWidthProps) {
  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect opacity="0.5" x="4" y="3" width="12" height="18" rx="2" fill="#94A3B8" />
      <rect opacity="0.5" x="18" y="3" width="12" height="18" rx="2" fill="#94A3B8" />
      <rect opacity="0.5" x="32" y="3" width="12" height="18" rx="2" fill="#94A3B8" />
      <path
        d="M1.51468 12.8962C1.25468 12.6961 1.25468 12.3039 1.51468 12.1038L2.445 11.3876C2.77379 11.1345 3.25 11.3689 3.25 11.7838L3.25 13.2162C3.25 13.6311 2.77379 13.8655 2.445 13.6124L1.51468 12.8962Z"
        fill="#6366F1"
      />
      <path
        d="M46.4853 12.1038C46.7453 12.3039 46.7453 12.6961 46.4853 12.8962L45.555 13.6124C45.2262 13.8655 44.75 13.6311 44.75 13.2162V11.7838C44.75 11.3689 45.2262 11.1345 45.555 11.3876L46.4853 12.1038Z"
        fill="#6366F1"
      />
    </svg>
  );
}

export default GallerySliderLayoutWidth;
