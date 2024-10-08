import type { IntroWidgetItem } from '@/types/pageBrothers.type';
import { WidgetWrapper } from '@/widget/common';

function IntroWidget(widgetItem: IntroWidgetItem): React.ReactNode {
  return (
    <WidgetWrapper title="동영상">
      <div className="no-interaction">
        <div className="relative space-y-6 bg-theme-colored/5 py-12 leading-relaxed">
          <header className="space-y-1 text-center">
            <p className="whitespace-nowrap text-em-xs text-theme-black/30">
              {widgetItem.config.subTitle}
            </p>
            <h1 className="whitespace-pre-line empty:hidden space-y-0 text-em-xl font-bold ">
              <p className="[&amp;>a]:text-theme-colored [&amp;>a]:underline">
                {widgetItem.config.title}
              </p>
            </h1>
          </header>
          <div className="relative flex items-center">
            <div className="center-flex h-10 w-10 flex-none rotate-90">
              <div className="center-flex h-9 gap-2 text-slate-300 ">
                <span className="h-px w-8 bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="h-px w-8 bg-current" />
              </div>
            </div>
            <div className="relative isolate mx-auto aspect-[3/4] flex-1 overflow-hidden rounded-full bg-theme-black/5 leading-0">
              <div className="flex h-full w-full items-center justify-center p-4 text-center leading-normal">
                {widgetItem.config.coverImage ? (
                  <div />
                ) : (
                  <p className="opacity-50">대표 이미지가 들어갈 자리에요</p>
                )}
              </div>
            </div>
            <div className="center-flex h-10 w-10 flex-none -rotate-90">
              <div className="center-flex h-9 gap-2 text-slate-300 ">
                <span className="h-px w-8 bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="h-px w-8 bg-current" />
              </div>
            </div>
          </div>
          <div className="text-center">
            <p>2024년 10월 3일 목요일 오전 12시 46분</p>
            <p>태평홀 서울시민청</p>
          </div>
        </div>
      </div>
    </WidgetWrapper>
  );
}

export default IntroWidget;
