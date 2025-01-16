import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNotebookContext } from "@/hooks/contexts";
import { format } from "date-fns";

import useDBHelper from "@/hooks/db-helper";

export default function RevertModal() {
  const dbHelper = useDBHelper();
  const notebookContext = useNotebookContext();
  const [currentNotebook, setCurrentNotebook] =
    notebookContext.currentNotebookStore;
  const [versionModalState, setVersionModalState] =
    notebookContext.versionModalStateStore;
  const [notebookVersions] = notebookContext.notebookVersionStore;
  const [blockVersions] = notebookContext.blockVersionStore;

  const notebookId = versionModalState?.notebookId;
  const blockId = versionModalState?.blockId;
  if (!blockId && !notebookId) return;
  const thisNotebookVersions =
    (notebookId && notebookVersions[notebookId]) || [];
  const thisBlockVersions = (blockId && blockVersions[blockId]) || [];
  const versions = notebookId ? thisNotebookVersions : thisBlockVersions;

  function toggleOpen(isOpen: boolean) {
    if (!versionModalState) return;
    setVersionModalState({ ...versionModalState, isModalOpen: isOpen });
  }

  function buildOnclick(contentJSON: string) {
    return () => {
      try {
        const newContent = JSON.parse(contentJSON);

        if (blockId) {
          const newNotebook = dbHelper.updateBlock(
            currentNotebook!.id,
            blockId!,
            newContent
          );
          setCurrentNotebook(newNotebook);
        } else {
          setCurrentNotebook(newContent);
          dbHelper.replaceNotebook(newContent);
        }
      } catch (e) {
        alert(`json parse err: ${e}`);
      }
      toggleOpen(false);
    };
  }
  return (
    <Dialog open={versionModalState?.isModalOpen} onOpenChange={toggleOpen}>
      <DialogContent>
        <DialogDescription />
        <DialogHeader>
          <DialogTitle>Version History</DialogTitle>
        </DialogHeader>
        {!versions.length && <div>No versions!</div>}
        {versions.map((versionRecord, i) => {
          return (
            <Button
              variant="ghost"
              onClick={buildOnclick(versionRecord.contentJSON)}
              key={i}
            >
              {format(versionRecord.date, "MM-dd-yyyy h:m:s")}
            </Button>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
