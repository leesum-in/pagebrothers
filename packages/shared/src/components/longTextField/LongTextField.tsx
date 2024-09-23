import { useCallback } from 'react';

interface LongTextFieldProps {
  status: 'default' | 'hover' | 'focused' | 'completed' | 'error' | 'disabled';
  label?: boolean;
  description?: boolean;
  labelText?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  descriptionText?: string;
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
  description = true,
  labelText = '',
  value,
  onChange,
  placeholder,
  descriptionText = '',
}: LongTextFieldProps) => {
  const handleTextareaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div>
      {label && (
        <div className="flex items-center w-full h-[2.5rem] gap-2">
          <label className="block text-slate-500">{labelText}</label>
        </div>
      )}
      <div
        className={`w-full h-[8rem] max-w-full max-h-full rounded-md ${getTextFieldStyle(status)}`}
      >
        <textarea
          className={`w-full h-full max-w-full max-h-full ${
            status === 'disabled' ? 'bg-slate-50' : 'bg-white'
          } focus:outline-none border-none resize`}
          value={value}
          onChange={handleTextareaChange}
          disabled={status === 'disabled'}
          placeholder={placeholder}
        />
      </div>
      {description && (
        <div className="flex items-center w-full h-[1.625rem] pt-1 gap-2">
          <p className={status === 'error' ? 'text-red-500' : 'text-slate-500'}>
            {descriptionText}
          </p>
        </div>
      )}
    </div>
  );
};

export default LongTextField;
