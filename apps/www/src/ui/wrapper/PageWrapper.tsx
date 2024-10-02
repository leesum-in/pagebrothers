import { PropsWithChildren } from 'react';

// 이 컴포넌트는 완전히 임시입니다...
function PageWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <div className="flex-1 px-4 py-16 desktop:py-24">
        <div className="mx-auto w-full max-w-2xl space-y-10">{children}</div>
      </div>
    </div>
  );
}

export default PageWrapper;
