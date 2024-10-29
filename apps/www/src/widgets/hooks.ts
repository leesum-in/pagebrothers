import { useCallback, useEffect, useRef, useState } from 'react';
import { useShallow } from 'zustand/shallow';

import type { ModalStore } from './zustand';
import useModalStore from './zustand';

const BOUNCE_FACTOR = 0.3; // 튕김 효과의 강도를 설정 (0.1 ~ 0.5 사이)

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
      let nextTranslate = prevTranslate + diff;

      // 좌우 끝에 도달했을 때 탄성 효과 적용
      if (nextTranslate > 0) {
        nextTranslate *= BOUNCE_FACTOR; // 왼쪽 끝에서 튕김 효과
      } else if (nextTranslate < maxTranslate) {
        nextTranslate = maxTranslate + (nextTranslate - maxTranslate) * BOUNCE_FACTOR; // 오른쪽 끝에서 튕김 효과
      }
      setCurrentTranslate(nextTranslate);
    },
    [setCurrentTranslate, maxTranslate, prevTranslate, startPos],
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isMouseDownRef.current = true;
    setStartPos(e.clientX);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      calculateDiff(e);
      if (isMouseDownRef.current && diffRef.current !== 0) setIsDragging(true);
      if (!isDragging || !trackRef.current) return;
      translate(e);
    },
    [isDragging, translate, setIsDragging, calculateDiff],
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!trackRef.current) return;
      // 드래깅이 끝나면 현재 위치가 범위를 넘었을 경우 제자리로 돌아오게 설정
      if (currentTranslate > 0) {
        setCurrentTranslate(0); // 왼쪽 끝으로 돌아가기
      } else if (currentTranslate < maxTranslate) {
        setCurrentTranslate(maxTranslate); // 오른쪽 끝으로 돌아가기
      }
      trackRef.current.style.transition = 'transform 0.3s ease-out';

      // 애니메이션이 끝나면 트랜지션 초기화
      setTimeout(() => {
        if (!trackRef.current) return;
        trackRef.current.style.transition = '';
      }, 300);

      setPrevTranslate(currentTranslate);
      isMouseDownRef.current = false;
      if (trackRef.current.contains(e.target as HTMLElement)) {
        setIsDragging(false);
      } else {
        setTimeout(() => {
          setIsDragging(false);
        }, 0);
      }

      setTimeout(() => {
        diffRef.current = 0;
      }, 0);

      // 전역 이벤트 제거
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    },
    [currentTranslate, handleMouseMove, setIsDragging, maxTranslate],
  );

  console.log('currentTranslate ====>', currentTranslate);

  // 터치 이벤트 처리 추가 (모바일 대응)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback(
    (e: TouchEvent | React.TouchEvent<HTMLDivElement>) => {
      calculateDiff(e);
      if (isMouseDownRef.current && diffRef.current !== 0) setIsDragging(true);
      if (!isDragging || !trackRef.current) return;
      translate(e);
    },
    [isDragging, translate, calculateDiff, setIsDragging],
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent | React.TouchEvent<HTMLDivElement>) => {
      if (!trackRef.current) return;
      // 드래깅이 끝나면 현재 위치가 범위를 넘었을 경우 제자리로 돌아오게 설정
      if (currentTranslate > 0) {
        setCurrentTranslate(0); // 왼쪽 끝으로 돌아가기
      } else if (currentTranslate < maxTranslate) {
        setCurrentTranslate(maxTranslate); // 오른쪽 끝으로 돌아가기
      }
      trackRef.current.style.transition = 'transform 0.3s ease-out';

      // 애니메이션이 끝나면 트랜지션 초기화
      setTimeout(() => {
        if (!trackRef.current) return;
        trackRef.current.style.transition = '';
      }, 300);
      setPrevTranslate(currentTranslate);

      isMouseDownRef.current = false;
      if (trackRef.current.contains(e.target as HTMLElement)) {
        setIsDragging(false);
      } else {
        setTimeout(() => {
          setIsDragging(false);
        }, 0);
      }

      setTimeout(() => {
        diffRef.current = 0;
      }, 0);

      // 전역 이벤트 제거
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    },
    [currentTranslate, setIsDragging, handleTouchMove, maxTranslate],
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
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    }
  }, [currentTranslate]);

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
