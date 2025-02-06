'use client';

import type { COLOR_HIGHLIGHTS, Font, IInvitationDesign, Size } from '@repo/shared';

import ColorSelector from './ColorSelector';
import FontSelector from './FontSelector';
import TextSizeSelector from './TextSizeSelector';

export interface DesignSelectorProps {
  design: IInvitationDesign;
  onUpdateDesign: (design: IInvitationDesign) => void;
}

export interface SelectorProps<T> {
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export default function ThemeSelector({
  design,
  onDesignChange,
}: {
  design: IInvitationDesign;
  onDesignChange: (design: Partial<IInvitationDesign>) => void;
}) {
  const handleColorChange = (color: keyof typeof COLOR_HIGHLIGHTS): void => {
    onDesignChange({ brandColor: color });
  };

  const handleFontChange = (font: Font): void => {
    onDesignChange({ font });
  };

  const handleTextSizeChange = (textSize: Size): void => {
    onDesignChange({ textSize });
  };

  return (
    <form className="p-4 desktop:p-6">
      <ul className="space-y-4">
        <ColorSelector value={design.brandColor} onChange={handleColorChange} />
        <hr className="border-t border-slate-200" />
        <FontSelector value={design.font} onChange={handleFontChange} />
        <hr className="border-t border-slate-200" />
        <TextSizeSelector value={design.textSize} onChange={handleTextSizeChange} />
      </ul>
    </form>
  );
}
