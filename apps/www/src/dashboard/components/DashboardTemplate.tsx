import { PageWrapper } from '@/ui/wrapper';
import DashboardHeader from './DashboardHeader';

// 이 컴포넌트는 폴더 위치 및 구조에 대한 논의가 필요합니다.
function DashboardTemplate() {
  return (
    <PageWrapper>
      <div className="mx-auto w-full max-w-2xl space-y-10">
        <DashboardHeader />
      </div>
    </PageWrapper>
  );
}

export default DashboardTemplate;
