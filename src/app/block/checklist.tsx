"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { tBlockComponentProps, tCheckList } from "@/types";
import Block from "./block";
import { useNotebookContext } from "@/hooks/contexts";

export default function CheckList({
  blockId,
  content,
  isEditable,
}: tBlockComponentProps<tCheckList>) {
  const notebookContext = useNotebookContext();
  const setModalState = notebookContext.modalStateStore[1];

  function openEditModal() {
    setModalState({
      contentJSON: JSON.stringify(content),
      isModalOpen: true,
      blockId,
    });
  }

  return (
    <Block
      title={content.title}
      isEditable={isEditable}
      blockId={blockId}
      handleEditClick={openEditModal}
    >
      <div className="pl-8">
        {content.items.map((item, i) => {
          const id = `${content.title}-item-${i}`;
          return (
            <div key={i} className="flex items-center space-x-2 py-2">
              <Checkbox id={id} />
              <label
                htmlFor={id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.content}
              </label>
            </div>
          );
        })}
      </div>
    </Block>
  );
}
