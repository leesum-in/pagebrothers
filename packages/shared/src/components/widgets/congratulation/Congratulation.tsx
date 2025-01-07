'use client';

import type { CongratulationWidgetConfig, OwnerAccountItem } from '../../../types';
import { cn } from '../../../utils';
import CongratulationList from './CongratulationList';

interface CongratulationProps {
  config: CongratulationWidgetConfig;
  isMultiModal?: boolean;
  handleClickCopy: (account: OwnerAccountItem) => void;
}

function Congratulation({ config, isMultiModal = false, handleClickCopy }: CongratulationProps) {
  const groomAccount = Object.values(config.accounts)[0];
  const brideAccount = Object.values(config.accounts)[1];
  return (
    <div
      className={cn('space-y-6 overflow-x-hidden px-8 py-12', {
        'no-interaction': !isMultiModal,
      })}
    >
      <p
        className={cn('text-em-lg font-bold text-theme-inter/70', {
          'text-center': config.align === 'CENTER',
          'text-left': config.align === 'LEFT',
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
        <CongratulationList
          config={config}
          account={groomAccount}
          handleClickCopy={handleClickCopy}
        />
        <CongratulationList
          config={config}
          account={brideAccount}
          handleClickCopy={handleClickCopy}
        />
      </ul>
    </div>
  );
}
export default Congratulation;
