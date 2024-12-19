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
    id: 'droppable',
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
          <li>
            <button
              type="button"
              className="w-full h-12 rounded-md px-4 text-sm border border-dashed border-slate-300 !shadow-none center-flex gap-2 font-bold shadow-1 transition-colors disabled:opacity-40"
            >
              <span>구성 추가하기</span>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </li>
        </ul>
      </SortableContext>
    </DndProvider>
  );
}

export default RsvpDroppableUl;
