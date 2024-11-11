import { Intro } from '@repo/shared';
import type {
  IInvitation,
  IntroWidgetConfig,
  WidgetItem,
} from '@repo/shared/src/types/pageBrothers.type';
import { memo } from 'react';

import { WidgetWrapper } from '@/www/widgets/components';

interface IntroWidgetProps {
  widgetItem: WidgetItem;
  invitation?: IInvitation;
  isMultiModal?: boolean;
}

function IntroWidgetComp({
  widgetItem,
  invitation,
  isMultiModal = false,
}: IntroWidgetProps): React.ReactNode {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <div className="no-interaction">
        {invitation ? (
          <Intro config={widgetItem.config as IntroWidgetConfig} invitation={invitation} />
        ) : null}
      </div>
    </WidgetWrapper>
  );
}

const IntroWidget = memo(IntroWidgetComp);
export default IntroWidget;
