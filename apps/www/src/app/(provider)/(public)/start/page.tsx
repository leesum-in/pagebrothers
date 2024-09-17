import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시작하기',
};

function StartPage(): React.ReactNode {
  return <h1>시작하기</h1>;
}

export default StartPage;
