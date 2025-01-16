"use client";

import { mockNotebooks } from "@/app/db/mocks";
import { tModalState, tNotebook, tVersionModalState } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type ChangeVector = {
  blocks: Record<string, number>;
  notebooks: Record<string, number>;
};

const EMPTY_CHANGE_VECTOR: ChangeVector = {
  blocks: {},
  notebooks: {},
};

export type VersionRecord = {
  date: Date;
  contentJSON: string;
};

function useChangeVectorData() {
  return useState<ChangeVector>(EMPTY_CHANGE_VECTOR);
}

function useNotebookVersionData() {
  return useState<Record<string, VersionRecord[]>>({});
}

function useBlockVersionData() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useState<Record<string, VersionRecord[]>>({});
}

function useNotebookData() {
  return useState<tNotebook[]>(mockNotebooks);
}

function useCurrentNotebookData() {
  return useState<tNotebook | null>(mockNotebooks[0]);
}

function useEditModeData() {
  return useState<boolean>(false);
}

function useModalState() {
  return useState<tModalState | null>(null);
}

function useVersionModalState() {
  return useState<tVersionModalState | null>(null);
}

type useChangeVectorDataReturnType = ReturnType<typeof useChangeVectorData>;
type useNotebookVersionDataReturnType = ReturnType<
  typeof useNotebookVersionData
>;
type useBlockVersionDataReturnType = ReturnType<typeof useBlockVersionData>;
type useNotebookDataReturnType = ReturnType<typeof useNotebookData>;
type useCurrentNotebookDataReturnType = ReturnType<
  typeof useCurrentNotebookData
>;
type useEditModeDataReturnType = ReturnType<typeof useEditModeData>;
type useModalStateReturnType = ReturnType<typeof useModalState>;
type useVersionModalStateReturnType = ReturnType<typeof useVersionModalState>;

type AppContext = {
  changeVectorStore: useChangeVectorDataReturnType;
  blockVersionStore: useBlockVersionDataReturnType;
  notebookVersionStore: useNotebookVersionDataReturnType;
  modalStateStore: useModalStateReturnType;
  versionModalStateStore: useVersionModalStateReturnType;
  editModeStore: useEditModeDataReturnType;
  notebooksStore: useNotebookDataReturnType;
  currentNotebookStore: useCurrentNotebookDataReturnType;
};

export const NotebookContext = createContext<AppContext | undefined>(undefined);

export function useNotebookContext() {
  const appContext = useContext(NotebookContext);

  if (!appContext)
    throw new Error(
      "useNotebookContext must be used inside a NotebookContextProvider"
    );

  return appContext;
}

export default function NotebookContextProvider({
  children,
}: {
  children?: ReactNode;
}) {
  const defaultContext: AppContext = {
    versionModalStateStore: useVersionModalState(),
    changeVectorStore: useChangeVectorData(),
    blockVersionStore: useBlockVersionData(),
    notebookVersionStore: useNotebookVersionData(),
    modalStateStore: useModalState(),
    editModeStore: useEditModeData(),
    notebooksStore: useNotebookData(),
    currentNotebookStore: useCurrentNotebookData(),
  };

  return (
    <NotebookContext.Provider value={defaultContext}>
      {children}
    </NotebookContext.Provider>
  );
}
