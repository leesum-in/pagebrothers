'use client';

import { GalleryWidgetItem } from '@/shared/types';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useSlider } from '../../../hooks';
import { cn } from '../../../utils';

interface GalleryProps {
  widgetItem: GalleryWidgetItem;
}

function reducer(state: { isDragging: boolean }, action: { type: string }) {
  switch (action.type) {
    case 'START_DRAG':
      return { ...state, isDragging: true };
    case 'STOP_DRAG':
      return { ...state, isDragging: false };
    default:
      return state;
  }
}

const MAX_IMAGE_WIDTH = 420;

function Gallery({ widgetItem }: GalleryProps) {
  const [currentViewingItemIndex, setCurrentViewingItemIndex] = useState(0);
  const [state, dispatch] = useReducer(reducer, { isDragging: false });
  const { isDragging } = state;
  const selectedIndexRef = useRef(0);

  const {
    trackRef,
    handleMouseDownTouchStart,
    handleMouseMoveTouchMove,
    handleMouseUpTouchEnd,
    handleScrollToIndex,
  } = useSlider<HTMLUListElement>({
    isDragging,
    setIsDragging: (value) => {
      if (value) dispatch({ type: 'START_DRAG' });
      else dispatch({ type: 'STOP_DRAG' });
    },
    gap: 2,
  });

  const imageWidthHeight = useCallback((item: GalleryWidgetItem['config']['items'][0]) => {
    const { width: imageWidth, height: imageHeight } = item.dimensions;
    const based = widgetItem.config.layoutCarouselAlignKey;

    let fixedWidth = imageWidth;
    let fixedHeight = imageHeight;

    if (based === 'HEIGHT') {
      // 세로 기준
      const ratio = imageHeight / imageWidth;

      if (imageHeight >= MAX_IMAGE_WIDTH) {
        fixedHeight = MAX_IMAGE_WIDTH;
      } else {
        fixedHeight = MAX_IMAGE_WIDTH * ratio;
      }

      fixedWidth = fixedHeight / ratio;
    }

    return {
      width: fixedWidth,
      height: fixedHeight,
    };
  }, []);

  const handleMouseDownTouchStartOverride = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (widgetItem.config.layoutKey !== 'CAROUSEL') return;
      handleMouseDownTouchStart(e);
    },
    [handleMouseDownTouchStart],
  );

  const handleMouseMoveTouchMoveOverride = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (widgetItem.config.layoutKey !== 'CAROUSEL') return;
      handleMouseMoveTouchMove(e);
    },
    [handleMouseMoveTouchMove],
  );

  const handleMouseUpTouchEndOverride = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (widgetItem.config.layoutKey !== 'CAROUSEL') return;
      handleMouseUpTouchEnd(e);
    },
    [handleMouseUpTouchEnd],
  );

  const handleCarouselPrev = useCallback(() => {
    if (currentViewingItemIndex === 0) return;
    selectedIndexRef.current = currentViewingItemIndex - 1;
  }, [currentViewingItemIndex]);

  const handleCarouselNext = useCallback(() => {
    if (currentViewingItemIndex === widgetItem.config.items.length - 1) return;
    selectedIndexRef.current = currentViewingItemIndex + 1;
  }, [currentViewingItemIndex, widgetItem.config.items.length]);

  useEffect(() => {
    if (!trackRef.current) return;

    const observerOptions = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          setCurrentViewingItemIndex(index);
        }
      });
    }, observerOptions);

    const slides = Array.from(trackRef.current.children);
    slides.forEach((slide) => observer.observe(slide));

    return () => slides.forEach((slide) => observer.unobserve(slide));
  }, [trackRef]);

  useEffect(() => {
    handleScrollToIndex(selectedIndexRef.current);
  }, [selectedIndexRef.current, handleScrollToIndex]);

  if (widgetItem.config.items.length === 0)
    return (
      <div className="text-theme-inter/70 py-20 px-4 text-center text-sm no-interaction">
        <p>사진을 등록해주세요.</p>
      </div>
    );

  return (
    <div className={cn('space-y-6 overflow-x-hidden', widgetItem.config.title && 'p-8')}>
      {widgetItem.config.title && (
        <p
          className={cn('text-em-lg font-bold text-theme-inter/70 text-center', {
            'text-left': widgetItem.config.align === 'LEFT',
            'text-center': widgetItem.config.align === 'CENTER',
          })}
        >
          {widgetItem.config.title}
        </p>
      )}
      <div
        className="relative"
        onMouseDown={handleMouseDownTouchStartOverride}
        onMouseMove={handleMouseMoveTouchMoveOverride}
        onMouseUp={handleMouseUpTouchEndOverride}
        onTouchStart={handleMouseDownTouchStartOverride}
        onTouchMove={handleMouseMoveTouchMoveOverride}
        onTouchEnd={handleMouseUpTouchEndOverride}
      >
        <ul
          className={cn({
            'flex items-stretch gap-[2px] leading-0': widgetItem.config.layoutKey === 'CAROUSEL',
            'divide grid grid-cols-3 gap-[1px]': widgetItem.config.layoutKey === 'TILING',
          })}
          ref={trackRef}
        >
          {widgetItem.config.items.map((item, index) => (
            <li
              key={item.id}
              className={cn('relative ', {
                'flex flex-shrink-0 items-center': widgetItem.config.layoutKey === 'CAROUSEL',
                'w-full':
                  widgetItem.config.layoutKey === 'CAROUSEL' &&
                  widgetItem.config.layoutCarouselAlignKey === 'WIDTH',
                'aspect-square cursor-pointer overflow-hidden leading-0':
                  widgetItem.config.layoutKey === 'TILING',
              })}
              data-index={index}
            >
              <div
                className={cn('relative no-interaction', {
                  'w-full':
                    widgetItem.config.layoutKey === 'CAROUSEL' &&
                    widgetItem.config.layoutCarouselAlignKey === 'WIDTH',
                  'w-full h-full object-cover': widgetItem.config.layoutKey === 'TILING',
                })}
              >
                <div className="absolute top-0 left-0 right-0 bottom-0 z-[1] select-none"></div>
                <img
                  src={item.url}
                  alt="uploaded image"
                  className={cn('relative bg-white no-interaction', {
                    'w-full':
                      widgetItem.config.layoutKey === 'CAROUSEL' &&
                      widgetItem.config.layoutCarouselAlignKey === 'WIDTH',
                    'w-full h-full object-cover': widgetItem.config.layoutKey === 'TILING',
                  })}
                  width={
                    widgetItem.config.layoutKey === 'CAROUSEL'
                      ? imageWidthHeight(item).width
                      : undefined
                  }
                  height={
                    widgetItem.config.layoutKey === 'CAROUSEL'
                      ? imageWidthHeight(item).height
                      : undefined
                  }
                />
              </div>
            </li>
          ))}
        </ul>
        {widgetItem.config.layoutKey === 'CAROUSEL' &&
          widgetItem.config.layoutCarouselAlignKey === 'HEIGHT' && (
            <div className="no-interaction center-flex absolute right-4 bottom-4 m-auto h-8 gap-1 rounded-full bg-white px-3 text-xs font-bold text-theme-colored">
              {currentViewingItemIndex === 0
                ? '밀어서 사진 넘기기'
                : `${currentViewingItemIndex + 1} / ${widgetItem.config.items.length}`}
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
          )}
        {widgetItem.config.layoutKey === 'CAROUSEL' &&
          widgetItem.config.layoutCarouselAlignKey === 'WIDTH' && (
            <div className="center-flex absolute inset-4 top-auto m-auto">
              <div className="center-flex rounded-full bg-white text-theme-colored">
                <button
                  className="center-flex h-8 w-8 flex-none text-base"
                  type="button"
                  onClick={handleCarouselPrev}
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                </button>
                <span className="flex-1 whitespace-nowrap px-1 text-center text-xs font-bold">
                  {currentViewingItemIndex + 1} / {widgetItem.config.items.length}
                </span>
                <button
                  className="center-flex h-8 w-8 flex-none text-base"
                  type="button"
                  onClick={handleCarouselNext}
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default Gallery;
