import PreviewButton from './PreviewButton';
import ShareButton from './ShareButton';

interface EditorButtonsProps {
  onPreview: () => void;
  onShare: () => void;
}

function EditorButtons({ onPreview, onShare }: EditorButtonsProps) {
  return (
    <div className="sticky bottom-0 ml-auto flex max-w-full items-center justify-end gap-4 p-4 desktop:p-8">
      <PreviewButton onPreview={onPreview} />
      <ShareButton onShare={onShare} />
    </div>
  );
}

export default EditorButtons;
