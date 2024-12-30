'use client';

import type { DragEndEvent } from '@dnd-kit/core';
import { closestCenter, useDroppable } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndProvider } from '@repo/shared';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

// 확장성을 위해 제네릭으로 변경할 것
// Gallery에서만 사용하는 것이 아니라 shared 에서 정의하는 것도 고려해볼 것
type DroppableProps<T> = PropsWithChildren & {
  items: T[];
  setItems: Dispatch<SetStateAction<T[]>>;
};

function RsvpDroppableUl<T extends { id: string }>({
  children,
  items,
  setItems,
}: DroppableProps<T>) {
  const { setNodeRef } = useDroppable({
    id: 'droppable-rsvp',
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => 'id' in item && item.id === active.id);
      const newIndex = items.findIndex((item) => 'id' in item && item.id === over.id);

      setItems((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  return (
    <DndProvider onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul className="space-y-6" ref={setNodeRef}>
          {children}
        </ul>
      </SortableContext>
    </DndProvider>
  );
}

export default RsvpDroppableUl;
