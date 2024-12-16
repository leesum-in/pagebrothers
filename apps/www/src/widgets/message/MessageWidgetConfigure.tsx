'use client';

import { LabelWithSub, WidgetItem } from '@repo/shared';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';
import { WidgetLabelWithInput } from '../components';
import { useFormContext } from 'react-hook-form';
import { HookFormValues } from '../types';
import { useWidgetIndex } from '../hooks';
interface MessageWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function MessageWidgetConfigure({ widgetItem }: MessageWidgetConfigureProps) {
  const { register } = useFormContext<HookFormValues>();

  const widgetIndex = useWidgetIndex(widgetItem);

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
        />
      </div>
    </div>
  );
}

export default MessageWidgetConfigure;
