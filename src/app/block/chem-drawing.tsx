import Image from "next/image";
import Block from "./block";
import { tBlockComponentProps } from "../../types";
import { useNotebookContext } from "@/hooks/contexts";

export type tChemicalDrawing = {
  id: string;
  title: string;
  url: string;
};

export default function ChemDrawing({
  blockId,
  content,
  isEditable,
}: tBlockComponentProps<tChemicalDrawing>) {
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
      blockId={blockId}
      title={content.title}
      isEditable={isEditable}
      handleEditClick={openEditModal}
    >
      <Image
        src={content.url}
        alt="chemical drawing"
        width={500}
        height={500}
      />
    </Block>
  );
}
