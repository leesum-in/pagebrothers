interface ModalFooterProps {
  onApplyBtn: () => void;
  onPreviewBtn?: () => void;
  applyBtnLabel: string;
  previewBtnLabel?: string;
}

const ModalFooter = ({
  onApplyBtn,
  onPreviewBtn,
  applyBtnLabel,
  previewBtnLabel,
}: ModalFooterProps) => {
  return (
    <div className="flex justify-end space-x-4">
      <button
        onClick={onPreviewBtn}
        className="bg-slate-100 font-bold border border-slate-200 text-sm rounded-md px-4 h-12 hover:bg-slate-300 transition-colors "
      >
        {previewBtnLabel}
      </button>

      <button
        onClick={onApplyBtn}
        className="bg-indigo-600 font-bold text-white text-sm rounded-md px-4 hover:bg-indigo-700 transition-colors "
      >
        {applyBtnLabel}
      </button>
    </div>
  );
};

export default ModalFooter;
