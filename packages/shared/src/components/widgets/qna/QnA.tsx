import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi2';
import { QnaWidgetConfig } from '../../../types/pageBrothers.type';
import { cn } from '../../../utils';

interface QnAProps {
  config: QnaWidgetConfig;
  isMultiModal?: boolean;
}

function QnA({ config, isMultiModal = false }: QnAProps) {
  return (
    <div className={cn('space-y-6 p-8', isMultiModal ? '' : 'no-interaction')}>
      <p
        className={cn('text-em-lg font-bold text-theme-inter/70', {
          'text-left': config.align === 'LEFT',
          'text-center': config.align === 'CENTER' || !config.align,
          'text-right': config.align === 'RIGHT',
        })}
      >
        {config.title}
      </p>

      <ul>
        {config.items.map((item) => (
          <Disclosure as="li" key={item.question} defaultOpen={false}>
            <DisclosureButton className="flex w-full items-center justify-between gap-2 py-3">
              <span className="flex-1 whitespace-normal text-left leading-relaxed">
                {item.question}
              </span>
              <HiChevronDown className="flex-none text-em-2xl text-theme-black/30" />
            </DisclosureButton>
            <DisclosurePanel as="div" className="py-3 pt-0 text-theme-inter/70">
              <p>{item.answer === '' ? '아직 답변을 입력하지 않으셨어요' : item.answer}</p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </ul>
    </div>
  );
}

export default QnA;
