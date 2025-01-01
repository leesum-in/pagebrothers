'use client';

import { Button } from '@repo/shared';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegTrashAlt } from 'react-icons/fa';

import { WidgetLabelWithInput } from '../components';
import useCombobox from '../hooks';
import type { HookFormValues } from '../types';

const BANK_LIST = [
  '국민은행',
  '우리은행',
  '신한은행',
  '하나은행',
  'SC제일은행',
  '케이뱅크',
  '카카오뱅크',
  '토스뱅크',
  '농협',
  '수협',
  '신협',
  '새마을금고',
  '씨티은행',
  '기업은행',
  '우체국은행',
  '중소기업은행',
  '산업은행',
  '부산은행',
  '대구은행',
  '경남은행',
  '광주은행',
  '제주은행',
  '전북은행',
];

interface CongratulationAccountListProps {
  accountKey: string;
  itemIndex: number;
  widgetIndex: number;
  handleClickTrashCan: () => void;
  handleBankChange: (itemIndex: number) => (value: string) => void;
}

function UnmemoizedCongratulationAccountList({
  accountKey,
  itemIndex,
  widgetIndex,
  handleClickTrashCan,
  handleBankChange,
}: CongratulationAccountListProps) {
  const { register } = useFormContext<HookFormValues>();
  const { Combobox } = useCombobox({
    options: BANK_LIST,
    isRounded: false,
    initialSelected: '',
    placeholder: '은행',
    customOnChange: handleBankChange(itemIndex),
  });

  return (
    <li className="relative grid grid-cols-2 gap-[-1px]">
      <WidgetLabelWithInput
        labelClassName="relative flex items-center overflow-hidden border bg-white focus-within:ring border-slate-200 relative rounded-none rounded-tl-md focus-within:z-10"
        inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
        placeholder="명칭"
        register={register}
        registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.role`}
      >
        <div className="flex flex-none items-center" />
      </WidgetLabelWithInput>

      <WidgetLabelWithInput
        labelClassName="relative flex items-center overflow-hidden border bg-white focus-within:ring border-slate-200 relative -ml-px rounded-none rounded-tr-md focus-within:z-10"
        inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
        placeholder="예금주"
        register={register}
        registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.name`}
      >
        <div className="flex flex-none items-center">
          {itemIndex > 0 ? (
            <Button
              type="button"
              variants="text_secondary"
              size="medium"
              className="center-flex w-12 h-12 flex-none text-red-500"
            >
              <FaRegTrashAlt className="w-[14px] h-[14px]" onClick={handleClickTrashCan} />
            </Button>
          ) : null}
        </div>
      </WidgetLabelWithInput>

      {Combobox()}

      <WidgetLabelWithInput
        labelClassName="relative flex items-center overflow-hidden border bg-white focus-within:ring border-slate-200 relative -mt-px -ml-px rounded-none rounded-br-md focus-within:z-10"
        inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
        placeholder="계좌번호 입력"
        register={register}
        registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.number`}
      >
        <div className="flex flex-none items-center" />
      </WidgetLabelWithInput>
    </li>
  );
}

const CongratulationAccountList = memo(UnmemoizedCongratulationAccountList);
export default CongratulationAccountList;
