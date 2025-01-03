/* eslint-disable react/no-array-index-key -- Index is stable in this case as items maintain their order */
'use client';

import type { CongratulationLayoutKey, CongratulationWidgetConfig, WidgetItem } from '@repo/shared';
import { LabelWithSub } from '@repo/shared';
import type { ChangeEvent, MouseEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Path, SubmitHandler } from 'react-hook-form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { useShallow } from 'zustand/shallow';

import { FixedLoader } from '@/www/ui';

import { WidgetLabelWithInput } from '../components';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { useWidgetIndex } from '../hooks';
import { useInvitationConfigMutation } from '../mutations';
import type { ConfigPayload, HookFormValues } from '../types';
import type { ModalStore } from '../zustand';
import useModalStore from '../zustand';
import CongratulationAccountList from './CongratulationAccountList';
import CongratulationCheckbox from './CongratulationCheckbox';
import CongratulationLayoutCollapsible from './CongratulationLayoutCollapsible';
import CongratulationLayoutSpreaded from './CongratulationLayoutSpreaded';

const CONGRATULATION_LAYOUT_KEYS = ['COLLABSIBLE', 'SPREADED'] as const;
const ACCOUNTS_SIDE_KEYS = ['🤵 신랑측', '👰 신부측'] as const;

interface CongratulationWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function CongratulationWidgetConfigure({ widgetItem }: CongratulationWidgetConfigureProps) {
  const widgetConfig = widgetItem.config as CongratulationWidgetConfig;
  const { watch, register, setValue, getValues } = useFormContext<HookFormValues>();
  const { setOnSubmit, closeModal, invitation } = useModalStore(
    useShallow((state: ModalStore) => ({
      setOnSubmit: state.setOnSubmit,
      closeModal: state.closeModal,
      invitation: state.invitation,
      openMultiModal: state.openMultiModal,
    })),
  );
  const widgetIndex = useWidgetIndex(widgetItem);
  const { mutate: putInvitationConfig } = useInvitationConfigMutation(invitation?.id ?? '');
  const accounts = useRef(Object.entries(widgetConfig.accounts));
  const [groomUse, setGroomUse] = useState(accounts.current[0][1].use);
  const [brideUse, setBrideUse] = useState(accounts.current[1][1].use);

  const {
    fields: groomFields,
    append: groomAppend,
    remove: groomRemove,
  } = useFieldArray<
    HookFormValues,
    `invitation.widgets.${number}.config.accounts.${string}.items`,
    string
  >({
    name: `invitation.widgets.${widgetIndex!}.config.accounts.${accounts.current[0][0]}.items` as const,
  });
  const {
    fields: brideFields,
    append: brideAppend,
    remove: brideRemove,
  } = useFieldArray<
    HookFormValues,
    `invitation.widgets.${number}.config.accounts.${string}.items`,
    string
  >({
    name: `invitation.widgets.${widgetIndex!}.config.accounts.${accounts.current[1][0]}.items` as const,
  });

