import { IoArrowDown } from 'react-icons/io5';
import type {
  IInvitation,
  IInvitationImageData,
  IntroLayoutKey,
  IntroWidgetConfig,
} from '../../../types/pageBrothers.type';

interface IntroProps {
  config: IntroWidgetConfig;
  invitation: IInvitation;
}

function Intro({ config, invitation }: IntroProps) {
  const { subTitle, title, coverImage, layoutKey } = config;

  switch (layoutKey) {
    case 'IMAGE_ROUND_FRAME':
      return (
        <div className="relative space-y-6 bg-theme-colored/5 py-12 leading-relaxed">
          <header className="space-y-1 text-center">
            <p className="whitespace-nowrap text-em-xs text-theme-black/30">{subTitle}</p>
            <h1 className="whitespace-pre-line empty:hidden space-y-0 text-em-xl font-bold">
              <p className="[&amp;>a]:text-theme-colored [&amp;>a]:underline">{title}</p>
            </h1>
          </header>
          <div className="relative flex items-center">
            <div className="center-flex h-10 w-10 flex-none rotate-90">
              <div className="center-flex h-9 gap-2 text-slate-300 ">
                <span className="h-px w-8 bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="h-px w-8 bg-current" />
              </div>
            </div>

            <div className="relative isolate mx-auto aspect-[3/4] flex-1 overflow-hidden rounded-full bg-theme-black/5 leading-0">
              {!coverImage ? (
                <div className="flex h-full w-full items-center justify-center p-4 text-center leading-normal">
                  <p className="opacity-50">대표 이미지가 들어갈 자리에요</p>
                </div>
              ) : null}
              {coverImage ? <IntroImage imageData={coverImage} type={layoutKey} /> : null}
            </div>
            <div className="center-flex h-10 w-10 flex-none -rotate-90">
              <div className="center-flex h-9 gap-2 text-slate-300 ">
                <span className="h-px w-8 bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="aspect-square h-[3px] rounded-full bg-current" />
                <span className="h-px w-8 bg-current" />
              </div>
            </div>
          </div>

          <div className="text-center">
            <p>{invitation.eventAt}</p>
            <p>
              {invitation.location.placeName} {invitation.location.placeDetail}
            </p>
          </div>
        </div>
      );
    case 'IMAGE_ARCH_FRAME':
      return (
        <div className="relative space-y-4 bg-theme-colored/5 py-12 leading-relaxed px-8">
          <header className="space-y-1 text-center">
            <p className="whitespace-nowrap text-em-xs text-theme-black/30">{subTitle}</p>
            <h1 className="whitespace-pre-line empty:hidden space-y-0 text-em-xl font-bold">
              <p className="[&amp;>a]:text-theme-colored [&amp;>a]:underline">{title}</p>
            </h1>
          </header>
          <div className="relative flex items-center px-8">
            <div className="relative isolate mx-auto aspect-[1/2] flex-1 overflow-hidden rounded-t-full bg-theme-black/5 leading-0">
              {!coverImage ? (
                <div className="flex h-full w-full items-center justify-center p-4 text-center leading-normal">
                  <p className="opacity-50">대표 이미지가 들어갈 자리에요</p>
                </div>
              ) : null}
              {coverImage ? <IntroImage imageData={coverImage} type={layoutKey} /> : null}
            </div>
          </div>

          <div className="text-center">
            <p>{invitation.eventAt}</p>
            <p>
              {invitation.location.placeName} {invitation.location.placeDetail}
            </p>
          </div>
        </div>
      );
    case 'IMAGE_FLOW':
      return (
        <div className="leading-relaxed">
          <div className="space-y-6 p-8">
            <header className="flex items-start justify-between">
              <h1 className="whitespace-pre-line empty:hidden space-y-0 text-em-xl font-bold leading-relaxed ">
                <p className="[&amp;>a]:text-theme-colored [&amp;>a]:underline">{title}</p>
              </h1>
              <p className="whitespace-nowrap py-1 text-em-xs text-theme-black/30">{subTitle}</p>
            </header>
            <hr className="w-6 -rotate-45 border-theme-black/30" />
            <div>
              <p>{invitation.eventAt}</p>
              <p>
                {invitation.location.placeName} {invitation.location.placeDetail}
              </p>
            </div>
          </div>
          {!coverImage ? (
            <div className="flex aspect-square items-center justify-center bg-theme-black/5 p-4 text-center leading-normal">
              <p className="opacity-50">대표 이미지가 들어갈 자리에요</p>
            </div>
          ) : null}
          {coverImage ? <IntroImage imageData={coverImage} type={layoutKey} /> : null}
        </div>
      );
    case 'IMAGE_FLOW_REVERSE':
      return (
        <div className="relative leading-relaxed">
          <div className="flex items-stretch">
            <div className="flex-1">
              <div className="relative aspect-square bg-theme-black/5 leading-0">
                {!coverImage ? (
                  <div className="flex h-full w-full items-center justify-center p-4 text-center leading-normal">
                    <p className="opacity-50">대표 이미지가 들어갈 자리에요</p>
                  </div>
                ) : null}
                {coverImage ? <IntroImage imageData={coverImage} type={layoutKey} /> : null}
              </div>
              <header className="p-8">
                <h1 className="whitespace-pre-line empty:hidden space-y-0 text-em-xl font-bold leading-relaxed ">
                  <p className="[&amp;>a]:text-theme-colored [&amp;>a]:underline">{title}</p>
                </h1>
                <div className="mt-2 text-theme-black/30">
                  <p>{invitation.eventAt}</p>
                  <p>
                    {invitation.location.placeName} {invitation.location.placeDetail}
                  </p>
                </div>
              </header>
            </div>
            <div className="flex flex-none flex-col items-center gap-4">
              <p
                className="right-0 mt-4 flex w-12 flex-none items-center whitespace-nowrap text-em-xs text-theme-black/30"
                style={{ writingMode: 'vertical-lr' }}
              >
                {subTitle}
              </p>
              <div className="w-[1px] flex-1 bg-gradient-to-b from-theme-black/20 to-theme-black/0" />
            </div>
          </div>
        </div>
      );
    case 'IMAGE_BACKGROUND':
      return (
        <div className="relative min-h-[15rem] leading-relaxed">
          {!coverImage ? (
            <div className="flex aspect-square items-center justify-center bg-theme-black/5 p-4 text-center leading-normal">
              <p className="opacity-50">대표 이미지가 들어갈 자리에요</p>
            </div>
          ) : null}
          {coverImage ? <IntroImage imageData={coverImage} type={layoutKey} /> : null}
          <div className="absolute inset-0 bottom-auto p-8 text-left">
            <header className="space-y-1">
              <p className="text-em-xs text-theme-black/30">{subTitle}</p>
              <h1 className="whitespace-pre-line empty:hidden space-y-0 text-em-xl font-bold leading-relaxed ">
                <p className="[&amp;>a]:text-theme-colored [&amp;>a]:underline">{title}</p>
              </h1>
            </header>
          </div>
          <div className="space-y-2 p-8 py-6">
            <dl className="flex items-start gap-4">
              <dt className="flex-none whitespace-nowrap">일시 / </dt>
              <dd className="flex-1 text-right font-bold">{invitation.eventAt}</dd>
            </dl>
            <dl className="flex items-start gap-4">
              <dt className="flex-none whitespace-nowrap">장소 / </dt>
              <dd className="flex-1 text-right font-bold">
                {invitation.location.placeName} {invitation.location.placeDetail}
              </dd>
            </dl>
          </div>
        </div>
      );
    case 'ONLY_TEXT':
      return (
        <div className="relative aspect-square bg-gradient-to-br from-theme-black/90 to-theme-black/70 p-8 leading-relaxed text-left">
          <header className="space-y-1">
            <p className="text-em-xs text-white/40">{subTitle}</p>
            <h1 className="whitespace-pre-line empty:hidden space-y-0 text-em-xl font-bold leading-relaxed text-white/80 ">
              <p className="[&amp;>a]:text-theme-colored [&amp;>a]:underline">{title}</p>
            </h1>
          </header>
          <div className="mt-4 text-white/40">
            <p>{invitation.eventAt}</p>
            <p>태평홀 서울시민청</p>
          </div>
          <IoArrowDown className="absolute inset-8 top-auto right-auto text-em-2xl text-white/80" />
        </div>
      );
    case 'ONLY_IMAGE':
      return (
        <div className="relative text-center">
          {!coverImage ? (
            <div className="flex aspect-square items-center justify-center bg-theme-black/5 p-4 text-center leading-normal">
              <p className="opacity-50">대표 이미지가 들어갈 자리에요</p>
            </div>
          ) : null}
          {coverImage ? <IntroImage imageData={coverImage} type={layoutKey} /> : null}
        </div>
      );
  }
}

