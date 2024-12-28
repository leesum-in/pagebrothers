import { PropsWithChildren } from 'react';
import { HiChevronDown, HiMinus, HiPlus } from 'react-icons/hi2';
import { RsvpExtraField } from '../../../types';
import { Label } from '../../label';
import RsvpButtons from './RsvpButtons';
import RsvpLabelWithInput from './RsvpLabelWithInput';

interface RsvpExtraFieldsProps {
  extraField: RsvpExtraField;
}

function RsvpExtraFields({ extraField }: RsvpExtraFieldsProps) {
  // 버튼 항목이 많으면??
  if (extraField.type === 'Radio') {
    return (
      <RsvpExtraFieldWrapper extraField={extraField}>
        <div>
          <RsvpButtons options={extraField.options} />
        </div>
      </RsvpExtraFieldWrapper>
    );
  }
  if (extraField.type === 'InputText') {
    return (
      <RsvpExtraFieldWrapper extraField={extraField}>
        <div>
          <RsvpLabelWithInput placeholder={extraField.placeholder} name="" />
        </div>
      </RsvpExtraFieldWrapper>
    );
  }
  if (extraField.type === 'InputNumber') {
    // 버튼
    // react-hook-form watch 사용하여
    // 값이 1 이면 버튼 비활성화
    // 값이 100 이면 버튼 비활성화
    // 값이 1 이면 버튼 활성화
    // 값이 100 이면 버튼 활성화
    return (
      <RsvpExtraFieldWrapper extraField={extraField}>
        <div className="flex items-center gap-2">
          <RsvpLabelWithInput
            placeholder={extraField.placeholder}
            name=""
            type="number"
            readOnly
            defaultValue={1}
          />
          <button
            type="button"
            className="overflow-hidden rounded-md border border-slate-200 focus:ring disabled:bg-slate-100 disabled:opacity-50"
            disabled
          >
            <div className="center-flex h-12 w-12">
              <HiMinus />
            </div>
          </button>
          <button
            type="button"
            className="overflow-hidden rounded-md border border-slate-200 focus:ring disabled:bg-slate-100 disabled:opacity-50"
            disabled
          >
            <div className="center-flex h-12 w-12">
              <HiPlus />
            </div>
          </button>
        </div>
      </RsvpExtraFieldWrapper>
    );
  }
  if (extraField.type === 'Select') {
    return (
      <RsvpExtraFieldWrapper extraField={extraField}>
        <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200">
          <div className="flex flex-none items-center"></div>
          <select
            className="peer block h-12 w-full appearance-none bg-white pl-4 pr-16 text-slate-600 invalid:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
            required
            name="formValues.796573f2-795a-4cb7-a0c2-fde49ea86d57"
          >
            {extraField.options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="no-interaction center-flex absolute inset-0 left-auto m-auto flex h-12 w-12 flex-none items-center">
            <HiChevronDown />
          </div>
        </label>
      </RsvpExtraFieldWrapper>
    );
  }

  return null;
}

export default RsvpExtraFields;

interface RsvpExtraFieldWrapperProps {
  extraField: RsvpExtraField;
}

function RsvpExtraFieldWrapper({
  children,
  extraField,
}: PropsWithChildren<RsvpExtraFieldWrapperProps>) {
  return (
    <li>
      <div className="space-y-2">
        {extraField.label && (
          <div>
            <Label label={extraField.label} />
            {extraField.optional && <div className="text-sm text-slate-400">선택 문항이에요</div>}
          </div>
        )}
        {children}
      </div>
    </li>
  );
}
