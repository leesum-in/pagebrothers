'use client';

import { GalleryWidgetItem } from '@/shared/types';
import { useCallback, useRef } from 'react';

interface GalleryProps {
  widgetItem: GalleryWidgetItem;
}

const MAX_IMAGE_WIDTH = 420;

function Gallery({ widgetItem }: GalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);

  const imageWidthHeight = useCallback((item: GalleryWidgetItem['config']['items'][0]) => {
    const { width: imageWidth, height: imageHeight } = item.dimensions;

    // 세로 기준
    const ratio = imageHeight / imageWidth;
    const fixedHeight = imageHeight >= MAX_IMAGE_WIDTH ? MAX_IMAGE_WIDTH : imageHeight;
    const fixedWidth = fixedHeight / ratio;

    return {
      width: fixedWidth,
      height: fixedHeight,
    };
  }, []);

  if (widgetItem.config.items.length === 0)
    return (
      <div className="text-theme-inter/70 py-20 px-4 text-center text-sm no-interaction">
        <p>사진을 등록해주세요.</p>
      </div>
    );

  return (
    <div className="space-y-6 overflow-x-hidden no-interaction" ref={galleryRef}>
      <div className="relative ">
        <ul
          className="flex items-stretch gap-[2px] leading-0"
          style={{ transform: 'translate3d(0px, 0px, 0px)' }}
        >
          {widgetItem.config.items.map((item, index) => (
            <li key={index} className="relative flex flex-shrink-0 items-center">
              <div className="relative no-interaction">
                <div className="absolute top-0 left-0 right-0 bottom-0 z-[1] select-none"></div>
                <img
                  src={item.url}
                  alt="uploaded image"
                  className="relative bg-white no-interaction"
                  width={imageWidthHeight(item).width}
                  height={imageWidthHeight(item).height}
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="no-interaction center-flex absolute right-4 bottom-4 m-auto h-8 gap-1 rounded-full bg-white px-3 text-xs font-bold text-theme-colored">
          밀어서 사진 넘기기
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-lg"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
