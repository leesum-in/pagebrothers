import type { ReactNode } from 'react';
import { cn } from '../../utils';

interface ElementLabelProps {
  label?: string;
  addOn?: ReactNode;
  className?: string;
  addOnClassName?: string;
}

function Label({ label, addOn, className, addOnClassName }: ElementLabelProps) {
  return (
    <div className={cn('flex items-center justify-between text-slate-600', className)}>
      <div className="font-bold">{label ? label : null}</div>
      <div className={cn('text-sm', addOnClassName)}>{addOn ? addOn : null}</div>
    </div>
  );
}

export default Label;
