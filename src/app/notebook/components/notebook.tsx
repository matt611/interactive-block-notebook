"use client";

import { useNotebookContext } from "@/hooks/contexts";
import NotebookTitle from "../../block/notebook-title/notebook-title";
import { BLOCK_FUNCTION_MAP } from "@/constants";
import EditBlockModal from "@/app/block/edit-block-modal";
import RevertModal from "@/app/block/revert-modal";

export default function Notebook() {
  const notebookContext = useNotebookContext();
  const [currentNotebook] = notebookContext.currentNotebookStore;
  const [isEditMode] = notebookContext.editModeStore;

  const mainClassName =
    "min-h-screen px-2 pt-4 pb-20 sm:p-20font-[family-name:var(--font-geist-sans)] w-full";

  if (!currentNotebook) return <div className={mainClassName}>No Notebook</div>;

  const titleBlockContent = {
    id: `${currentNotebook.id}_title`,
    content: currentNotebook.title,
  };

  return (
    <div className={mainClassName}>
      <EditBlockModal />
      <RevertModal />
      <NotebookTitle
        blockId={currentNotebook.id}
        content={titleBlockContent}
        isEditable={isEditMode}
      />
      {currentNotebook.blocks.map((block, i) => {
        return (
          <div key={i}>
            {BLOCK_FUNCTION_MAP[block.type]({
              blockId: block.id,
              content: block.content,
              isEditable: isEditMode,
            })}
          </div>
        );
      })}
    </div>
  );
}
