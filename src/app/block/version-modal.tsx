import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useNotebookContext } from "@/hooks/contexts";

import useDBHelper from "@/hooks/db-helper";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function VersionModal() {
  const [versionName, setVersionName] = useState("");
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
  function tagVersion() {
    dbHelper.nameVersion(versionName, currentNotebook!.id, blockId);
    toggleOpen(false);
  }

  return (
    <Dialog open={versionModalState?.isModalOpen} onOpenChange={toggleOpen}>
      <DialogContent>
        <DialogDescription />
        <DialogHeader>
          <DialogTitle>Version History</DialogTitle>
        </DialogHeader>
        <Label htmlFor="version">Name the current version:</Label>
        <div className="flex gap-2">
          <Input
            id="version"
            value={versionName}
            onChange={(e) => setVersionName(e.target.value)}
            required
          ></Input>
          <Button onClick={tagVersion}>Tag</Button>
        </div>

        <Label>Revert to previous version:</Label>
        {!versions.length && <div>No versions!</div>}
        {versions.map((versionRecord, i) => {
          return (
            <div key={i}>
              <Button
                variant="ghost"
                onClick={buildOnclick(versionRecord.contentJSON)}
              >
                {versionRecord.title}
              </Button>
            </div>
          );
        })}
      </DialogContent>
    </Dialog>
  );
}
