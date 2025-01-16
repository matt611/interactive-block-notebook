import { ReactNode } from "react";
import BlockMenu from "./block-menu";
import { GripHorizontal } from "lucide-react";
import useDBHelper from "@/hooks/db-helper";
import { useNotebookContext } from "@/hooks/contexts";

type Props = {
  title?: string;
  blockId?: string;
  children?: ReactNode;
  isFixed?: boolean;
  isEditable: boolean;
  handleRevertClick?: () => void;
  handleDeleteClick?: () => void;
  handleEditClick: () => void;
};

export default function Block({
  blockId,
  children,
  title,
  isFixed,
  isEditable,
  handleDeleteClick,
  handleEditClick,
  handleRevertClick,
}: Props) {
  const dbHelper = useDBHelper();
  const notebookContext = useNotebookContext();
  const [currentNotebook, setCurrentNotebook] =
    notebookContext.currentNotebookStore;
  const setVersionModalState = notebookContext.versionModalStateStore[1];

  function deleteBlock() {
    if (!currentNotebook) return;
    if (!blockId) return;

    // send a delete message to the servers
    dbHelper.deleteBlock(currentNotebook.id, blockId);

    const filteredBlocks = currentNotebook.blocks.filter(
      (b) => b.id !== blockId
    );
    setCurrentNotebook({ ...currentNotebook, blocks: filteredBlocks });
  }

  function openVersionModal() {
    setVersionModalState({
      isModalOpen: true,
      blockId: blockId,
    });
  }

  let blockClass = "px-4 pb-4 flex justify-between w-full";
  if (isEditable) blockClass += " group hover:border rounded ";

  return (
    <div className={blockClass}>
      <div className="w-full">
        {!isFixed && (
          <div className="invisible group-hover:visible w-full flex justify-center">
            <div className="border-b border-x cursor-pointer rounded-b bg-primary-foreground text-primary px-4">
              <GripHorizontal />
            </div>
          </div>
        )}
        <div className="text-xl font-bold">{title}</div>
        {children}
      </div>
      {isEditable && (
        <div className="invisible px-2 group-hover:visible">
          <BlockMenu
            handleDelete={handleDeleteClick || deleteBlock}
            handleEdit={handleEditClick}
            handleRevert={handleRevertClick || openVersionModal}
          ></BlockMenu>
        </div>
      )}
    </div>
  );
}
