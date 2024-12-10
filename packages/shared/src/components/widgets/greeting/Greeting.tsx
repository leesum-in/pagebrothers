'use client';

import Flower from '../../../assets/icons/Flower';
import type { GreetingWidgetConfig, IInvitationOwner } from '../../../types/pageBrothers.type';
import { cn } from '../../../utils';

interface GreetingProps {
  config: GreetingWidgetConfig;
  isMultiModal: boolean;
  invitationOwners: IInvitationOwner[];
}

function Greeting({ config, isMultiModal, invitationOwners }: GreetingProps) {
  const groom = invitationOwners.find((owner) => owner.role === 'GROOM');
  const bride = invitationOwners.find((owner) => owner.role === 'BRIDE');

  const renderNameFormat = (owner: IInvitationOwner) => {
    const host = config.hosts[owner.id];
    let dead: {
      father: string | React.ReactNode;
      mother: string | React.ReactNode;
    } = {
      father: '',
      mother: '',
    };
    if (host.isFatherDeceased) {
      dead.father = '故';
      if (config.useFlower) {
        dead.father = <Flower className="h-7 w-7 flex-none" />;
      }
    }
    if (host.isMotherDeceased) {
      dead.mother = '故';
      if (config.useFlower) {
        dead.mother = <Flower className="h-7 w-7 flex-none" />;
      }
    }

    switch (config.nameFormatKey) {
      case 'LEVEL_AND_FULL_NAME_WITH_PARENT':
        return (
          <>
            {dead.father} {host.fatherName} · {dead.mother}
            {host.motherName}의 {host.level}
          </>
        );
      case 'FULL_NAME_WITH_PREFIX_PARENT':
        return (
          <>
            부 {dead.father} {host.fatherName} · 모 {dead.mother}
            {host.motherName}의 {host.level}
          </>
        );
      case 'ROLE_AND_FULL_NAME_WITH_PREFIX_PARENT':
        return (
          <>
            부 {dead.father} {host.fatherName} · 모 {dead.mother}
            {host.motherName}의 {host.level}
          </>
        );
      case 'ROLE_AND_FULL_NAME':
        return host.name;
    }
  };

  if (!groom || !bride) return null;
  return (
    <div
      className={cn('space-y-6 px-8 py-12', isMultiModal ? '' : 'no-interaction', {
        'text-left': config.align === 'LEFT',
        'text-center': config.align === 'CENTER',
        'text-right': config.align === 'RIGHT',
      })}
    >
      <p className="text-em-lg font-bold text-theme-inter/70">{config.title}</p>
      <div className="space-y-3 whitespace-pre-line empty:hidden inline-block max-w-[20rem] leading-loose">
        <p className="[&amp;>a]:text-theme-colored [&amp;>a]:underline">{config.greetingText}</p>
      </div>

      <div className="text-[0px] leading-0">
        <hr className="inline-block w-8 border-t border-theme-colored/40" />
      </div>

      <section
        className={cn('flex w-full whitespace-nowrap', {
          'flex-row gap-6': config.nameLayoutKey === 'VERTICAL',
          'flex-col': config.nameLayoutKey === 'HORIZONTAL',
          'justify-start': config.align === 'LEFT' && config.nameLayoutKey === 'VERTICAL',
          'justify-center': config.align === 'CENTER' && config.nameLayoutKey === 'VERTICAL',
          'justify-end': config.align === 'RIGHT' && config.nameLayoutKey === 'VERTICAL',
        })}
      >
        <p
          className={cn('flex', {
            'flex-col': config.nameLayoutKey === 'VERTICAL',
            'flex-row-reverse gap-2': config.nameLayoutKey === 'HORIZONTAL',
            'justify-center': config.align === 'CENTER' && config.nameLayoutKey === 'HORIZONTAL',
            'justify-end': config.align === 'RIGHT' && config.nameLayoutKey === 'HORIZONTAL',
            'justify-start': config.align === 'LEFT' && config.nameLayoutKey === 'HORIZONTAL',
          })}
        >
          <strong>
            {config.nameFormatKey === 'ROLE_AND_FULL_NAME' ||
            config.nameFormatKey === 'ROLE_AND_FULL_NAME_WITH_PREFIX_PARENT'
              ? '신랑'
              : ''}{' '}
            {groom?.name}
          </strong>{' '}
          {config.nameFormatKey !== 'ROLE_AND_FULL_NAME' && (
            <span className="inline-flex items-center gap-0.5">{renderNameFormat(groom)}</span>
          )}
        </p>
        <p
          className={cn('flex', {
            'flex-col': config.nameLayoutKey === 'VERTICAL',
            'flex-row-reverse gap-2': config.nameLayoutKey === 'HORIZONTAL',
            'justify-center': config.align === 'CENTER' && config.nameLayoutKey === 'HORIZONTAL',
            'justify-end': config.align === 'RIGHT' && config.nameLayoutKey === 'HORIZONTAL',
            'justify-start': config.align === 'LEFT' && config.nameLayoutKey === 'HORIZONTAL',
          })}
        >
          <strong>
            {config.nameFormatKey === 'ROLE_AND_FULL_NAME' ||
            config.nameFormatKey === 'ROLE_AND_FULL_NAME_WITH_PREFIX_PARENT'
              ? '신부'
              : ''}{' '}
            {bride?.name}
          </strong>
          {config.nameFormatKey !== 'ROLE_AND_FULL_NAME' && (
            <span className="inline-flex items-center gap-0.5">{renderNameFormat(bride)}</span>
          )}
        </p>
      </section>
    </div>
  );
}

export default Greeting;
