import uuid from "react-uuid";
import { BlockType, ListType, tNotebook } from "../../types";

export const mockNotebooks: tNotebook[] = [
  {
    id: uuid(),
    title: "Example Notebook",
    blocks: [
      {
        id: uuid(),
        index: 0,
        type: BlockType.PARAGRAPH,
        content: {
          title: "Example Paragraph",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
        },
      },
      {
        id: uuid(),
        index: 1,
        type: BlockType.LIST,
        content: {
          title: "Example Unordered List",
          type: ListType.BULLET,
          items: [
            "Pellentesque sodales lacus nec erat aliquam mattis.",
            "Phasellus venenatis blandit felis, non eleifend magna pretium vitae.",
            "Vivamus a tincidunt velit.",
          ],
        },
      },
      {
        id: uuid(),
        index: 2,
        type: BlockType.LIST,
        content: {
          title: "Example Ordered List",
          type: ListType.ORDERED,
          items: [
            "Fusce ac justo id felis condimentum fringilla. ",
            "Quisque a nisi sed urna luctus egestas elementum sit amet quam.",
            "Morbi ac odio dictum, pharetra tellus efficitur, blandit ex.",
            "Suspendisse porttitor odio et leo commodo mollis.",
          ],
        },
      },
      {
        id: uuid(),
        index: 5,
        type: BlockType.CHECKLIST,
        content: {
          title: "Example Checklist",
          items: [
            {
              id: uuid(),
              isChecked: false,
              content:
                "Mauris porttitor magna et leo varius, vel dapibus velit aliquam.",
            },
            {
              id: uuid(),
              isChecked: false,
              content: "Suspendisse et egestas tortor, nec faucibus leo.",
            },
          ],
        },
      },
      {
        id: uuid(),
        index: 3,
        type: BlockType.CHEMICAL_DRAWING,
        content: {
          title: "Example Chemical Drawing",
          url: "/chemicalDrawing.png",
        },
      },
    ],
  },
];
