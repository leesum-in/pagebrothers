/* eslint-disable react/no-array-index-key -- 문항 삭제 시 오류 발생 */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Label, type RsvpExtraField } from '@repo/shared';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiPlus } from 'react-icons/hi2';
import { IoIosArrowDown } from 'react-icons/io';
import { IoCloseCircleOutline } from 'react-icons/io5';

import { Move } from '@/www/ui';

import { WidgetLabelWithInput } from '../components';
import type { HookFormValues } from '../types';
import RsvpExtraFieldTitle from './RsvpExtraFieldTitle';

interface RsvpExtraFieldsProps {
  extraField: RsvpExtraField;
  index: number;
  widgetIndex: number;
  setExtraFields: Dispatch<SetStateAction<RsvpExtraField[]>>;
}

function RsvpExtraFieldsUI({
  extraField,
  index,
  widgetIndex,
  setExtraFields,
}: RsvpExtraFieldsProps) {
  const { watch, register, setValue } = useFormContext<HookFormValues>();
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } =
    useSortable({
      id: extraField.id, // 고유 ID
    });
  const [options, setOptions] = useState(extraField.options);

  // y축만 적용하도록 transform 수정
  const adjustedTransform = transform
    ? { ...transform, x: 0 } // x축 값을 0으로 고정
    : null;

  const style = {
    transform: CSS.Transform.toString(adjustedTransform),
    transition,
    boxShadow: transform ? '0px 0px 20px 0px rgba(0, 0, 0, 0.1)' : 'none', // 드래그 중에만 shadow 적용
  };

  const type = watch(`invitation.widgets.${widgetIndex}.config.extraFields.${index}.type`);

  const handleAddOption = () => {
    setOptions((prev) => [...prev, '']);
  };

  const handleDeleteOption = (option: string) => {
    setOptions((prev) => prev.filter((o) => o !== option));
  };

  const handleDeleteField = () => {
    if (confirm('이 문항을 삭제하시겠어요? 삭제된 내용은 복구할 수 없어요.')) {
      setExtraFields((prev) => {
        const newExtraFields = prev.filter((item) => item.id !== extraField.id);
        return newExtraFields;
      });
    }
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
            ref={setActivatorNodeRef}
          >
            <Move className="text-xl text-slate-500" />
          </button>
          <div className="space-y-2 min-w-[50%]">
            <div>
              <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-full">
                <div className="flex flex-none items-center" />
                <select
                  defaultValue={type}
                  className="peer block h-12 w-full appearance-none bg-white pl-4 pr-16 text-slate-600 invalid:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
                  {...register(
                    `invitation.widgets.${widgetIndex}.config.extraFields.${index}.type`,
                  )}
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
            <FaRegTrashAlt className="w-[14px] h-[14px]" onClick={handleDeleteField} />
          </button>
        </li>

        {type === 'Radio' || type === 'Select' ? (
          <>
            <RsvpExtraFieldTitle extraField={extraField} index={index} widgetIndex={widgetIndex} />
            <li>
              <div className="space-y-2 ">
                <div>
                  <Label label="선택지" />
                </div>
                <div>
                  <div className="space-y-2">
                    {options.map((option, idx) => (
                      <WidgetLabelWithInput
                        key={`${option}option${idx}`}
                        labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-full"
                        inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
                        defaultValue={option}
                        placeholder="선택 옵션 입력(8자 이하가 예뻐요.)"
                        register={register}
                        registerOption={`invitation.widgets.${widgetIndex}.config.extraFields.${index}.options.${idx}`}
                      >
                        <div className="flex flex-none items-center">
                          {idx >= 2 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteOption(option)}
                              className="center-flex h-12 w-12 opacity-50"
                            >
                              <IoCloseCircleOutline />
                            </button>
                          )}
                        </div>
                      </WidgetLabelWithInput>
                    ))}
                    <button
                      disabled={options.length >= 3}
                      type="button"
                      onClick={handleAddOption}
                      className="h-12 w-12 !p-0 rounded-md px-4 text-sm border border-dashed border-slate-300 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
                    >
                      <HiPlus />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </>
        ) : null}
        {type === 'InputText' && (
          <>
            <RsvpExtraFieldTitle extraField={extraField} index={index} widgetIndex={widgetIndex} />
            <li>
              <div className="space-y-2 ">
                <div>
                  <Label label="힌트 텍스트" addOn="입력하기 전, 입력 칸에 보이는 문구예요." />
                </div>
                <div>
                  <div className="space-y-2">
                    <WidgetLabelWithInput
                      labelClassName="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 w-full"
                      inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
                      defaultValue={extraField.placeholder}
                      placeholder="입력하지 않으면 “여기에 입력”으로 나와요."
                      register={register}
                      registerOption={`invitation.widgets.${widgetIndex}.config.extraFields.${index}.placeholder`}
                    >
                      <div className="flex flex-none items-center" />
                    </WidgetLabelWithInput>
                  </div>
                </div>
              </div>
            </li>
          </>
        )}
        {type === 'InputNumber' && (
          <>
            <li>
              <p className="text-sm text-slate-400">
                플러스(+)와 마이너스(-) 버튼으로
                <br />
                1부터 100사이 숫자를 입력하는 문항입니다.
              </p>
            </li>
            <RsvpExtraFieldTitle extraField={extraField} index={index} widgetIndex={widgetIndex} />
          </>
        )}

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
                      onChange={(e) => {
                        setValue(
                          `invitation.widgets.${widgetIndex}.config.extraFields.${index}.needResponseRejected`,
                          e.target.checked,
                        );
                        setExtraFields((prev) => {
                          const newFields = [...prev];
                          newFields[index] = {
                            ...newFields[index],
                            needResponseRejected: e.target.checked,
                          };
                          return newFields;
                        });
                      }}
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
                      checked={extraField.optional ?? false}
                      onChange={(e) => {
                        setValue(
                          `invitation.widgets.${widgetIndex}.config.extraFields.${index}.optional`,
                          e.target.checked,
                        );
                        setExtraFields((prev) => {
                          const newFields = [...prev];
                          newFields[index] = {
                            ...newFields[index],
                            optional: e.target.checked,
                          };
                          return newFields;
                        });
                      }}
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

export default RsvpExtraFieldsUI;
