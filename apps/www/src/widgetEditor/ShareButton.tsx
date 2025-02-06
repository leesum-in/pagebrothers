import { Button } from '@repo/shared';

interface ShareButtonProps {
  onShare: () => void;
}

function ShareButton({ onShare }: ShareButtonProps) {
  return (
    <Button variants="fill_primary" size="medium" onClick={onShare}>
      다음: 공유 설정
    </Button>
  );
}

export default ShareButton;
