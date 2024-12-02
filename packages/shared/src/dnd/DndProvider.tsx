'use client';

import { CollisionDetection, DndContext, DragEndEvent } from '@dnd-kit/core';
import React, { PropsWithChildren } from 'react';

interface DndProviderProps extends PropsWithChildren {
  onDragEnd: (event: DragEndEvent) => void;
  collisionDetection?: CollisionDetection;
}

function DndProvider({
  children,
  onDragEnd,
  collisionDetection,
}: DndProviderProps): React.ReactElement {
  return (
    <DndContext onDragEnd={onDragEnd} collisionDetection={collisionDetection}>
      {children}
    </DndContext>
  );
}

export default DndProvider;
