'use client';

import Link from 'next/link';

import { useInvitation } from '@/www/widgets/hooks';

function Navigation(): React.ReactNode {
  const { invitation } = useInvitation();

  return (
    <nav className="sticky top-0 z-20 flex h-12 flex-none items-center bg-white pl-2 text-sm desktop:h-14 desktop:pl-3 desktop:text-base">
      <div className="flex items-center gap-2 whitespace-nowrap px-2 font-bold desktop:px-4">
        <Link href="/">
          <svg
            viewBox="0 0 22 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 flex-none"
          >
            <path
              d="M9.55219 4.38358C9.55219 5.03424 9.40285 5.63158 9.10419 6.17558C8.80552 6.70891 8.34685 7.14091 7.72819 7.47158C7.10952 7.80225 6.34152 7.96758 5.42419 7.96758H3.72819V11.9996H0.992188V0.767578H5.42419C6.32019 0.767578 7.07752 0.922245 7.69619 1.23158C8.31485 1.54091 8.77885 1.96758 9.08819 2.51158C9.39752 3.05558 9.55219 3.67958 9.55219 4.38358ZM5.21619 5.79158C5.73885 5.79158 6.12819 5.66891 6.38419 5.42358C6.64019 5.17824 6.76819 4.83158 6.76819 4.38358C6.76819 3.93558 6.64019 3.58891 6.38419 3.34358C6.12819 3.09824 5.73885 2.97558 5.21619 2.97558H3.72819V5.79158H5.21619Z"
              fill="url(#paint0_linear_25_4)"
            />
            <path
              d="M13.9686 12.1276C13.1899 12.1276 12.4966 11.9942 11.8886 11.7276C11.2806 11.4609 10.8006 11.0982 10.4486 10.6396C10.0966 10.1702 9.89923 9.64758 9.85656 9.07158H12.5606C12.5926 9.38091 12.7366 9.63158 12.9926 9.82358C13.2486 10.0156 13.5632 10.1116 13.9366 10.1116C14.2779 10.1116 14.5392 10.0476 14.7206 9.91958C14.9126 9.78091 15.0086 9.60491 15.0086 9.39158C15.0086 9.13558 14.8752 8.94891 14.6086 8.83158C14.3419 8.70358 13.9099 8.56491 13.3126 8.41558C12.6726 8.26625 12.1392 8.11158 11.7126 7.95158C11.2859 7.78091 10.9179 7.51958 10.6086 7.16758C10.2992 6.80491 10.1446 6.31958 10.1446 5.71158C10.1446 5.19958 10.2832 4.73558 10.5606 4.31958C10.8486 3.89291 11.2646 3.55691 11.8086 3.31158C12.3632 3.06624 13.0192 2.94358 13.7766 2.94358C14.8966 2.94358 15.7766 3.22091 16.4166 3.77558C17.0672 4.33025 17.4406 5.06624 17.5366 5.98358H15.0086C14.9659 5.67424 14.8272 5.42891 14.5926 5.24758C14.3686 5.06624 14.0699 4.97558 13.6966 4.97558C13.3766 4.97558 13.1312 5.03958 12.9606 5.16758C12.7899 5.28491 12.7046 5.45024 12.7046 5.66358C12.7046 5.91958 12.8379 6.11158 13.1046 6.23958C13.3819 6.36758 13.8086 6.49558 14.3846 6.62358C15.0459 6.79424 15.5846 6.96491 16.0006 7.13558C16.4166 7.29558 16.7792 7.56225 17.0886 7.93558C17.4086 8.29824 17.5739 8.78891 17.5846 9.40758C17.5846 9.93025 17.4352 10.3996 17.1366 10.8156C16.8486 11.2209 16.4272 11.5409 15.8726 11.7756C15.3286 12.0102 14.6939 12.1276 13.9686 12.1276Z"
              fill="url(#paint1_linear_25_4)"
            />
            <path
              d="M19.8984 12.1276C19.4184 12.1276 19.0238 11.9889 18.7144 11.7116C18.4158 11.4236 18.2664 11.0716 18.2664 10.6556C18.2664 10.2289 18.4158 9.87158 18.7144 9.58358C19.0238 9.29558 19.4184 9.15158 19.8984 9.15158C20.3678 9.15158 20.7518 9.29558 21.0504 9.58358C21.3598 9.87158 21.5144 10.2289 21.5144 10.6556C21.5144 11.0716 21.3598 11.4236 21.0504 11.7116C20.7518 11.9889 20.3678 12.1276 19.8984 12.1276Z"
              fill="url(#paint2_linear_25_4)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_25_4"
                x1="0.992188"
                y1="6.44758"
                x2="21.5144"
                y2="6.44758"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4338CA" />
                <stop offset="1" stopColor="#EF4444" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_25_4"
                x1="0.992188"
                y1="6.44758"
                x2="21.5144"
                y2="6.44758"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4338CA" />
                <stop offset="1" stopColor="#EF4444" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_25_4"
                x1="0.992188"
                y1="6.44758"
                x2="21.5144"
                y2="6.44758"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4338CA" />
                <stop offset="1" stopColor="#EF4444" />
              </linearGradient>
            </defs>
          </svg>
        </Link>
        <Link href="/dashboard">나의 청첩장</Link>
      </div>
      <ul className="flex h-full items-center px-2 font-bold text-slate-400 desktop:px-4">
        <li className="h-full">
          <Link
            className="center-flex h-full w-full px-2 text-indigo-700"
            href={`/dashboard/${invitation?.id}/edit`}
          >
            <span>편집</span>
          </Link>
        </li>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-base desktop:text-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <li className="h-full">
          <Link
            className="center-flex h-full w-full px-2"
            // href="/dashboard/0192792f-7ae5-3df8-25b5-70dd6d21cf35/share"
            href="/"
          >
            공유 설정
          </Link>
        </li>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-base desktop:text-xl"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <li className="h-full">
          <Link
            className="center-flex h-full w-full px-2"
            // href="/dashboard/0192792f-7ae5-3df8-25b5-70dd6d21cf35/payments"
            href="/"
          >
            결제
          </Link>
        </li>
      </ul>
      <div className="ml-auto h-full" />
    </nav>
  );
}

export default Navigation;
