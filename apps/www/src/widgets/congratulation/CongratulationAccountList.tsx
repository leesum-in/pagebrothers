'use client';

import { Button, cn } from '@repo/shared';
import { useEffect, useState, type ChangeEvent } from 'react';
import type { Path } from 'react-hook-form';
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
  bank: string;
  handleClickTrashCan: () => void;
  handleBankChange: (itemIndex: number) => (value: string) => void;
}

function CongratulationAccountList({
  accountKey,
  itemIndex,
  widgetIndex,
  bank,
  handleClickTrashCan,
  handleBankChange,
}: CongratulationAccountListProps) {
  const [isInputError, setIsInputError] = useState(false);
  const { register, setValue, watch } = useFormContext<HookFormValues>();
  const { Combobox } = useCombobox({
    options: BANK_LIST,
    isRounded: false,
    initialSelected: bank,
    placeholder: '은행',
    customOnChange: handleBankChange(itemIndex),
    isInputError,
  });

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const path =
      `invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.role` as Path<HookFormValues>;
    setValue(path, target.value);

    if (target.value.length > 0) setIsInputError(false);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const path =
      `invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.name` as Path<HookFormValues>;
    setValue(path, target.value);

    if (target.value.length > 0) setIsInputError(false);
  };

  const handleNumberChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const path =
      `invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.number` as Path<HookFormValues>;
    setValue(path, target.value);

    if (target.value.length > 0) setIsInputError(false);
  };

  const role = watch(
    `invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.role`,
  ) as string;
  const name = watch(
    `invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.name`,
  ) as string;
  const number = watch(
    `invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.number`,
  ) as string;

  useEffect(() => {
    const form = document.getElementById('modal-form');
    const preventSubmit = () => {
      if (!role || !name || !number) setIsInputError(true);
    };
    if (!form) return;
    form.addEventListener('submit', preventSubmit);

    return () => {
      form.removeEventListener('submit', preventSubmit);
    };
  }, [role, name, number]);

  // const errorConfig = errors.invitation?.widgets?.[widgetIndex]?.config;

  // useEffect(() => {
  //   if (!errorConfig) return;
  //   const accounts = (errorConfig as CongratulationWidgetConfig).accounts[accountKey] as
  //     | OwnerAccountGroup
  //     | undefined;
  //   const items = accounts?.items;
  //   if (items) {
  //     setIsInputError(true);
  //   }
  //   return () => {
  //     setIsInputError(false);
  //   };
  // }, [errorConfig, accountKey]);

  return (
    <li className="relative grid grid-cols-2 gap-[-1px]">
      <WidgetLabelWithInput
        labelClassName={cn(
          'role relative flex items-center overflow-hidden border bg-white focus-within:ring border-slate-200 relative rounded-none rounded-tl-md focus-within:z-10',
          isInputError ? 'border-red-500' : '',
        )}
        inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
        placeholder="명칭"
        register={register}
        registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.role`}
        onInputChange={handleRoleChange}
      >
        <div className="flex flex-none items-center" />
      </WidgetLabelWithInput>

      <WidgetLabelWithInput
        labelClassName={cn(
          'name relative flex items-center overflow-hidden border bg-white focus-within:ring border-slate-200 relative -ml-px rounded-none rounded-tr-md focus-within:z-10',
          isInputError ? 'border-red-500' : '',
        )}
        inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
        placeholder="예금주"
        register={register}
        registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.name`}
        onInputChange={handleNameChange}
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
        labelClassName={cn(
          'number relative flex items-center overflow-hidden border bg-white focus-within:ring border-slate-200 relative -mt-px -ml-px rounded-none rounded-br-md focus-within:z-10',
          isInputError ? 'border-red-500' : '',
        )}
        inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
        placeholder="계좌번호 입력"
        register={register}
        registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${accountKey}.items.${itemIndex}.number`}
        onInputChange={handleNumberChange}
      >
        <div className="flex flex-none items-center" />
      </WidgetLabelWithInput>
    </li>
  );
}

// const CongratulationAccountList = memo(UnmemoizedCongratulationAccountList);
export default CongratulationAccountList;
