import { useNotebookContext } from "@/hooks/contexts";
import { tBlockComponentProps, tParagraph } from "../../types";
import Block from "./block";

export default function Paragraph({
  blockId,
  content,
  isEditable,
}: tBlockComponentProps<tParagraph>) {
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
      {content.text}
    </Block>
  );
}
