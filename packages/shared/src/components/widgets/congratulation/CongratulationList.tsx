import { LuCopy } from 'react-icons/lu';
import { OwnerAccountItem } from '../../../types';

interface CongratulationListProps {
  items: OwnerAccountItem[];
  handleClickCopy: (account: OwnerAccountItem) => void;
}
function CongratulationList({ items, handleClickCopy }: CongratulationListProps) {
  return (
    <ul className="divide-y divide-theme-black/10 leading-relaxed font-serif">
      {items.map((item) => (
        <List key={item.role} item={item} handleClickCopy={handleClickCopy} />
      ))}
    </ul>
  );
}

export default CongratulationList;

interface ListProps {
  item: OwnerAccountItem;
  handleClickCopy: (account: OwnerAccountItem) => void;
}

function List({ item, handleClickCopy }: ListProps) {
  return (
    <li className="relative p-4">
      <div className="text-sm">
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
        className="absolute inset-4 left-auto m-auto flex-none whitespace-nowrap !border-theme-colored/20 !bg-theme-colored/5 !text-theme-inter/70 hover:!bg-theme-colored/10 h-8 rounded-sm text-xs border border-slate-200 bg-slate-100 text-slate-900 hover:bg-slate-200 center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40 px-2"
        onClick={() => handleClickCopy(item)}
      >
        <LuCopy className="text-em-lg" />
        복사하기
      </button>
    </li>
  );
}
