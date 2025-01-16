import { Pilcrow, ListOrdered, ListChecks, FlaskConical } from "lucide-react";
import CheckList from "./app/block/checklist";
import ChemDrawing from "./app/block/chem-drawing";
import NotebookTitle from "./app/block/notebook-title/notebook-title";
import Paragraph from "./app/block/paragraph";
import {
  tNotebookTitle,
  tParagraph,
  tList,
  ListType,
  BlockType,
  tBlockComponentProps,
  tCheckList,
  tChemicalDrawing,
} from "./types";
import List from "./app/block/list";

export const DEFAULT_NOTEBOOK_TITLE: tNotebookTitle = {
  content: "Untitled Notebook",
};

export const DEFAULT_PARAGRAPH: tParagraph = {
  title: "Untitled Paragraph",
  text: "Add content here",
};

export const DEFAULT_LIST: tList = {
  title: "Untitled List",
  type: ListType.BULLET,
  items: [],
};

export const DEFAULT_CHECKLIST: tCheckList = {
  title: "Untitled Checklist",
  items: [],
};

export const DEFAULT_CHEM_DRAWING: tChemicalDrawing = {
  title: "Untitled Chemical Drawing",
  url: "/chemDrawingExample.jpg",
};

export const BLOCK_FUNCTION_MAP: Record<
  BlockType,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ({ content, isEditable }: tBlockComponentProps<any>) => React.JSX.Element
> = {
  [BlockType.PARAGRAPH]: Paragraph,
  [BlockType.LIST]: List,
  [BlockType.CHECKLIST]: CheckList,
  [BlockType.CHEMICAL_DRAWING]: ChemDrawing,
  [BlockType.NOTEBOOK_TITLE]: NotebookTitle,
};

export const DEFAULT_BLOCK_CONTENT_MAP: Record<BlockType, unknown> = {
  [BlockType.PARAGRAPH]: DEFAULT_PARAGRAPH,
  [BlockType.LIST]: DEFAULT_LIST,
  [BlockType.CHECKLIST]: DEFAULT_CHECKLIST,
  [BlockType.CHEMICAL_DRAWING]: DEFAULT_CHEM_DRAWING,
  [BlockType.NOTEBOOK_TITLE]: DEFAULT_NOTEBOOK_TITLE,
};

export const BLOCK_MENU_ITEMS = [
  {
    title: "Paragraph",
    icon: Pilcrow,
    type: BlockType.PARAGRAPH,
  },
  {
    title: "List",
    icon: ListOrdered,
    type: BlockType.LIST,
  },
  {
    title: "Check List",
    icon: ListChecks,
    type: BlockType.CHECKLIST,
  },
  {
    title: "Chemical Drawing",
    icon: FlaskConical,
    type: BlockType.CHEMICAL_DRAWING,
  },
];
