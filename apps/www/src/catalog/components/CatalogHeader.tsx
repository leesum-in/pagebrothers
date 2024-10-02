import { Button } from '@repo/shared';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

function CatalogHeader() {
  return (
    <header className="desktop:flex desktop:items-center">
      <div className="space-y-2 desktop:flex-1 desktop:space-y-4">
        <h1 className="whitespace-pre-line text-2xl font-black text-slate-800 desktop:text-5xl">
          마음에 드는 탬플릿을 골라보세요.
        </h1>
        <p className="text-slate-500 desktop:text-xl">
          원한다면 빈 화면으로 처음부터 만들어볼 수도 있어요.
        </p>
      </div>
      <Link className="mt-4 inline-flex flex-none desktop:mt-0" href="/start">
        <Button
          variants="fill_white"
          size="large"
          className="hidden desktop:flex h-14 rounded-lg px-6 text-base border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
        >
          처음부터 만들기
          <FaChevronRight className="text-lg" />
        </Button>
        <Button
          variants="fill_white"
          size="large"
          className="flex desktop:hidden h-12 rounded-md px-4 text-sm border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
        >
          처음부터 만들기
          <FaChevronRight className="text-lg" />
        </Button>
      </Link>
    </header>
  );
}

export default CatalogHeader;
