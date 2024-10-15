'use client';

import { useCallback, useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoCheckmark } from 'react-icons/io5';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { useShallow } from 'zustand/shallow';

import { useInvitationConfigMutation } from '@/invitations/mutations';
import type { IntroLayoutKey, IntroWidgetConfig, WidgetItem } from '@/types/pageBrothers.type';

import type { ModalStore, VideoWidgetForm } from '../zustand';
import useModalStore from '../zustand';
import Intro from './Intro';

type LayoutKey = {
  key: IntroLayoutKey;
  title: string;
  description: string;
};

const layoutKey: LayoutKey[] = [
  {
    key: 'IMAGE_ROUND_FRAME',
    title: '비행기 창문',
    description: '비행기 창문 모양 프레임에 사진을 넣는 레이아웃',
  },
  {
    key: 'IMAGE_ARCH_FRAME',
    title: '아치 프레임',
    description: '아치형 프레임에 사진을 넣는 레이아웃',
  },
  {
    key: 'IMAGE_FLOW',
    title: '표지형 A',
    description: '텍스트 밑에 이미지를 배치하는 레이아웃',
  },
  {
    key: 'IMAGE_FLOW_REVERSE',
    title: '표지형 B',
    description: '이미지 밑에 텍스트를 놓는 레이아웃',
  },
  {
    key: 'IMAGE_BACKGROUND',
    title: '배경 이미지',
    description: '이미지 위에 텍스트를 얹는 레이아웃',
  },
  {
    key: 'ONLY_TEXT',
    title: '심플 텍스트',
    description: '이미지 없이 텍스트만 쓰는 레이아웃',
  },
  {
    key: 'ONLY_IMAGE',
    title: '이미지 직접 업로드',
    description: '텍스트 없이 이미지만 활용한 레이아웃',
  },
];

interface IntroWidgetModalContentProps {
  widget: WidgetItem;
}

