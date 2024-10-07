import { cn } from '../../utils';

interface ElementDescriptionProps {
  state?: 'error' | 'success' | 'normal';
  description: string;
  className?: string;
}

function Description({ state = 'normal', description, className }: ElementDescriptionProps) {
  return (
    <div
      className={cn(
        'text-sm',
        {
          'text-red-500': state === 'error',
          'text-indigo-700': state === 'success',
          'text-slate-400': state === 'normal',
        },
        className,
      )}
    >
      {description}
    </div>
  );
}

export default Description;
