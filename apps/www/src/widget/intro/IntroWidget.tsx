import { memo } from 'react';

import type {
  IInvitation,
  IntroLayoutKey,
  IntroWidgetConfig,
  WidgetItem,
} from '@/types/pageBrothers.type';
import { WidgetWrapper } from '@/widget/common';

import Intro from './Intro';

interface IntroWidgetProps {
  invitation?: IInvitation;
  widget: WidgetItem;
  isMultiModal?: boolean;
  widgetOnly?: boolean;
  selectedLayout?: IntroLayoutKey;
}

function IntroWidgetComp({
  invitation,
  widget: widgetItem,
  isMultiModal = false,
  widgetOnly = false,
  selectedLayout,
}: IntroWidgetProps): React.ReactNode {
  const { subTitle, title, coverImage } = widgetItem.config as IntroWidgetConfig;

  if (widgetOnly && invitation && selectedLayout) {
    return (
      <Intro
        subTitle={subTitle}
        title={title}
        coverImage={coverImage}
        invitation={invitation}
        selectedLayout={selectedLayout}
      />
    );
  }

  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <div className="no-interaction">
        {invitation ? (
          <Intro
            subTitle={subTitle}
            title={title}
            coverImage={coverImage}
            invitation={invitation}
            selectedLayout={selectedLayout}
          />
        ) : null}
      </div>
    </WidgetWrapper>
  );
}

const IntroWidget = memo(IntroWidgetComp);
export default IntroWidget;
