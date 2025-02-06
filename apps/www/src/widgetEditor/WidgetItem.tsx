import { cn, Button } from '@repo/shared';
import { HiPlus } from 'react-icons/hi';

// import { COLOR_HIGHLIGHT_CLASSES, TEXT_SIZE_CLASSES, FONT_CLASSES } from '@/themeSetting/constants';
// import { useThemeStore } from '@/themeSetting/designStore';
// import { COLOR_HIGHLIGHTS } from '@/types/pageBrothers.type';

function WidgetItem({ className }: { className?: string }) {
  // const colorScheme = useThemeStore((state) => state.colorScheme);
  // const font = useThemeStore((state) => state.font);
  // const textSize = useThemeStore((state) => state.textSize);

  // const colorClasses = COLOR_HIGHLIGHTS[colorScheme];

  return (
    <div
      role="button"
      tabIndex={0}
      aria-disabled="false"
      className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-1 cursor-default"
      style={{ zIndex: 'auto' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 font-bold text-slate-900">
        <span>위젯입니다</span>
        <div className="flex gap-2">
          <Button
            variants="fill_white"
            size="small"
            onClick={() => {
              console.log('스티커 버튼 클릭됨');
            }}
          >
            <HiPlus className="text-slate-600" />
            스티커
          </Button>
          <Button
            variants="fill_secondary"
            size="small"
            onClick={() => {
              console.log('위젯 수정 버튼 클릭됨');
            }}
          >
            위젯 수정
          </Button>
        </div>
      </div>

      {/* Body */}
      {/* themeStore에 있는 스타일이 여기에 적용되도록 */}
      <div className="border-t border-slate-200">
        <div
          className={cn(
            'font-serif text-[14px] leading-loose text-theme-black/60',
            // colorClasses,
            // COLOR_HIGHLIGHT_CLASSES[colorScheme],
            // FONT_CLASSES[font],
            // TEXT_SIZE_CLASSES[textSize],
            className,
          )}
        >
          <div className="relative overflow-hidden">
            <div className="no-interaction">
              <div className="relative text-center" />
              <div className="flex aspect-square items-center justify-center bg-theme-black/5 p-4 text-center leading-normal">
                <p className="opacity-50">대표 이미지가 들어갈 자리예요</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetItem;
