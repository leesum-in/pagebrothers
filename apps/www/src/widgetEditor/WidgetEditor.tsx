'use client';

import DesignSettings from '@/designSettings/DesignSettings';
import { PageWrapper } from '@/ui/wrapper';
import WidgetItem from '@/widgetEditor/WidgetItem';

import AddWidgetButton from './AddWidgetButton';
import EditorButtons from './EditorButtons';

export interface WidgetEditorProps {
  onAddWidget: () => void;
  onPreview: () => void;
  onShare: () => void;
}

function WidgetEditor({ onAddWidget, onPreview, onShare }: WidgetEditorProps) {
  return (
    <PageWrapper
      className="bg-slate-50"
      extraChildren={<EditorButtons onPreview={onPreview} onShare={onShare} />}
    >
      <div className="desktop:flex-1">
        <div className="mx-auto w-full max-w-[26rem]">
          <div className="space-y-6">
            <WidgetItem />
            <AddWidgetButton onAddWidget={onAddWidget} />
          </div>
        </div>
      </div>
      <DesignSettings />
    </PageWrapper>
  );
}

export default WidgetEditor;
