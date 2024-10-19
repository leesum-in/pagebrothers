import { useEffect, useRef, useState } from 'react';

const useCarousel = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  const trackRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const currentPosition = e.clientX;
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
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPrevTranslate(currentTranslate);
  };

  // 터치 이벤트 처리 추가 (모바일 대응)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !trackRef.current) return;
    const currentPosition = e.touches[0].clientX;
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
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setPrevTranslate(currentTranslate);
  };

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

  useEffect(() => {
    const preventClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    if (isDragging) {
      document.addEventListener('click', preventClick);
    } else {
      document.removeEventListener('click', preventClick);
    }

    // return () => {
    //   document.removeEventListener('click', preventClick);
    // };
  }, [isDragging]);

  return {
    trackRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

export { useCarousel };
