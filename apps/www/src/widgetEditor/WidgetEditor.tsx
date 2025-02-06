'use client';

import AddWidgetButton from './AddWidgetButton';
import EditorButtons from './EditorButtons';
import WidgetItem from './WidgetItem';
import DesignSettings from '../designSettings/DesignSettings';
import PageWrapper from '../ui/wrapper/PageWrapper';

function WidgetEditor() {
  const handleAddWidget = () => console.log('위젯 추가하기 누름');
  const handlePreview = () => console.log('미리보기 누름');
  const handleShare = () => console.log('공유하기 누름');
  return (
    <PageWrapper
      className="bg-slate-50"
      extraChildren={<EditorButtons onPreview={handlePreview} onShare={handleShare} />}
    >
      <div className="desktop:flex-1">
        <div className="mx-auto w-full max-w-[26rem]">
          <div className="space-y-6">
            <WidgetItem />
            <AddWidgetButton onAddWidget={handleAddWidget} />
          </div>
        </div>
      </div>
      <DesignSettings />
    </PageWrapper>
  );
}

export default WidgetEditor;
