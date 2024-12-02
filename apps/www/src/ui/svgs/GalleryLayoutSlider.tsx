interface GalleryLayoutSliderProps {
  className: string;
}

function GalleryLayoutSlider({ className }: GalleryLayoutSliderProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect opacity="0.5" x="1" y="3" width="10" height="18" rx="2" fill="#6366F1" />
      <rect opacity="0.5" x="13" y="3" width="10" height="18" rx="2" fill="#6366F1" />
    </svg>
  );
}

export default GalleryLayoutSlider;
