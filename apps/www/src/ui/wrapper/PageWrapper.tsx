import { PropsWithChildren } from 'react';

// 이 컴포넌트는 완전히 임시입니다...
// overflow-x-hidden
// bg-slate-50
// 이런 클래스들을 props로 받아야 할 것 같기도..
function PageWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <div className="flex-1 px-4 py-16 desktop:py-24">{children}</div>
    </div>
  );
}

export default PageWrapper;
