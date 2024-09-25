interface RadioProps {
  label: 'small' | 'large' | 'none';
  selected: boolean;
  disabled?: boolean;
  labelText?: string;
  onChange: (value: boolean) => void;
}

// 라벨별 스타일
const getRadioStateStyles = (label: 'small' | 'large' | 'none') => {
  switch (label) {
    case 'small':
      return 'w-[1.125rem] h-[1.125rem] p-[0.28125rem] gap-0 rounded-full border-[0.1rem] border-slate-100';
    case 'large':
      return 'w-[1.25rem] h-[1.25rem] p-[0.3125rem] gap-0 rounded-full border-[0.1rem] border-slate-100';
    case 'none':
    default:
      return 'w-[1.5rem] h-[1.5rem] p-[0.375rem] gap-0 rounded-full border-[0.1rem] border-slate-100';
  }
};

// 라벨별 텍스트 스타일
const getTextStyle = (label: 'small' | 'large' | 'none') => {
  switch (label) {
    case 'small':
      return 'text-[0.875rem] font-normal leading-[1.4rem] tracking-[-0.04em] text-justify';
    case 'large':
      return 'text-[1rem] font-normal leading-[1.6rem] tracking-[-0.04em] text-justify';
    case 'none':
    default:
      return 'hidden';
  }
};

// 선택된 상태에서 라디오 버튼 안의 작은 원의 스타일
const getSelectedCircleStyle = (label: 'small' | 'large' | 'none') => {
  switch (label) {
    case 'small':
      return 'w-[0.5625rem] h-[0.5625rem] rounded-full';
    case 'large':
      return 'w-[0.625rem] h-[0.625rem] rounded-full';
    case 'none':
    default:
      return 'w-[0.75rem] h-[0.75rem] rounded-full';
  }
};

const Radio = ({ label, selected, disabled = false, labelText = '', onChange }: RadioProps) => {
  return (
    <div
      className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={() => !disabled && onChange(!selected)}
    >
      <div
        className={`relative flex items-center justify-center ${getRadioStateStyles(label)} ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {selected && (
          <div
            className={`absolute ${getSelectedCircleStyle(label)} ${disabled ? 'bg-slate-200' : 'bg-indigo-500'} 
              top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
          />
        )}
      </div>
      <span className={`ml-[0.5rem] text-slate-600 ${getTextStyle(label)}`}>{labelText}</span>
    </div>
  );
};

export default Radio;
