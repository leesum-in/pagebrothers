'use client';

import type { EventSequenceItem, WidgetItem } from '@repo/shared';
import { LabelWithSub } from '@repo/shared';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { HiPlus } from 'react-icons/hi2';
import { useShallow } from 'zustand/shallow';

import { WidgetBreakLine } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useWidgetIndex } from '../hooks';
import type { HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';

interface EventSequenceWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function EventSequenceWidgetConfigure({ widgetItem }: EventSequenceWidgetConfigureProps) {
  const { register } = useFormContext<HookFormValues, EventSequenceItem[]>();
  const { setOnSubmit, closeModal, invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
      invitation: state.invitation,
    })),
  );
  const widgetIndex = useWidgetIndex(widgetItem);

  const {
    fields: eventSequenceFields,
    append: eventSequenceAppend,
    remove: eventSequenceRemove,
  } = useFieldArray<HookFormValues, `invitation.widgets.${number}.config.items`>({
    name: `invitation.widgets.${widgetIndex!}.config.items` as const,
    keyName: 'id',
  });

  return (
    <div className="space-y-8">
      {/** 텍스트 정렬 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector label="텍스트 정렬" widgetItem={widgetItem} />
      </div>

      {/** 타이틀 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub
            label="타이틀"
            subLabel="입력하면 구성 위에 추가됩니다."
            addOn={<span className="text-sm text-slate-400">(선택)</span>}
          />
        </div>
      </div>

      <WidgetBreakLine />

      {/** 구성 추가 */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-slate-600">
          <div className="font-bold">예식 구성</div>
          <div className="text-sm" />
        </div>
        <div>
          <ul className="space-y-4">
            {eventSequenceFields.map((field, index) => (
              <li className="relative" key={field.title}>
                <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 rounded-b-none focus-within:z-10">
                  <div className="flex flex-none items-center" />
                  <input
                    className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
                    spellCheck="false"
                    autoComplete="off"
                    placeholder="질문"
                    {...register(
                      `invitation.widgets.${widgetIndex}.config.items.${index}.title` as const,
                    )}
                  />
                  <div className="flex flex-none items-center">
                    <button
                      tabIndex={-1}
                      className="absolute bottom-0 right-0 p-4 text-base text-red-500"
                      type="button"
                    />
                  </div>
                </label>
                <label className="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200 -mt-[1px] rounded-t-none">
                  <div className="flex items-center" />
                  <textarea
                    className="block w-full resize-none bg-white px-4 py-3 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300 undefined"
                    spellCheck="false"
                    autoComplete="off"
                    rows={3}
                    placeholder="답변을 입력해주세요"
                    {...register(
                      `invitation.widgets.${widgetIndex}.config.items.${index}.description` as const,
                    )}
                  />
                  <div className="flex items-center" />
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button
        type="button"
        className="w-full h-12 rounded-md px-4 text-sm border border-dashed border-slate-300 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
      >
        <span>구성 추가하기</span>
        <HiPlus />
      </button>
    </div>
  );
}

export default EventSequenceWidgetConfigure;
