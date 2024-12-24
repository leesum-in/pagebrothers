import { Button } from '@repo/shared';

interface PreviewButtonProps {
  onPreview: () => void;
}

function PreviewButton({ onPreview }: PreviewButtonProps) {
  return (
    <Button variants="fill_secondary" size="medium" onClick={onPreview}>
      미리보기
    </Button>
  );
}

export default PreviewButton;
