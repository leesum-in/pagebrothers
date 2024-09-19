import { Noto_Serif_KR as NotoSerifKr } from 'next/font/google';
import localFont from 'next/font/local';

export const pretendard = localFont({
  src: './PretendardVariable.woff2',
  weight: '45 920',
  style: 'normal',
  display: 'swap',
});

export const notoSerifKr = NotoSerifKr({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '900'],
});

export const gowunBatang = localFont({
  src: './GowunBatangRegular.woff',
  style: 'normal',
  display: 'swap',
});
