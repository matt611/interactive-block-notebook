"use client";

import { useNotebookContext } from "@/hooks/contexts";
import { tBlockComponentProps, tNotebookTitle } from "../../../types";
import Block from "../block";
import useDBHelper from "@/hooks/db-helper";
import { useState } from "react";
import EditTitleModal from "./edit-title-modal";

export default function NotebookTitle({
  content,
  isEditable,
}: tBlockComponentProps<tNotebookTitle>) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dbHelper = useDBHelper();
  const notebookContext = useNotebookContext();
  const [currentNotebook, setCurrentNotebook] =
    notebookContext.currentNotebookStore;
  const setVersionModalState = notebookContext.versionModalStateStore[1];

  function deleteNotebook() {
    if (!currentNotebook) return;
    dbHelper.deleteNotebook(currentNotebook.id);
    setCurrentNotebook(null);
  }

  function openEditModal() {
    setIsModalOpen(true);
  }

  function handleTitleChange(newTitle: string) {
    if (!currentNotebook) return;

    // send change message to servers
    dbHelper.changeNotebookTitle(currentNotebook.id, newTitle);
    currentNotebook.title = newTitle;
  }

  function openVersionModal() {
    if (!currentNotebook) return;

    setVersionModalState({
      isModalOpen: true,
      notebookId: currentNotebook.id,
    });
  }

  function toggleModal(status: boolean) {
    setIsModalOpen(status);
  }

  return (
    <Block
      isEditable={isEditable}
      isFixed={true}
      handleDeleteClick={deleteNotebook}
      handleEditClick={openEditModal}
      handleRevertClick={openVersionModal}
    >
      <div className="text-3xl font-bold">{content.content}</div>
      <EditTitleModal
        title={content.content}
        isModalOpen={isModalOpen}
        toggleOpen={toggleModal}
        onSubmit={handleTitleChange}
      ></EditTitleModal>
    </Block>
  );
}
