import { LuCopy } from 'react-icons/lu';
import type {
  CongratulationWidgetConfig,
  OwnerAccountGroup,
  OwnerAccountItem,
} from '../../../types/pageBrothers.type';
import { cn } from '../../../utils';

interface CongratulationMainProps {
  config: CongratulationWidgetConfig;
  account: OwnerAccountGroup;
  type: 'groom' | 'bride';
  handleClickCopy: (account: OwnerAccountItem) => void;
  handleClickOpenThirdModal: (type: 'groom' | 'bride') => void;
}

function CongratulationMain({
  config,
  account,
  type,
  handleClickCopy,
  handleClickOpenThirdModal,
}: CongratulationMainProps) {
  return (
    <li
      className={cn({
        'flex-1': config.align !== 'CENTER',
        'overflow-hidden': config.layout === 'COLLABSIBLE',
        'space-y-2': config.layout === 'SPREADED',
      })}
    >
      {config.layout === 'COLLABSIBLE' ? (
        <>
          <div className="group w-full space-y-2">
            <div
              className={cn('space-x-1', {
                'text-center': config.align === 'CENTER',
                'text-left': config.align === 'LEFT',
                'text-right': config.align === 'RIGHT',
              })}
            >
              {type === 'groom' ? '신랑' : '신부'}{' '}
              <strong className="font-bold">{account.label} 측</strong>
            </div>
            <CongratulationButton
              buttonLabel={config.buttonLabel}
              handleClickOpenThirdModal={() => handleClickOpenThirdModal(type)}
            />
          </div>
        </>
      ) : (
        <>
          <p className="space-x-1 text-em-lg">
            {type === 'groom' ? '신랑' : '신부'}{' '}
            <strong className="font-bold">{account.label} 측</strong>
          </p>
          <ul className="space-y-2 overflow-hidden leading-relaxed">
            {account.items.map((item) => (
              <li
                key={item.role}
                className="relative flex cursor-pointer items-center justify-between rounded-xl border border-theme-colored/20 bg-theme-colored/5 p-3 shadow-sm"
              >
                <div className="flex-1 text-sm">
                  <p>
                    <span className="mr-1">{item.role}</span>
                    <strong>{item.name}</strong>
                  </p>
                  <p className="flex items-center gap-1 text-theme-black/40">
                    {item.bank} {item.number}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleClickCopy(item)}
                  className="flex-none whitespace-nowrap !text-theme-inter/70 hover:text-inherit h-8 rounded-sm text-xs !px-0 text-slate-500 hover:text-slate-600 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
                >
                  <LuCopy className="text-em-lg" />
                  복사하기
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </li>
  );
}

export default CongratulationMain;

function CongratulationButton({
  buttonLabel,
  handleClickOpenThirdModal,
}: {
  buttonLabel: string;
  handleClickOpenThirdModal: () => void;
}) {
  return (
    <button
      type="button"
      className="inline-flex max-w-full flex-none whitespace-nowrap !border-theme-colored/20 !bg-theme-colored/5 !text-theme-inter/70 group-hover:!bg-theme-colored/10 w-full h-10 rounded-md px-4 text-sm border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
      onClick={handleClickOpenThirdModal}
    >
      <span className="truncate">{buttonLabel}</span>
    </button>
  );
}
