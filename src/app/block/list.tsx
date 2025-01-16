import Block from "./block";
import { ListType, tBlockComponentProps, tList } from "../../types";
import { useNotebookContext } from "@/hooks/contexts";

export default function List({
  blockId,
  content,
  isEditable,
}: tBlockComponentProps<tList>) {
  const notebookContext = useNotebookContext();
  const setModalState = notebookContext.modalStateStore[1];

  function openEditModal() {
    setModalState({
      contentJSON: JSON.stringify(content),
      isModalOpen: true,
      blockId,
    });
  }

  const listItems = content.items.map((item, i) => <li key={i}>{item}</li>);
  const contents =
    content.type === ListType.BULLET ? (
      <ul className="list-disc">{listItems}</ul>
    ) : (
      <ol className="list-decimal">{listItems}</ol>
    );

  return (
    <Block
      title={content.title}
      isEditable={isEditable}
      blockId={blockId}
      handleEditClick={openEditModal}
    >
      <div className="pl-8">{contents}</div>
    </Block>
  );
}
