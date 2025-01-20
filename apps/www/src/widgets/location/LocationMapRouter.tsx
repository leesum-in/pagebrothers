'use client';

import type { IInvitationLocation } from '@repo/shared';
import Image from 'next/image';
import Link from 'next/link';
import { LuArrowRight } from 'react-icons/lu';

interface LocationMapRouterProps {
  location: IInvitationLocation;
}

function LocationMapRouter({ location }: LocationMapRouterProps) {
  const mapRouterItems = [
    {
      title: '카카오맵',
      description: '카카오 맵에서 보기',
      icon: '/kakaomap.webp',
      url: `https://map.kakao.com/link/map/${location.placeName},${location.coord[1]},${location.coord[0]}`,
    },
    {
      title: '네이버 지도',
      description: '네이버 지도에서 보기',
      icon: '/navermap.webp',
      url: `https://map.naver.com/index.nhn?lng=${location.coord[0]}&lat=${location.coord[1]}&title=${encodeURIComponent(location.placeName)}&pinType=site`,
    },
    {
      title: '카카오 내비',
      description: '카카오내비에서 길찾기',
      icon: '/kakaonavi.webp',
      url: `https://map.kakao.com/link/navi/${location.placeName},${location.coord[1]},${location.coord[0]}`,
    },
    {
      title: '티맵',
      description: '티맵에서 보기',
      icon: '/tmap.webp',
      url: `https://apis.openapi.sk.com/tmap/app/routes?appKey=temp&name=${encodeURIComponent(location.placeName)}&lon=${location.coord[0]}&lat=${location.coord[1]}`,
    },
  ];

  return (
    <ul className="divide-y divide-theme-black/10 font-serif">
      {mapRouterItems.map((item) => (
        <li key={item.title}>
          <Link href={item.url} target="_blank" rel="noreferrer">
            <div className="flex items-center gap-4 p-4 leading-none">
              <Image src={item.icon} alt={item.title} width={24} height={24} />
              <span>{item.description}</span>
              <LuArrowRight className="ml-auto text-em-xl text-theme-black/20" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default LocationMapRouter;
