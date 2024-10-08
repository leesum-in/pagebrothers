import { Description, Label } from '..';
import { cn } from '../../utils';

interface LongTextFieldProps {
  status: 'default' | 'hover' | 'focused' | 'completed' | 'error' | 'disabled';
  label?: boolean;
  labelText?: string;
  description?: boolean;
  descriptionText?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const getTextFieldStyle = (status: LongTextFieldProps['status']) => {
  const baseStyles = 'w-full h-[8rem] p-4 border bg-white transition-shadow rounded-md';

  const statusStyles = {
    hover: 'shadow-[0_4px_12px_0_rgba(19,32,57,0.1),_0_8px_20px_0_rgba(19,32,57,0.03)]',
    focused: 'border-indigo-700 caret-indigo-700',
    completed: 'border-slate-200',
    error: 'border-red-500',
    disabled: '!bg-slate-50 border-slate-200',
    default: 'border-slate-200',
  };

  return `${baseStyles} ${statusStyles[status]}`;
};

const LongTextField = ({
  status = 'default',
  label = true,
  labelText = '',
  description = true,
  descriptionText = '',
  placeholder,
  value,
  onChange,
  className,
}: LongTextFieldProps) => {
  return (
    <div>
      {label && (
        <div className="flex items-center w-full h-[2.5rem] gap-2">
          <Label label={labelText} className="mb-2" />
        </div>
      )}
      <div
        className={`w-full h-[8rem] max-w-full max-h-full rounded-md ${getTextFieldStyle(status)} ${
          status !== 'disabled' &&
          'hover:shadow-[0_4px_12px_0_rgba(19,32,57,0.1),_0_8px_20px_0_rgba(19,32,57,0.03)]'
        }`}
      >
        <textarea
          className={cn(
            `text-p1 w-full h-full max-w-full max-h-full focus:outline-none border-none resize ${
              status === 'disabled' ? 'bg-slate-50' : 'bg-white'
            } ${className}`,
          )}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={status === 'disabled'}
          placeholder={placeholder}
        />
      </div>
      {description && (
        <div className="text-p2 flex items-center w-full h-[1.625rem] pt-1 gap-2">
          <Description
            state={status === 'error' ? 'error' : 'normal'}
            description={descriptionText}
          />
        </div>
      )}
    </div>
  );
};

export default LongTextField;
