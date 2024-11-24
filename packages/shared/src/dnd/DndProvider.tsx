'use client';

import { DndContext } from '@dnd-kit/core';
import React, { PropsWithChildren } from 'react';

function DndProvider({ children }: PropsWithChildren): React.ReactElement {
  return <DndContext>{children}</DndContext>;
}

export default DndProvider;
