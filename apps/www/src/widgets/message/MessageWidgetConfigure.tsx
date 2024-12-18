'use client';

import { LabelWithSub, MessageWidgetConfig, WidgetItem } from '@repo/shared';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { WidgetLabelWithInput } from '../components';
import { useFormContext } from 'react-hook-form';
import { ConfigPayload, HookFormValues } from '../types';
import { useWidgetIndex } from '../hooks';

interface MessageWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function MessageWidgetConfigure({ widgetItem }: MessageWidgetConfigureProps) {
  const { watch, register } = useFormContext<HookFormValues>();

  const widgetIndex = useWidgetIndex(widgetItem);

  const onSubmit = () => {
    if (widgetIndex === null || !('id' in widgetItem)) return;

    const config: MessageWidgetConfig = {
      widgetTitle: watch(`invitation.widgets.${widgetIndex}.config.widgetTitle`),
      title: watch(`invitation.widgets.${widgetIndex}.config.title`) ?? '',
      size: watch(`invitation.widgets.${widgetIndex}.config.size`),
      align: watch(`invitation.widgets.${widgetIndex}.config.align`) ?? 'CENTER',
    };

    const configPayloadData: ConfigPayload = {
      id: widgetItem.id,
      type: 'MESSAGE',
      config,
      index: widgetIndex,
      stickers: [],
    };
  };

  return (
    <div className="space-y-8">
      {/* 텍스트 정렬 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector label="텍스트 정렬" widgetItem={widgetItem} />
      </div>

      {/* 텍스트 크기 */}
      <div className="space-y-2">
        <WidgetThreeWaySelector
          label="텍스트 크기"
          texts={['작게', '보통', '크게']}
          value={['sm', 'md', 'lg']}
          widgetItem={widgetItem}
        />
      </div>

      {/* 타이틀 */}
      <div className="space-y-2">
        <div>
          <LabelWithSub
            label="타이틀"
            addOn="(선택)"
            subLabel="입력하면 위젯에 제목이 추가됩니다."
          />
        </div>
        <WidgetLabelWithInput
          labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
          inputClassName="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
          placeholder="타이틀 입력"
          register={register}
          registerOption={`invitation.widgets.${widgetIndex}.config.widgetTitle`}
          defaultValue={(widgetItem.config as MessageWidgetConfig).widgetTitle}
        />
      </div>

      {/* 메세지 */}
      <div className="space-y-2">
        <div>
          <LabelWithSub label="메세지" />
        </div>
        <WidgetLabelWithInput
          isTextarea={true}
          labelClassName="relative flex items-center overflow-hidden rounded-lg border focus-within:ring border-slate-200"
          register={register}
          registerOption={`invitation.widgets.${widgetIndex}.config.title`}
          defaultValue={(widgetItem.config as MessageWidgetConfig).title}
        />
      </div>
    </div>
  );
}

export default MessageWidgetConfigure;
