import { memo } from 'react';

import type { IInvitation, IntroWidgetConfig, WidgetItem } from '@/types/pageBrothers.type';

import { WidgetWrapper } from '../components';
import Intro from './Intro';

interface IntroWidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
}

function IntroWidgetComp({
  invitation,
  widgetItem,
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
