import type { PropsWithChildren } from 'react';

import { Navigation } from '@/ui/navigation';

function EditIdLayout({ children }: PropsWithChildren): React.ReactNode {
  return (
    <>
      <Navigation />
      <div className="flex flex-1 flex-col bg-slate-50">
        <div className="flex flex-1 flex-col gap-4 p-4 desktop:flex-row desktop:gap-8 desktop:p-8">
          {children}
        </div>
      </div>
    </>
  );
}

export default EditIdLayout;
