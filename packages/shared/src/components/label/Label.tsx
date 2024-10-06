import type { ReactNode } from 'react';
import { cn } from '../../utils';

// 피그마에 따르면
// 1. w.Help text : boolean 이고
// 2. Label 은 string
// 3. Icon 은 check 라고 되어 있는데, 이건 뭔지 모르겠음.

// 그런데 helpText 를 ReactNode 로 한 이유는
// 실제 사이트를 보면 토글도 받고 이것저것 받는듯 해서 일단 ReactNode 로 받도록 함.
// Icon 은 도대체 어디에 쓰는 건지 모르겠어서 일단 빼놓음.
interface ElementLabelProps {
  helpText?: ReactNode;
  label: string;
  className?: string;
}

function Label({ label, helpText, className }: ElementLabelProps) {
  return (
    <div className={cn('flex items-center justify-between text-slate-600', className)}>
      <div className="font-bold">{label}</div>
      <div className="text-sm">{helpText ? helpText : null}</div>
    </div>
  );
}

export default Label;
