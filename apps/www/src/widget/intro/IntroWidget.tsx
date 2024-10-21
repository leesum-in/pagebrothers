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
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
  widgetOnly?: boolean;
  selectedLayout?: IntroLayoutKey;
}

function IntroWidget({
  invitation,
  widgetItem,
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

export default IntroWidget;
