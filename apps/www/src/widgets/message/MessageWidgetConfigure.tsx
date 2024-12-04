import { Label, LabelWithSub, LongTextField, TextInput, WidgetItem } from '@repo/shared';
import WidgetThreeWaySelector from '../components/WidgetThreeWaySelector';

interface MessageWidgetConfigureProps {
  widgetItem: WidgetItem | Omit<WidgetItem, 'id'>;
}

function MessageWidgetConfigure({ widgetItem }: MessageWidgetConfigureProps) {
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
        <TextInput status="default" placeholder="타이틀 입력" />
      </div>

      {/* 메세지 */}
      <div className="space-y-2">
        <LongTextField status="default" labelText="메세지" className="h-full px-4 py-3" />
      </div>
    </div>
  );
}

export default MessageWidgetConfigure;
