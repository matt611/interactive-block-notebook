"use client";

import { FilePlus, Search } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BlockType, tNotebook } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotebookContext } from "@/hooks/contexts";
import useDBHelper from "@/hooks/db-helper";
import { BLOCK_MENU_ITEMS } from "@/constants";

export function NotebookSideBar() {
  const dbHelper = useDBHelper();
  const notebookContext = useNotebookContext();
  const [currentNotebook, setCurrentNotebook] =
    notebookContext.currentNotebookStore;

  const notebooks = dbHelper.fetchAllNotebooks();

  function buildNewBlockClickHandler(type: BlockType) {
    return function () {
      if (!currentNotebook) return;

      // send change message to db
      const newBlock = dbHelper.createNewBlock(type, currentNotebook.id);
      currentNotebook.blocks.push(newBlock);
      setCurrentNotebook({ ...currentNotebook });
    };
  }

  function buildHandleSearchClick(notebookId: string) {
    const requestedNotebook = dbHelper.fetchNotebookById(notebookId);

    if (!requestedNotebook) return;

    return () => {
      setCurrentNotebook(requestedNotebook);
    };
  }

  function handleNewNotebookClick() {
    const newNotebook: tNotebook =
      dbHelper.createNewNotebook("Untitled Notebook");
    setCurrentNotebook(newNotebook);
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="New Notebook" asChild>
                  <a onClick={handleNewNotebookClick}>
                    <FilePlus />
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <SidebarMenuButton tooltip="Search" asChild>
                      <Search />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Notebooks</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {notebooks.map((n, i) => (
                      <DropdownMenuItem key={i}>
                        <a onClick={buildHandleSearchClick(n.id)}>{n.title}</a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
              <SidebarGroupLabel>Blocks</SidebarGroupLabel>
              {BLOCK_MENU_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <a onClick={buildNewBlockClickHandler(item.type)}>
                      <item.icon />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
