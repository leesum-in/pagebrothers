'use client';

import type { CongratulationWidgetConfig, OwnerAccountItem } from '../../../types';
import { cn } from '../../../utils';
import CongratulationMain from './CongratulationMain';

interface CongratulationProps {
  config: CongratulationWidgetConfig;
  isMultiModal?: boolean;
  handleClickCopy: (account: OwnerAccountItem) => void;
  handleClickOpenThirdModal: (type: 'groom' | 'bride') => void;
}

function Congratulation({
  config,
  isMultiModal = false,
  handleClickCopy,
  handleClickOpenThirdModal,
}: CongratulationProps) {
  const groomAccount = Object.values(config.accounts)[0];
  const brideAccount = Object.values(config.accounts)[1];
  return (
    <div
      className={cn('space-y-6 px-8 py-12 font-serif', {
        'no-interaction': !isMultiModal,
      })}
    >
      <p
        className={cn('font-bold text-theme-inter/70', {
          'text-em-lg text-center': config.align === 'CENTER' || !config.align,
          'text-em-lg text-left': config.align === 'LEFT',
          'text-em-lg text-right': config.align === 'RIGHT',
        })}
      >
        {config.title}
      </p>
      <ul
        className={cn('empty:hidden', {
          'center-flex gap-6': config.layout === 'COLLABSIBLE',
          'space-y-6': config.layout === 'SPREADED',
        })}
      >
        <CongratulationMain
          config={config}
          type="groom"
          account={groomAccount}
          handleClickCopy={handleClickCopy}
          handleClickOpenThirdModal={handleClickOpenThirdModal}
        />
        <CongratulationMain
          config={config}
          type="bride"
          account={brideAccount}
          handleClickCopy={handleClickCopy}
          handleClickOpenThirdModal={handleClickOpenThirdModal}
        />
      </ul>
    </div>
  );
}
export default Congratulation;
