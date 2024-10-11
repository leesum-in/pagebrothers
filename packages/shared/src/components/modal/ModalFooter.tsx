import Button from '../button/Button';

interface ModalFooterProps {
  onApplyBtn: () => void;
  onPreviewBtn: () => void;
  applyBtnLabel: string;
  previewBtnLabel: string;
  applyBtnVariant?:
    | 'fill_primary'
    | 'fill_secondary'
    | 'fill_white'
    | 'ghost'
    | 'text_primary'
    | 'text_secondary';
  previewBtnVariant?:
    | 'fill_primary'
    | 'fill_secondary'
    | 'fill_white'
    | 'ghost'
    | 'text_primary'
    | 'text_secondary';
  applyBtnSize?: 'small' | 'medium' | 'large';
  previewBtnSize?: 'small' | 'medium' | 'large';
}

function ModalFooter({
  onApplyBtn,
  onPreviewBtn,
  applyBtnLabel,
  previewBtnLabel,
  applyBtnVariant = 'fill_primary',
  previewBtnVariant = 'fill_secondary',
  applyBtnSize = 'medium',
  previewBtnSize = 'medium',
}: ModalFooterProps) {
  return (
    <div className="flex justify-end space-x-4">
      <Button onClick={onPreviewBtn} variants={previewBtnVariant} size={previewBtnSize}>
        {previewBtnLabel}
      </Button>

      <Button onClick={onApplyBtn} variants={applyBtnVariant} size={applyBtnSize}>
        {applyBtnLabel}
      </Button>
    </div>
  );
}

export default ModalFooter;
