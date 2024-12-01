'use client';

import { Button, Label } from '@repo/shared';
import { APIProvider } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaRegTrashAlt } from 'react-icons/fa';

import { IntroSearchAddress } from '../intro';
import type { HookFormValues, SearchEngine } from '../types';
import WidgetLabelWithInput from './WidgetLabelWithInput';

interface WidgetAddressProps {
  isAddress: boolean;
  setIsAddress: (isAddress: boolean) => void;
}

function WidgetAddress({ isAddress, setIsAddress }: WidgetAddressProps) {
  const { watch } = useFormContext<HookFormValues>();

  const [searchEngine, setSearchEngine] = useState<SearchEngine>('KAKAO');

  const handleChangeEngine = () =>
    setSearchEngine((prev) => (prev === 'KAKAO' ? 'GOOGLE' : 'KAKAO'));

  const handleClickTrashCan = () => setIsAddress(true);

  return (
    <>
      {/** 예식장 주소 */}
      <div className="space-y-2">
        <div>
          <Label label="예식장 주소" />
        </div>
        {isAddress ? (
          <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? ''}>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 text-sm h-12 ">
                <WidgetLabelWithInput
                  labelClassName="group relative flex-1 cursor-pointer text-center h-10"
                  inputType="radio"
                  inputValue="KAKAO"
                  inputClassName="peer absolute cursor-pointer opacity-0"
                  inputChecked={searchEngine === 'KAKAO'}
                  onInputChange={handleChangeEngine}
                >
                  <span className="center-flex h-full w-full rounded-md text-slate-500 peer-checked:border peer-checked:border-slate-200 peer-checked:bg-white peer-checked:font-bold peer-checked:text-slate-600">
                    국내
                  </span>
                </WidgetLabelWithInput>

                <WidgetLabelWithInput
                  labelClassName="group relative flex-1 cursor-pointer text-center h-10"
                  inputType="radio"
                  inputValue="GOOGLE"
                  inputClassName="peer absolute cursor-pointer opacity-0"
                  inputChecked={searchEngine === 'GOOGLE'}
                  onInputChange={handleChangeEngine}
                >
                  <span className="center-flex h-full w-full rounded-md text-slate-500 peer-checked:border peer-checked:border-slate-200 peer-checked:bg-white peer-checked:font-bold peer-checked:text-slate-600">
                    해외
                  </span>
                </WidgetLabelWithInput>
              </div>
              <IntroSearchAddress engine={searchEngine} setIsAddress={setIsAddress} />
            </div>
          </APIProvider>
        ) : (
          <div>
            <div className="relative flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-100 text-left">
              <div className="w-0 flex-1 px-4">
                <p className="truncate text-slate-600">{watch('invitation.location.address')}</p>
                <p className="truncate text-sm text-slate-400">
                  {watch('invitation.location.roadAddress')}
                </p>
              </div>
              <Button
                type="button"
                variants="text_secondary"
                size="medium"
                className="center-flex h-16 w-16 flex-none text-slate-500"
              >
                <FaRegTrashAlt onClick={handleClickTrashCan} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default WidgetAddress;
