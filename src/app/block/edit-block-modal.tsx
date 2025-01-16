import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useNotebookContext } from "@/hooks/contexts";
import useDBHelper from "@/hooks/db-helper";
import { useEffect, useState } from "react";

export default function EditBlockModal() {
  const [newContentJSON, setNewContentJSON] = useState("");
  const dbHelper = useDBHelper();
  const notebookContext = useNotebookContext();
  const [modalState, setModalState] = notebookContext.modalStateStore;
  const [currentNotebook, setCurrentNotebook] =
    notebookContext.currentNotebookStore;

  useEffect(() => {
    if (!modalState?.contentJSON) return;
    setNewContentJSON(modalState.contentJSON);
  }, [modalState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentNotebook || !modalState?.blockId) return;
    try {
      const newContent = JSON.parse(newContentJSON);

      // send change message to servers
      const newNotebook = dbHelper.updateBlock(
        currentNotebook.id,
        modalState.blockId,
        newContent
      );
      setCurrentNotebook(newNotebook);
    } catch (e) {
      alert(`json parse err: ${e}`);
    }
    toggleOpen(false);
  };

  function toggleOpen(isOpen: boolean) {
    if (!modalState) return;
    setModalState({ ...modalState, isModalOpen: isOpen });
  }

  return (
    <Dialog open={modalState?.isModalOpen} onOpenChange={toggleOpen}>
      <DialogContent>
        <DialogDescription />
        <DialogHeader>
          <DialogTitle>Edit Block</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              id="content"
              value={newContentJSON}
              onChange={(e) => setNewContentJSON(e.target.value)}
              required
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
