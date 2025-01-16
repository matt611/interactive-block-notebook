import { Button } from "@/components/ui/button";
import { Pencil, Trash2, History } from "lucide-react";

type BlockMenuProps = {
  handleDelete: () => void;
  handleEdit: () => void;
  handleRevert: () => void;
};

export default function BlockMenu({
  handleDelete,
  handleRevert,
  handleEdit,
}: BlockMenuProps) {
  return (
    <div className="flex flex-col rounded border mt-4">
      <Button variant="ghost" onClick={handleRevert}>
        <History />
      </Button>
      <Button variant="ghost" onClick={handleEdit}>
        <Pencil />
      </Button>
      <Button variant="ghost" onClick={handleDelete}>
        <Trash2 />
      </Button>
    </div>
  );
}
