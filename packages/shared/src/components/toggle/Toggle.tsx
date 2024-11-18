import { Label } from '..';

interface ToggleProps {
  label?: 'left' | 'right' | 'none';
  toggleOn: boolean;
  disabled?: boolean;
  labelText?: string;
  onChange: (checked: boolean) => void;
}

// 토글 컨테이너 상태별 스타일
const getToggleStyles = (disabled: boolean, enabled: boolean) => {
  switch (true) {
    case disabled && enabled:
      return 'w-[3.25rem] h-[1.5rem] rounded-full bg-indigo-100 border border-slate-200';
    case disabled:
      return 'w-[3.25rem] h-[1.5rem] rounded-full bg-slate-100 border border-slate-200';
    case enabled:
      return 'w-[3.25rem] h-[1.5rem] rounded-full bg-indigo-500 border border-slate-200';
    default:
      return 'w-[3.25rem] h-[1.5rem] rounded-full bg-slate-100 border border-slate-200';
  }
};

// 토글 버튼 상태별 스타일
const getCircleStyles = (disabled: boolean, enabled: boolean) => {
  switch (true) {
    case disabled && enabled:
      return 'w-[1.75rem] h-[1.75rem] rounded-full bg-slate-50 border border-slate-200 translate-x-[1.75rem]';
    case disabled:
      return 'w-[1.75rem] h-[1.75rem] rounded-full bg-slate-50 border border-slate-200 translate-x-[-0.25rem]';
    case enabled:
      return 'w-[1.75rem] h-[1.75rem] rounded-full bg-white border border-slate-200 shadow-[0_0_0.5rem_#0000000A,_-0.125rem_0_0.125rem_#0000001F] translate-x-[1.75rem]';
    default:
      return 'w-[1.75rem] h-[1.75rem] rounded-full bg-white border border-slate-200 shadow-[0_0_0.5rem_#0000000A,_0.125rem_0_0.125rem_#0000000A] translate-x-[-0.25rem]';
  }
};

function Toggle({ label = 'left', toggleOn, disabled = false, labelText, onChange }: ToggleProps) {
  return (
      >
        />
  );
}

export default Toggle;