  const [layout, setLayout] = useState<CongratulationLayoutKey>(widgetConfig.layout);

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
      if (!widgetIndex) return;
      const path =
        `invitation.widgets.${widgetIndex}.config.accounts.${accounts.current[idx][0]}.items.${itemIndex}.bank` as Path<HookFormValues>;
      setValue(path, value);
    },
    [widgetIndex, setValue],
  );

  const handleClickLayoutInput = useCallback((e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setLayout(target.value as CongratulationLayoutKey);
  }, []);

  const handleClickTrashCan = useCallback(
    (index: number, type: 'groom' | 'bride') => () => {
      if (type === 'groom') groomRemove(index);
      else brideRemove(index);
    },
    [groomRemove, brideRemove],
  );

  const handleClickAddAccount = (type: 'groom' | 'bride') => () => {
    if (type === 'groom') groomAppend({ role: '', name: '', bank: '', number: '' });
    else brideAppend({ role: '', name: '', bank: '', number: '' });
  };

  const onSubmit: SubmitHandler<HookFormValues> = useCallback(() => {
    if (!invitation || widgetIndex === null || widgetIndex === -1 || !('id' in widgetItem)) return;

    const groomValues = getValues(
      `invitation.widgets.${widgetIndex}.config.accounts.${accounts.current[0][0]}.items`,
    );
    const brideValues = getValues(
      `invitation.widgets.${widgetIndex}.config.accounts.${accounts.current[1][0]}.items`,
    );

    const config: CongratulationWidgetConfig = {
      layout,
      title: watch(`invitation.widgets.${widgetIndex}.config.title`) ?? '',
      buttonLabel: watch(`invitation.widgets.${widgetIndex}.config.buttonLabel`),
      accounts: {
        [accounts.current[0][0]]: {
          label: watch(
            `invitation.widgets.${widgetIndex}.config.accounts.${accounts.current[0][0]}.label`,
          ),
          use: groomUse,
          items: groomValues,
        },
        [accounts.current[1][0]]: {
          label: watch(
            `invitation.widgets.${widgetIndex}.config.accounts.${accounts.current[1][0]}.label`,
          ),
          use: brideUse,
          items: brideValues,
        },
      },
    };

    const configPayloadData: ConfigPayload = {
      id: widgetItem.id,
      type: 'CONGRATULATION',
      index: widgetIndex,
      config,
      stickers: [],
    };

    console.log('configPayloadData ====>', configPayloadData);
    // putInvitationConfig(configPayloadData);
    // closeModal();
  }, [
    widgetIndex,
    invitation,
    widgetItem,
    groomUse,
    brideUse,
    layout,
    watch,
    closeModal,
    putInvitationConfig,
    getValues,
  ]);

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
              inputDefaultChecked={layout === key}
              onInputClick={handleClickLayoutInput}
            >
              <div className="center-flex h-full rounded-lg border border-slate-200 bg-white p-4 shadow-1 peer-checked:border-indigo-600 peer-checked:shadow-violet">
                <div className="text-center">
                  {key === 'COLLABSIBLE' ? (
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
        {accounts.current.map(([key, account], idx) => (
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
      {layout === 'SPREADED' ? (
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
      ) : null}

      {/** 신랑측 계좌 */}
      <div className="space-y-2 ">
        <CongratulationCheckbox
          label={ACCOUNTS_SIDE_KEYS[0]}
          registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${accounts.current[0][0]}.use`}
          checked={groomUse}
          handleUseChange={handleUseChange(0)}
        />
        <div>
          <ul className="space-y-4">
            {groomUse
              ? groomFields.map((item, index) => (
                  <CongratulationAccountList
                    key={`${index}-groom`}
                    accountKey={accounts.current[0][0]}
                    itemIndex={index}
                    widgetIndex={widgetIndex}
                    bank={item.bank}
                    handleClickTrashCan={handleClickTrashCan(index, 'groom')}
                    handleBankChange={handleBankChange(0)}
                  />
                ))
              : null}
            {groomUse ? <AddAccountButton onClick={handleClickAddAccount('groom')} /> : null}
          </ul>
        </div>
      </div>

      {/** 신부측 계좌 */}
      <div className="space-y-2 ">
        <CongratulationCheckbox
          label={ACCOUNTS_SIDE_KEYS[1]}
          registerOption={`invitation.widgets.${widgetIndex}.config.accounts.${accounts.current[1][0]}.use`}
          checked={brideUse}
          handleUseChange={handleUseChange(1)}
        />
        <div>
          <ul className="space-y-4">
            {brideUse
              ? brideFields.map((item, index) => (
                  <CongratulationAccountList
                    key={`${index}-bride`}
                    accountKey={accounts.current[1][0]}
                    itemIndex={index}
                    widgetIndex={widgetIndex}
                    bank={item.bank}
                    handleClickTrashCan={handleClickTrashCan(index, 'bride')}
                    handleBankChange={handleBankChange(1)}
                  />
                ))
              : null}
            {brideUse ? <AddAccountButton onClick={handleClickAddAccount('bride')} /> : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CongratulationWidgetConfigure;

interface AddAccountButtonProps {
  onClick: () => void;
}

function AddAccountButton({ onClick }: AddAccountButtonProps) {
  return (
    <li>
      <button
        type="button"
        className="w-full h-12 rounded-md px-4 text-sm border border-dashed border-slate-300 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
        onClick={onClick}
      >
        <span>추가하기</span>
        <FiPlus className="text-lg" />
      </button>
    </li>
  );
}
