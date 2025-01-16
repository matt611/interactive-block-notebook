import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type Props = {
  title: string;
  isModalOpen: boolean;
  toggleOpen: (isOpen: boolean) => void;
  onSubmit: (newTitle: string) => void;
};

export default function EditTitleModal({
  isModalOpen,
  toggleOpen,
  onSubmit,
  title,
}: Props) {
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    setNewTitle(title);
  }, [title]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newTitle);
    toggleOpen(false);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={toggleOpen}>
      <DialogContent>
        <DialogDescription />
        <DialogHeader>
          <DialogTitle>Edit Notebook Title</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              id="title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
