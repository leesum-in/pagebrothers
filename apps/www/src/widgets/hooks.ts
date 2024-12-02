'use client';

import type { WidgetItem } from '@repo/shared';
import { useMemo } from 'react';

import useModalStore from '@/www/widgets/zustand';

import { getWidgetIndex } from './utils';

export function useWidgetIndex(widgetItem: WidgetItem | Omit<WidgetItem, 'id'>) {
  const { invitation } = useModalStore();
  return useMemo(() => getWidgetIndex(invitation, widgetItem), [invitation, widgetItem]);
}
