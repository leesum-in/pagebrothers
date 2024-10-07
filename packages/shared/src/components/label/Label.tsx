import type { ReactNode } from 'react';
import { cn } from '../../utils';

interface ElementLabelProps {
  addOn?: ReactNode;
  label: string;
  className?: string;
}

function Label({ label, addOn, className }: ElementLabelProps) {
  return (
    <div className={cn('flex items-center justify-between text-slate-600', className)}>
      <div className="font-bold">{label}</div>
      <div className="text-sm">{addOn ? addOn : null}</div>
    </div>
  );
}

export default Label;
