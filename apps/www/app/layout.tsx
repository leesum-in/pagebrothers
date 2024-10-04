import '@repo/shared/src/styles.css';
import type { Metadata } from 'next';

import { gowunBatang, notoSerifKr, pretendard } from '@/fonts';
import { QueryProvider } from '@/query';
import './globals.css';

export const metadata: Metadata = {
  title: '쉽고 빠르게 만드는 모바일 청첩장 - 페이지브라더스',
  description: '쉽고 빠르게 만드는 모바일 청첩장 - 페이지브라더스',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="kr">
      <body
        className={`font-sans leading-relaxed tracking-tight text-slate-700 ${pretendard.variable} ${gowunBatang.variable} ${notoSerifKr.variable}`}
      >
        <QueryProvider>
          <div className="flex min-h-full flex-1 flex-col">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
