import { memo } from 'react';

import type { IInvitation, IntroLayoutKey, WidgetItem } from '@/types/pageBrothers.type';

import { WidgetWrapper } from '../components';
import Intro from './Intro';

interface IntroWidgetProps {
  invitation?: IInvitation;
  widgetItem: WidgetItem;
  isMultiModal?: boolean;
  widgetOnly?: boolean;
  selectedLayout?: IntroLayoutKey;
}

function IntroWidgetComp({
  invitation,
  widgetItem,
  isMultiModal = false,
  selectedLayout,
}: IntroWidgetProps): React.ReactNode {
  return (
    <WidgetWrapper widgetItem={widgetItem} isMultiModal={isMultiModal}>
      <div className="no-interaction">
        {invitation ? (
          <Intro widgetItem={widgetItem} invitation={invitation} selectedLayout={selectedLayout} />
        ) : null}
      </div>
    </WidgetWrapper>
  );
}

const IntroWidget = memo(IntroWidgetComp);
export default IntroWidget;
