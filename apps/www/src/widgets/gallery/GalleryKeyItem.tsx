import type { GalleryLayoutCarouselAlignKey, GalleryLayoutKey } from '@repo/shared';

import {
  GalleryLayoutOne,
  GalleryLayoutSlider,
  GalleryLayoutTiling,
  GallerySliderLayoutHeight,
  GallerySliderLayoutWidth,
} from '@/www/ui';

interface GalleryKeyItemProps {
  type: GalleryLayoutKey | GalleryLayoutCarouselAlignKey;
}

function GalleryKeyItem({ type }: GalleryKeyItemProps) {
  return (
    <div className="center-flex h-full rounded-lg border border-slate-200 bg-white p-4 shadow-1 peer-checked:border-indigo-600 peer-checked:shadow-violet">
      <div className="text-center">
        {type === 'CAROUSEL' && (
          <>
            <GalleryLayoutSlider className="mx-auto h-6" />
            <p className="mt-2 text-sm font-bold text-slate-600">슬라이더</p>
            <p className="text-xs text-slate-400">넘기면서 볼래요</p>
          </>
        )}
        {type === 'TILING' && (
          <>
            <GalleryLayoutTiling className="mx-auto h-6" />
            <p className="mt-2 text-sm font-bold text-slate-600">타일링</p>
            <p className="text-xs text-slate-400">인스타그램처럼!</p>
          </>
        )}
        {type === 'SINGLE' && (
          <>
            <GalleryLayoutOne className="mx-auto h-6" />
            <p className="mt-2 text-sm font-bold text-slate-600">한 장만</p>
            <p className="text-xs text-slate-400">영혼을 담아서</p>
          </>
        )}
        {type === 'WIDTH' && (
          <>
            <GallerySliderLayoutWidth className="mx-auto h-6" />
            <p className="mt-2 text-sm font-bold text-slate-600">사진 높이 맞추기</p>
            <p className="text-xs text-slate-400">높이를 고정하고 자연스럽게 스크롤</p>
          </>
        )}
        {type === 'HEIGHT' && (
          <>
            <GallerySliderLayoutHeight className="mx-auto h-6" />
            <p className="mt-2 text-sm font-bold text-slate-600">사진 폭 맞추기</p>
            <p className="text-xs text-slate-400">폭을 고정하고 한장씩 넘겨보기</p>
          </>
        )}
      </div>
    </div>
  );
}

export default GalleryKeyItem;
