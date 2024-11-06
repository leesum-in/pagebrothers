import { ReactNode } from 'react';
import Label from './Label';

interface LabelWithSubProps {
  label?: string;
  subLabel?: string;
  addOn?: ReactNode;
  className?: string;
  addOnClassName?: string;
}

function LabelWithSub({ label, subLabel, addOn, className, addOnClassName }: LabelWithSubProps) {
  return (
    <>
      <Label label={label} addOn={addOn} className={className} addOnClassName={addOnClassName} />
      <div className="text-sm text-slate-400">{subLabel}</div>
    </>
  );
}

export default LabelWithSub;