function IntroWidgetModalContent({ widget }: IntroWidgetModalContentProps): React.ReactNode {
  const { subTitle, title, coverImage } = widget.config as IntroWidgetConfig;

  // const { register, watch } = useForm<VideoWidgetForm>();
  const { setOnSubmit, closeModal } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
    })),
  );

  const { invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      invitation: state.invitation,
    })),
  );

  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');

  const onSubmit: SubmitHandler<VideoWidgetForm> = useCallback(() => {
    // putInvitationConfig(configPayloadData);

    closeModal();
    // }, [widget, watch, closeModal, putInvitationConfig]);
  }, [widget, closeModal, putInvitationConfig]);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">레이아웃</div>
            <div className="text-sm" />
          </div>
        </div>
        <div>
          <div>
            <div
              className="flex items-stretch gap-2 desktop:gap-4"
              style={{ transform: 'translate3d(0px, 0px, 0px)' }}
            >
              {layoutKey.map((layout) => (
                <label
                  className="relative cursor-pointer w-[calc((100%_-_1rem)_/_2)] flex-none"
                  key={layout.key}
                >
                  <input
                    className="peer -z-10 hidden"
                    type="radio"
                    name="layoutKey"
                    value={layout.key}
                  />
                  <div className="relative h-full rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-500 shadow-1 peer-checked:border-indigo-600 peer-checked:shadow-violet">
                    <div className="flex items-center justify-between font-bold">
                      {layout.title}
                    </div>
                    <div className="mt-1">{layout.description}</div>
                  </div>
                  <IoCheckmark className="absolute top-4 right-4 hidden flex-none text-2xl text-indigo-700 peer-checked:block" />
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">대표 이미지</div>
            <div className="text-sm" />
          </div>
        </div>
        <div>
          <div className="relative flex h-[4.5rem] items-center overflow-hidden rounded-lg border border-dashed border-slate-300 px-4">
            <div className="flex-1 text-sm">
              <div className="font-bold text-slate-500">이미지 업로드</div>
              <div className="text-slate-400 empty:hidden">png, jpg / 최대 10mb</div>
            </div>
          </div>
          <AiOutlinePlusCircle className="w-7 h-7" />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
        <div className="[--theme-black:15,23,42] [--theme-inter:51,65,85] [--theme-colored:100,116,139] [--theme-block:0,0,0] font-serif text-[14px] leading-loose text-theme-black/60">
          <div>
            {invitation ? (
              <Intro
                subTitle={subTitle}
                title={title}
                coverImage={coverImage}
                invitation={invitation}
              />
            ) : null}
          </div>
        </div>
      </div>

      <BreackLine />

      {/** 타이틀 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">타이틀</div>
            <div className="text-sm" />
          </div>
          <div className="text-sm text-slate-400">보통 신랑과 신부 이름을 많이 씁니다.</div>
        </div>
        <div>
          <label className="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200">
            <div className="flex items-center" />
            <textarea
              className="block w-full resize-none bg-white px-4 py-3 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300 undefined"
              spellCheck="false"
              autoComplete="off"
              rows={3}
              name="title"
            />
            <div className="flex items-center" />
          </label>
        </div>
      </div>

      {/** 꾸미기 문구 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">꾸미기 문구</div>
            <div className="text-sm" />
          </div>
          <div className="text-sm text-slate-400">제목과 함께 사용되는 작은 문구입니다.</div>
        </div>
        <div>
          <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 ">
            <div className="flex flex-none items-center" />
            <input
              className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
              spellCheck="false"
              autoComplete="off"
              name="subTitle"
            />
            <div className="flex flex-none items-center" />
          </label>
        </div>
      </div>

      <BreackLine />

      {/** 예식 정보 표기 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">예식 정보 표기</div>
            <div className="text-sm">
              <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
                <input
                  name="showEventInformation"
                  className="no-interaction peer absolute flex-none opacity-0"
                  type="checkbox"
                />
                <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
              </label>
            </div>
          </div>
          <div className="text-sm text-slate-400">인트로에 예식 장소와 일시를 보여줍니다.</div>
        </div>
      </div>

      {/** 예식장 주소 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">예식장 주소</div>
            <div className="text-sm" />
          </div>
        </div>
        <div>
          <div className="relative flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-100 text-left">
            <div className="w-0 flex-1 px-4">
              <p className="truncate text-slate-600">서울 중구 세종대로 110</p>
              <p className="truncate text-sm text-slate-400">서울특별시 중구 태평로1가 31</p>
            </div>
            <button
              className="center-flex h-16 w-16 flex-none text-slate-500"
              type="button"
              tabIndex={-1}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        </div>
      </div>

      {/** 예식장 이름 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">예식장 이름</div>
            <div className="text-sm" />
          </div>
        </div>
        <div>
          <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 ">
            <div className="flex flex-none items-center" />
            <input
              className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
              spellCheck="false"
              autoComplete="off"
              name="location.placeName"
            />
            <div className="flex flex-none items-center" />
          </label>
        </div>
      </div>

      {/** 예식 일시 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">예식 일시</div>
            <div className="text-sm" />
          </div>
          <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 ">
            <div className="flex flex-none items-center" />
            <input
              className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
              spellCheck="false"
              autoComplete="off"
              name="eventAt"
              placeholder="예식일을 선택해주세요."
              readOnly
              value="2024년 10월 11일 금요일 오전 1시 26분"
            />
            <div className="flex flex-none items-center">
              <div className="center-flex h-12 w-12 text-slate-400">
                <MdOutlineCalendarToday />
              </div>
            </div>
          </label>
        </div>
      </div>

      {/** 표기법 */}
      <div className="space-y-2 ">
        <div>
          <div className="flex items-center justify-between text-slate-600">
            <div className="font-bold">표기법</div>
            <div className="text-sm" />
          </div>
          <div>
            <ul className="space-y-2">
              <li>
                <label className="relative cursor-pointer">
                  <input type="radio" className="peer hidden" name="dateFormatKey" value="KO" />
                  <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                    <p className="font-bold text-slate-600">
                      2024년 10월 11일 금요일 오전 1시 26분
                    </p>
                  </div>
                </label>
              </li>
              <li>
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    className="peer hidden"
                    name="dateFormatKey"
                    value="KO_EXCLUDE_TIME"
                  />
                  <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                    <p className="font-bold text-slate-600">2024년 10월 11일 금요일</p>
                  </div>
                </label>
              </li>
              <li>
                <label className="relative cursor-pointer">
                  <input type="radio" className="peer hidden" name="dateFormatKey" value="EN" />
                  <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                    <p className="font-bold text-slate-600">2024. 10. 11. (FRI) 1:26 AM</p>
                  </div>
                </label>
              </li>
              <li>
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    className="peer hidden"
                    name="dateFormatKey"
                    value="EN_EXCLUDE_TIME"
                  />
                  <div className="rounded-lg border border-slate-200 bg-white px-5 py-3 peer-checked:border-indigo-600">
                    <p className="font-bold text-slate-600">2024. 10. 11. (FRI)</p>
                  </div>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroWidgetModalContent;

function BreackLine() {
  return (
    <div className="center-flex h-9 gap-2 text-slate-300">
      <span className="h-px w-8 bg-current" />
      <span className="aspect-square h-[3px] rounded-full bg-current" />
      <span className="aspect-square h-[3px] rounded-full bg-current" />
      <span className="aspect-square h-[3px] rounded-full bg-current" />
      <span className="h-px w-8 bg-current" />
    </div>
  );
}
