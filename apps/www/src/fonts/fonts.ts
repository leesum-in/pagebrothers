import { Gowun_Batang as GowunBatang, Noto_Serif_KR as NotoSerifKr } from 'next/font/google';
import localFont from 'next/font/local';

export const pretendard = localFont({
  src: '../../../../packages/shared/fonts/PretendardVariable.woff2',
  weight: '45 920',
  style: 'normal',
  display: 'swap',
  variable: '--font-pretendard',
});

export const notoSerifKr = NotoSerifKr({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '900'],
  display: 'swap',
  variable: '--font-notoSerifKr',
});

export const gowunBatang = GowunBatang({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-gowunBatang',
});
