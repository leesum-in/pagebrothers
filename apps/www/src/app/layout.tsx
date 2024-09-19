import '@repo/shared/src/styles.css';
import type { Metadata } from 'next';
import { twJoin } from 'tailwind-merge';

import { gowunBatang, notoSerifKr, pretendard } from '@/fonts';
import { QueryProvider } from '@/providers';
import './globals.css';

export const metadata: Metadata = {
  title: '쉽고 빠르게 만드는 모바일 청첩장 - 페이지브라더스',
  description: '쉽고 빠르게 만드는 모바일 청첩장 - 페이지브라더스',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="kr">
      <body
        className={twJoin(
          pretendard.className,
          gowunBatang.className,
          notoSerifKr.className,
          'font-sans leading-relaxed tracking-tight text-slate-700',
        )}
      >
        <QueryProvider>
          <div className="flex min-h-full flex-1 flex-col">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
