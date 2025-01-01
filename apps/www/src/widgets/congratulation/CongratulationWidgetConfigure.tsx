'use client';

import type { CongratulationWidgetConfig, OwnerAccountItem, WidgetItem } from '@repo/shared';
import { Label, LabelWithSub } from '@repo/shared';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetLabelWithInput } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useWidgetIndex } from '../hooks';
import type { HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';
import CongratulationAccountList from './CongratulationAccountList';
import CongratulationLayoutCollapsible from './CongratulationLayoutCollapsible';
import CongratulationLayoutSpreaded from './CongratulationLayoutSpreaded';

const CONGRATULATION_LAYOUT_KEYS = ['COLLAPSIBLE', 'SPREADED'] as const;
const ACCOUNTS_SIDE_KEYS = ['🤵 신랑측', '👰 신부측'] as const;

interface CongratulationWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function CongratulationWidgetConfigure({ widgetItem }: CongratulationWidgetConfigureProps) {
  const widgetConfig = widgetItem.config as CongratulationWidgetConfig;
  const { watch, register } = useFormContext<HookFormValues>();
  const { setOnSubmit, closeModal, invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
      invitation: state.invitation,
      openMultiModal: state.openMultiModal,
    })),
  );
  const widgetIndex = useWidgetIndex(widgetItem);
  const accounts = Object.entries(widgetConfig.accounts);
  const [groomUse, setGroomUse] = useState(accounts[0][1].use);
  const [brideUse, setBrideUse] = useState(accounts[1][1].use);
  const [groomItems, setGroomItems] = useState<OwnerAccountItem[]>(accounts[0][1].items);
  const [brideItems, setBrideItems] = useState<OwnerAccountItem[]>(accounts[1][1].items);

  const handleUseChange = useCallback(
    (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target;
      if (idx === 0) setGroomUse(target.checked);
      else setBrideUse(target.checked);
    },
    [],
  );

  const handleBankChange = useCallback(
    (idx: number) => (itemIndex: number) => (value: string) => {
      if (idx === 0)
        setGroomItems((prev) => {
          const newItems = [...prev];
          newItems[itemIndex] = { ...newItems[itemIndex], bank: value };
          return newItems;
        });
      else
        setBrideItems((prev) => {
          const newItems = [...prev];
          newItems[itemIndex] = { ...newItems[itemIndex], bank: value };
          return newItems;
        });
    },
    [],
  );

  console.log(groomItems);

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(() => {
    if (!invitation || widgetIndex === null || widgetIndex === -1 || !('id' in widgetItem)) return;
  }, [widgetIndex, invitation, widgetItem]);

  // console.log(groomItems, brideItems);

  useEffect(() => {
    setOnSubmit(onSubmit);
  }, [setOnSubmit, onSubmit]);

  if (widgetIndex === null) return <FixedLoader />;

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
            subLabel="입력하면 계좌 목록 위에 추가됩니다."
            addOn={<span className="text-sm text-slate-400">(선택)</span>}
          />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
            defaultValue={widgetConfig.title}
            placeholder="타이틀 입력"
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.title`}
          >
            <div className="flex items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      {/** 레이아웃 */}
      <ul className="flex items-stretch gap-4">
        {CONGRATULATION_LAYOUT_KEYS.map((key) => (
          <li className="w-0 flex-1" key={key}>
            <WidgetLabelWithInput
              labelClassName="h-full cursor-pointer"
              inputClassName="peer hidden"
              inputType="radio"
              inputValue={key}
              register={register}
              registerOption={`invitation.widgets.${widgetIndex}.config.layout`}
              inputDefaultChecked={(widgetItem.config as CongratulationWidgetConfig).layout === key}
            >
              <div className="center-flex h-full rounded-lg border border-slate-200 bg-white p-4 shadow-1 peer-checked:border-indigo-600 peer-checked:shadow-violet">
                <div className="text-center">
                  {key === 'COLLAPSIBLE' ? (
                    <>
                      <CongratulationLayoutCollapsible className="mx-auto h-6" />
                      <p className="mt-2 text-sm font-bold text-slate-600">버튼형</p>
                      <p className="text-xs text-slate-400">계좌 정보를 버튼안에 숨겨요.</p>
                    </>
                  ) : (
                    <>
                      <CongratulationLayoutSpreaded className="mx-auto h-6" />
                      <p className="mt-2 text-sm font-bold text-slate-600">리스트형</p>
                      <p className="text-xs text-slate-400">계좌 정보를 펼쳐놓아요.</p>
                    </>
                  )}
                </div>
              </div>
            </WidgetLabelWithInput>
          </li>
        ))}
      </ul>

      {/** 양측 대표 이름 */}
      <div className="flex items-start gap-4">
        {accounts.map(([key, account], idx) => (
          <div className="space-y-2 w-full" key={account.label}>
            <div>
              <LabelWithSub
                label={idx === 0 ? '신랑측 대표 이름' : '신부측 대표 이름'}
                addOn={<span className="text-sm text-slate-400">(선택)</span>}
              />
            </div>
            <div>
              <WidgetLabelWithInput
                labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
                inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
                defaultValue={account.label}
                placeholder="대표 이름 입력"
                register={register}
                registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${key}.label`}
              >
                <div className="flex items-center" />
              </WidgetLabelWithInput>
            </div>
          </div>
        ))}
      </div>

      {/** 버튼 문구 */}
      <div className="space-y-2 ">
        <div>
          <LabelWithSub
            label="버튼 문구"
            subLabel="8자 이내가 적당해요. 너무 길면 문구가 잘려요."
            addOn={<span className="text-sm text-slate-400">(선택)</span>}
          />
        </div>
        <div>
          <WidgetLabelWithInput
            labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
            inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
            defaultValue={widgetConfig.buttonLabel}
            placeholder="버튼 문구 입력"
            register={register}
            registerOption={`invitation.widgets.${widgetIndex}.config.buttonLabel`}
          >
            <div className="flex items-center" />
          </WidgetLabelWithInput>
        </div>
      </div>

      {/** 양측 계좌 */}
      <div className="space-y-2 ">
        <Selectable
          label={ACCOUNTS_SIDE_KEYS[0]}
          registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${accounts[0][0]}.use`}
          checked={groomUse}
          handleUseChange={handleUseChange(0)}
        />
        {groomUse
          ? groomItems.map((item, index) => (
              <CongratulationAccountList
                key={item.name + item.role}
                accountKey={accounts[0][0]}
                itemIndex={index}
                widgetIndex={widgetIndex}
                handleClickTrashCan={() => {}}
                handleBankChange={handleBankChange(0)}
              />
            ))
          : null}
        <AddAccountButton />
        <Selectable
          label={ACCOUNTS_SIDE_KEYS[1]}
          registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${accounts[1][0]}.use`}
          checked={brideUse}
          handleUseChange={handleUseChange(1)}
        />
        {brideUse
          ? brideItems.map((item, index) => (
              <CongratulationAccountList
                key={item.name + item.role}
                accountKey={accounts[1][0]}
                itemIndex={index}
                widgetIndex={widgetIndex}
                handleClickTrashCan={() => {}}
                handleBankChange={handleBankChange(1)}
              />
            ))
          : null}
        <AddAccountButton />
      </div>
    </div>
  );
}

export default CongratulationWidgetConfigure;

interface SelectableProps {
  label: string;
  registerOption: string;
  checked: boolean;
  handleUseChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Selectable({ label, registerOption, checked, handleUseChange }: SelectableProps) {
  const { register } = useFormContext<HookFormValues>();

  return (
    <div>
      <Label
        label={label}
        addOn={
          <label className="center-flex relative flex cursor-pointer gap-2 text-sm leading-5 ">
            <input
              className="no-interaction peer absolute flex-none opacity-0"
              type="checkbox"
              checked={checked}
              {...register(registerOption as keyof HookFormValues)}
              onChange={handleUseChange}
            />
            <div className="relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color] after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform] peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-indigo-600 peer-focus:ring" />
          </label>
        }
      />
      <div className="text-sm text-slate-400">화면 하단에 참석 여부를 묻는 버튼이 따라다녀요.</div>
    </div>
  );
}

function AddAccountButton() {
  return (
    <button
      type="button"
      className="w-full h-12 rounded-md px-4 text-sm border border-dashed border-slate-300 !shadow-none center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
    >
      <span>추가하기</span>
      <FiPlus className="text-lg" />
    </button>
  );
}
