import { cn } from '@repo/shared';
import type { PropsWithChildren } from 'react';

interface PageWrapperProps extends PropsWithChildren {
  className?: string;
  extraChildren?: React.ReactNode;
  extraClassName?: string;
}

function PageWrapper({ children, extraChildren, className, extraClassName }: PageWrapperProps) {
  return (
    <div className={cn('flex flex-1 flex-col', className)}>
      <div
        className={cn(
          'flex flex-1 flex-col gap-4 p-4 desktop:flex-row desktop:gap-8',
          extraClassName,
        )}
      >
        {children}
      </div>
      {extraChildren}
    </div>
  );
}

export default PageWrapper;
