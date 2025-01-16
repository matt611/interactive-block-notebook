export enum ListType {
  BULLET,
  ORDERED,
}

export enum BlockType {
  NOTEBOOK_TITLE,
  PARAGRAPH,
  LIST,
  CHECKLIST,
  CHEMICAL_DRAWING,
}

export type tModalState = {
  contentJSON: string;
  isModalOpen: boolean;
  blockId: string;
};

export type tVersionModalState = {
  isModalOpen: boolean;
  blockId?: string;
  notebookId?: string;
};

export type tBlock<T> = {
  id: string;
  index: number;
  type: BlockType;
  content: T;
};

export type tBlockComponentProps<T> = {
  blockId: string;
  content: T;
  isEditable: boolean;
};

export type tList = {
  title?: string;
  type: ListType;
  items: string[];
};

export type tParagraph = {
  title?: string;
  text: string;
};

export type tCheckList = {
  title?: string;
  items: tCheckListItem[];
};

export type tCheckListItem = {
  isChecked: boolean;
  content: string;
};

export type tChemicalDrawing = {
  title: string;
  url: string;
};

export type tNotebookTitle = {
  content: string;
};

export type tNotebook = {
  id: string;
  title: string;
  blocks: tBlock<unknown>[];
};
