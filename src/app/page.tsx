"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { NotebookSideBar } from "@/app/notebook/components/notebook-side-bar";
import { useNotebookContext } from "@/hooks/contexts";
import Notebook from "./notebook/components/notebook";

export default function NotebookPage() {
  const notebookContext = useNotebookContext();
  const [isEditMode, setIsEditMode] = notebookContext.editModeStore;

  return (
    <SidebarProvider
      defaultOpen={false}
      open={isEditMode}
      onOpenChange={setIsEditMode}
    >
      <NotebookSideBar />
      <SidebarTrigger className="p-4" />
      <Notebook></Notebook>
    </SidebarProvider>
  );
}
