'use client';

import { createRoot } from 'react-dom/client';
import { FiCopy } from 'react-icons/fi';
import { LuArrowRight } from 'react-icons/lu';

import { useEffect, useRef } from 'react';
import type { IInvitationLocation, LocationWidgetConfig } from '../../../types/pageBrothers.type';
import { cn } from '../../../utils';

interface LocationProps {
  config: LocationWidgetConfig;
  invitationLocation: IInvitationLocation;
  kakaoObject?: Window['kakao'];
  isMultiModal?: boolean;
  onCopyAddress?: () => void;
}

function Location({
  config,
  invitationLocation,
  kakaoObject,
  isMultiModal,
  onCopyAddress,
}: LocationProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!invitationLocation.coord) return;
    if (!kakaoObject) return;

    kakaoObject.maps.load(() => {
      const latlng = new kakaoObject.maps.LatLng(
        invitationLocation.coord[1],
        invitationLocation.coord[0],
      );

      const options = {
        center: latlng,
        level: 5,
        draggable: false,
      };

      const map = new kakaoObject.maps.Map(mapRef.current, options);

      const marker = new kakaoObject.maps.Marker({
        map,
        position: latlng,
      });

      const parent = marker.zd.parentElement;
      if (parent) {
        parent.style.margin = '0';
        createRoot(parent).render(<MarkerImage />);
        const child = parent?.querySelectorAll('img');
        if (child)
          child.forEach((img: HTMLImageElement) => img.setAttribute('style', 'opacity: 0'));
      }
      // marker.setVisible(false);
    });
  }, [invitationLocation, kakaoObject]);

  return (
    <div className={cn('space-y-8 p-8', isMultiModal ? '' : 'no-interaction')}>
      <section className="space-y-4">
        <p className="flex items-center justify-between gap-4 text-em-lg font-bold text-theme-inter/70">
          <span>{config.title}</span>
          <button
            type="button"
            className="flex-none whitespace-nowrap !border-theme-colored/20 !bg-theme-colored/5 !text-theme-inter/70 hover:!bg-theme-colored/10 h-8 rounded-sm px-2 text-xs border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
            onClick={onCopyAddress}
          >
            <FiCopy className="text-em-lg" />
            주소 복사하기
          </button>
        </p>
        <div>
          <p>
            <span>{invitationLocation.address}</span>
          </p>
          <p>{invitationLocation.placeDetail}</p>
        </div>
      </section>
      <section className="relative isolate overflow-hidden rounded-lg bg-theme-black/5">
        <div className="h-48 opacity-95">
          <div
            ref={mapRef}
            className="h-full w-full"
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          />

          <div className="absolute bottom-2 right-2 z-10">
            <button
              type="button"
              className="!bg-theme-black/80 h-8 rounded-sm px-2 text-xs bg-indigo-600 text-white hover:bg-indigo-700 focus:ring center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
            >
              지도 앱에서 보기
              <LuArrowRight className="-mr-1 text-base" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Location;

function MarkerImage() {
  return (
    <div
      id="map-marker"
      className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2"
    >
      <div className="pb-[32px]">
        <svg
          className="fill-theme-colored stroke-theme-inter"
          width="23"
          height="32"
          viewBox="0 0 23 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11.2 31.169C11.1744 31.1347 11.1477 31.0989 11.1199 31.0615C10.8153 30.652 10.3796 30.0594 9.85656 29.3288C8.81022 27.8672 7.41597 25.8553 6.02257 23.6523C4.62808 21.4476 3.24025 19.0606 2.20273 16.8473C1.15638 14.6152 0.5 12.6281 0.5 11.2C0.5 5.29132 5.29057 0.5 11.2 0.5C17.1094 0.5 21.9 5.29132 21.9 11.2C21.9 12.6281 21.2436 14.6152 20.1973 16.8473C19.1598 19.0607 17.7719 21.4476 16.3774 23.6523C14.984 25.8553 13.5898 27.8672 12.5434 29.3288C12.0204 30.0594 11.5847 30.652 11.2801 31.0615C11.2523 31.0989 11.2256 31.1347 11.2 31.169ZM6.88665 15.5133C8.03062 16.6573 9.58218 17.3 11.2 17.3C12.8178 17.3 14.3694 16.6573 15.5134 15.5133C16.6573 14.3694 17.3 12.8178 17.3 11.2C17.3 9.58218 16.6573 8.03062 15.5134 6.88665C14.3694 5.74268 12.8178 5.1 11.2 5.1C9.58218 5.1 8.03062 5.74268 6.88665 6.88665C5.74268 8.03062 5.1 9.58218 5.1 11.2C5.1 12.8178 5.74268 14.3694 6.88665 15.5133Z"></path>
        </svg>
      </div>
    </div>
  );
}