export default Intro;

function IntroImage({
  imageData,
  type,
}: {
  imageData: IInvitationImageData;
  type: IntroLayoutKey;
}) {
  if (type === 'IMAGE_ROUND_FRAME' || type === 'IMAGE_ARCH_FRAME' || type === 'IMAGE_FLOW_REVERSE')
    return (
      <div className="relative h-full w-full object-cover ">
        <div className="absolute top-0 left-0 right-0 bottom-0 z-[1] select-none" />
        <IntroImageOnly imageData={imageData} />
      </div>
    );

  if (type === 'IMAGE_FLOW' || type === 'IMAGE_BACKGROUND')
    return (
      <div className="relative leading-0">
        <div className="relative w-full">
          <div className="absolute top-0 left-0 right-0 bottom-0 z-[1] select-none" />
          <IntroImageOnly imageData={imageData} />
        </div>
      </div>
    );
  if (type === 'ONLY_IMAGE')
    return (
      <div className="relative w-full">
        <div className="absolute top-0 left-0 right-0 bottom-0 z-[1] select-none" />
        <IntroImageOnly imageData={imageData} />
      </div>
    );
}

function IntroImageOnly({ imageData }: { imageData: IInvitationImageData }) {
  return (
    <img
      src={imageData.url}
      alt="intro"
      className="relative h-full w-full bg-white object-cover"
      width={imageData.dimensions.width}
      height={imageData.dimensions.height}
    />
  );
}
