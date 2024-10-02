import { PropsWithChildren } from 'react';

// 이 컴포넌트는 완전히 임시입니다...
function PageWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <div className="flex-1 px-4 py-16 desktop:py-24">{children}</div>
    </div>
  );
}

export default PageWrapper;
