import { LuCopy } from 'react-icons/lu';
import type {
  CongratulationWidgetConfig,
  OwnerAccountGroup,
  OwnerAccountItem,
} from '../../../types/pageBrothers.type';
import { cn } from '../../../utils';

interface CongratulationListProps {
  config: CongratulationWidgetConfig;
  account: OwnerAccountGroup;
  handleClickCopy: (account: OwnerAccountItem) => void;
}

function CongratulationList({ config, account, handleClickCopy }: CongratulationListProps) {
  return (
    <li
      className={cn({
        'overflow-hidden': config.layout === 'COLLABSIBLE',
        'space-y-2': config.layout === 'SPREADED',
      })}
      data-headlessui-state=""
    >
      {config.layout === 'COLLABSIBLE' ? (
        <>
          <div
            className="group w-full space-y-2"
            id="headlessui-disclosure-button-:rf:"
            aria-expanded="false"
            data-headlessui-state=""
            aria-controls="headlessui-disclosure-panel-:rg:"
          >
            <div className="space-x-1 text-center">
              신랑 <strong className="font-bold">{account.label} 측</strong>
            </div>

            <CongratulationButton buttonLabel={config.buttonLabel} />
          </div>
          <div
            id="headlessui-disclosure-panel-:rg:"
            hidden
            data-headlessui-state=""
            style={{ display: 'none' }}
          ></div>
        </>
      ) : (
        <>
          <p className="space-x-1 text-em-lg">
            신랑 <strong className="font-bold">{account.label} 측</strong>
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

export default CongratulationList;

function CongratulationButton({ buttonLabel }: { buttonLabel: string }) {
  return (
    <button
      type="button"
      className="inline-flex max-w-full flex-none  whitespace-nowrap !border-theme-colored/20 !bg-theme-colored/5 !text-theme-inter/70 group-hover:!bg-theme-colored/10 false h-12 rounded-md px-4 text-sm border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
    >
      <span className="truncate">{buttonLabel}</span>
    </button>
  );
}
