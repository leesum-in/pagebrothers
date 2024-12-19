import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Label, type RsvpExtraField } from '@repo/shared';
import { useFormContext } from 'react-hook-form';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

import { Move } from '@/www/ui';

import { WidgetLabelWithInput } from '../components';
import type { HookFormValues } from '../types';

interface RsvpExtraFieldsProps {
  extraField: RsvpExtraField;
  index: number;
  widgetIndex: number;
}

function RsvpExtraFields({ extraField, index, widgetIndex }: RsvpExtraFieldsProps) {
  const { watch, register } = useFormContext<HookFormValues>();

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: extraField.id, // 고유 ID
  });

  // y축만 적용하도록 transform 수정
  const adjustedTransform = transform
    ? { ...transform, x: 0 } // x축 값을 0으로 고정
    : null;

  const style = {
    transform: CSS.Transform.toString(adjustedTransform),
    transition,
    boxShadow: transform ? '0px 0px 20px 0px rgba(0, 0, 0, 0.1)' : 'none', // 드래그 중에만 shadow 적용
  };

  return (
    <li
      className="relative rounded-md border border-slate-200 bg-slate-100 py-4 px-3 cursor-default"
      style={style}
      ref={setNodeRef}
      {...attributes}
    >
      <ul className="space-y-5">
        <li className="relative flex items-center gap-2">
          <button
            className="center-flex h-12 w-12 touch-none gap-3 rounded-md bg-white ring-1"
            type="button"
            {...listeners}
          >
            <Move className="text-xl text-slate-500" />
          </button>
          <div className="space-y-2 min-w-[50%]">
            <div>
              <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-full">
                <div className="flex flex-none items-center" />
                <select
                  className="peer block h-12 w-full appearance-none bg-white pl-4 pr-16 text-slate-600 invalid:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
                  name={`extraFields.${index}.type`}
                >
                  <option value="InputText">주관식</option>
                  <option value="InputNumber">숫자 카운트</option>
                  <option value="Radio">버튼형 객관식 질문</option>
                  <option value="Select">리스트형 객관식 질문</option>
                </select>
                <div className="no-interaction center-flex absolute inset-0 left-auto m-auto flex h-12 w-12 flex-none items-center">
                  <IoIosArrowDown className="text-xl" />
                </div>
              </label>
            </div>
          </div>
          <button
            className="absolute bottom-0 right-0 -translate-y-2 p-4 text-base text-red-500"
            type="button"
          >
            <FaRegTrashAlt className="w-[14px] h-[14px]" />
          </button>
        </li>
        <li>
          <div className="space-y-2 ">
            <div>
              <Label label="문항 타이틀" />
            </div>
            <div>
              <WidgetLabelWithInput
                labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-full"
                inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
                defaultValue={extraField.label}
                placeholder="입력하지 않으면 문항 타이틀이 생략돼요."
                register={register}
                registerOption={`invitation.widgets.${widgetIndex}.config.extraFields.${index}.label`}
              >
                <div className="flex flex-none items-center" />
              </WidgetLabelWithInput>
            </div>
          </div>
        </li>
        <li>
          <div className="space-y-2 ">
            <div>
              <Label label="선택지" />
            </div>
            <div>
              <div className="space-y-2">
                <WidgetLabelWithInput
                  labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-full"
                  inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
                  defaultValue={extraField.label}
                  placeholder="선택 옵션 입력(8자 이하가 예뻐요.)"
                  register={register}
                  registerOption={`invitation.widgets.${widgetIndex}.config.extraFields.${index}.options.0`}
                >
                  <div className="flex flex-none items-center" />
                </WidgetLabelWithInput>
                <WidgetLabelWithInput
                  labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-full"
                  inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
                  defaultValue={extraField.label}
                  placeholder="선택 옵션 입력(8자 이하가 예뻐요.)"
                  register={register}
                  registerOption={`invitation.widgets.${widgetIndex}.config.extraFields.${index}.options.1`}
                >
                  <div className="flex flex-none items-center" />
                </WidgetLabelWithInput>
                <button
                  type="button"
                  className="h-12 w-12 !p-0 rounded-md px-4 text-sm border border-dashed border-slate-300 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
                >
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-xl"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="space-y-2 ">
            <div>
              <Label
                label="불참 하객에게도 물어볼까요?"
                addOn={
                  <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
                    <input
                      className="no-interaction peer absolute flex-none opacity-0"
                      type="checkbox"
                      checked={extraField.needResponseRejected}
                      {...register(
                        `invitation.widgets.${widgetIndex}.config.extraFields.${index}.needResponseRejected`,
                      )}
                    />
                    <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
                  </label>
                }
              />
              <div className="text-sm text-slate-400" />
            </div>
          </div>
        </li>
        <li>
          <div className="space-y-2 ">
            <div>
              <Label
                label="선택 문항인가요?"
                addOn={
                  <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
                    <input
                      className="no-interaction peer absolute flex-none opacity-0"
                      type="checkbox"
                      checked={extraField.optional}
                      {...register(
                        `invitation.widgets.${widgetIndex}.config.extraFields.${index}.optional`,
                      )}
                    />
                    <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
                  </label>
                }
              />
              <div className="text-sm text-slate-400" />
            </div>
          </div>
        </li>
      </ul>
    </li>
  );
}

export default RsvpExtraFields;
