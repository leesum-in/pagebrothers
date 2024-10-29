import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import type { ModalStore } from './zustand';
import useModalStore from './zustand';

const useCarousel = () => {
  const { setIsDragging, isDragging } = useModalStore(
    useShallow((state: ModalStore) => ({
      setIsDragging: state.setIsDragging,
      isDragging: state.isDragging,
    })),
  );
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const isMouseDownRef = useRef(false); // 클릭 상태 추적용 ref
  const diffRef = useRef(0);

  const calculateDiff = useCallback(
    (
      e:
        | MouseEvent
        | TouchEvent
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>,
    ) => {
      if (!isMouseDownRef.current) return;
      const currentPosition = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      diffRef.current = currentPosition - startPos;
    },
    [startPos],
  );

  const translate = useCallback(
    (
      e:
        | MouseEvent
        | TouchEvent
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>,
    ) => {
      if (!trackRef.current) return;
      const currentPosition = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const diff = currentPosition - startPos;
      const nextTranslate = prevTranslate + diff;

      // 이동 범위를 최소/최대로 제한
      if (nextTranslate > 0) {
        setCurrentTranslate(0); // 첫 슬라이드 이전으로 가지 않게 제한
      } else if (nextTranslate < maxTranslate) {
        setCurrentTranslate(maxTranslate); // 마지막 슬라이드 이후로 가지 않게 제한
      } else {
        setCurrentTranslate(nextTranslate);
      }

      trackRef.current.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    },
    [currentTranslate, setCurrentTranslate, maxTranslate, prevTranslate, startPos],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDownRef.current = true;
    setStartPos(e.clientX);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      calculateDiff(e);
      if (!trackRef.current?.contains(e.target as HTMLElement)) {
        setIsOutsideClick(true);
      } else {
        setIsOutsideClick(false);
      }
      if (isMouseDownRef.current && diffRef.current !== 0) setIsDragging(true);
      if (!isDragging || !trackRef.current) return;
      translate(e);
    },
    [isDragging, setIsOutsideClick, translate, setIsDragging, calculateDiff],
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      isMouseDownRef.current = false;
      if (trackRef.current?.contains(e.target as HTMLElement) && !isOutsideClick) {
        setIsDragging(false);
        setPrevTranslate(currentTranslate);
      } else {
        setTimeout(() => {
          setIsDragging(false);
          setPrevTranslate(currentTranslate);
        }, 100);
      }

      setTimeout(() => {
        diffRef.current = 0;
      }, 0);

      // 전역 이벤트 제거
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    },
    [currentTranslate, handleMouseMove, setIsDragging, isOutsideClick],
  );

  // 터치 이벤트 처리 추가 (모바일 대응)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent | React.TouchEvent<HTMLDivElement>) => {
      calculateDiff(e);
      if (!trackRef.current?.contains(e.target as HTMLElement)) {
        setIsOutsideClick(true);
      } else {
        setIsOutsideClick(false);
      }
      if (isMouseDownRef.current && diffRef.current !== 0) setIsDragging(true);
      if (!isDragging || !trackRef.current) return;
      translate(e);
    },
    [isDragging, setIsOutsideClick, translate, calculateDiff, setIsDragging],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent | React.TouchEvent<HTMLDivElement>) => {
      isMouseDownRef.current = false;
      if (trackRef.current?.contains(e.target as HTMLElement) && !isOutsideClick) {
        setIsDragging(false);
        setPrevTranslate(currentTranslate);
      } else {
        setTimeout(() => {
          setIsDragging(false);
          setPrevTranslate(currentTranslate);
        }, 100);
      }

      setTimeout(() => {
        diffRef.current = 0;
      }, 0);

      // 전역 이벤트 제거
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    },
    [currentTranslate, setIsDragging, isOutsideClick, handleTouchMove],
  );

  const handleInputClick = useCallback(
    <T>(setState: (option: T) => void, option: T) =>
      () => {
        if (!isDragging && diffRef.current === 0) {
          setState(option);
        }
      },
    [isDragging],
  );

  useEffect(() => {
    if (isDragging) {
      // 전역 이벤트 추가
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      // 이벤트 정리
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  useEffect(() => {
    if (trackRef.current) {
      const slides = trackRef.current.children;

      if (slides.length > 0) {
        const firstSlide = slides[0].getBoundingClientRect(); // 첫 번째 슬라이드의 너비를 구함
        const trackWidth = firstSlide.width * slides.length; // 트랙 전체 길이 계산
        const gapWidth = 16 * (slides.length - 1);
        const containerWidth = trackRef.current.offsetWidth; // 컨테이너 너비
        setMaxTranslate(-(trackWidth + gapWidth - containerWidth)); // 최대 이동 가능 범위 계산
      }
    }
  }, []);

  return {
    isDragging,
    trackRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleInputClick,
  };
};

export { useCarousel };
