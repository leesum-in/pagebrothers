import type { IInvitation, IntroWidgetConfig, WidgetItem } from '@/types/pageBrothers.type';
import { WidgetWrapper } from '@/widget/common';

import Intro from './Intro';

interface IntroWidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
  widgetOnly?: boolean;
}

function IntroWidget({
  invitation,
  widgetItem,
  isMultiModal = false,
  widgetOnly = false,
}: IntroWidgetProps): React.ReactNode {
  const { subTitle, title, coverImage } = widgetItem.config as IntroWidgetConfig;

  if (widgetOnly && invitation) {
    return (
      <Intro subTitle={subTitle} title={title} coverImage={coverImage} invitation={invitation} />
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
          />
        ) : null}
      </div>
    </WidgetWrapper>
  );
}

export default IntroWidget;
