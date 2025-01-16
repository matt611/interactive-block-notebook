"use client";

import { BlockType, tBlock, tNotebook } from "@/types";
import { useNotebookContext, VersionRecord } from "./contexts";
import uuid from "react-uuid";
import { DEFAULT_BLOCK_CONTENT_MAP } from "@/constants";

const VERSION_THRESHOLD = 1;

export default function useDBHelper() {
  const notebookContext = useNotebookContext();
  const [notebooks, setNotebooks] = notebookContext.notebooksStore;
  const [changeVector, setChangeVector] = notebookContext.changeVectorStore;
  const [notebookVersions, setNotebookVesions] =
    notebookContext.notebookVersionStore;
  const [blockVersions, setBlockVesionStore] =
    notebookContext.blockVersionStore;

  /**
   * Get an array of all notebooks
   * @returns {tNotebook[]} array of notebooks
   */
  function fetchAllNotebooks() {
    return notebooks;
  }

  /**
   * Get a notebook by id
   * @param {string} uuid
   * @returns {tNotebook} notebook with the input id
   */
  function fetchNotebookById(notebookId: string) {
    return getNotebook(notebookId);
  }

  /**
   * Create a new notebook
   * @param {string} title of new notebook
   * @returns {tNotebook}
   */
  function createNewNotebook(title: string) {
    const newNotebook: tNotebook = {
      id: uuid(),
      title,
      blocks: [],
    };
    setNotebooks([...notebooks, newNotebook]);
    return newNotebook;
  }

  /**
   * Create a new block
   * @param {BlockType} type - what type of block
   * @param {string} notebookId -id of the notebook to add the new block to
   * @returns {tBlock<T>}
   */
  function createNewBlock(type: BlockType, notebookId: string) {
    const currentNotebook = getNotebook(notebookId);
    const content = DEFAULT_BLOCK_CONTENT_MAP[type];
    const newBlock: tBlock<typeof content> = {
      id: uuid(),
      index: currentNotebook!.blocks.length,
      type,
      content: content,
    };

    return newBlock;
  }

  /**
   * Delete a notebook
   * @param {string} notebookId
   */
  function deleteNotebook(notebookId: string) {
    const filteredNotebooks = notebooks.filter((n) => {
      return n.id !== notebookId;
    });
    setNotebooks([...filteredNotebooks]);
  }

  /**
   * Change the title of an existing notebook
   * @param {string} notebookId
   * @param {string} newTitle
   * @returns {tNotebook}
   */
  function changeNotebookTitle(notebookId: string, newTitle: string) {
    const notebook = getNotebook(notebookId);
    if (!notebook) return;

    notebook.title = newTitle;

    replaceNotebook(notebook);
    updateNotebookVersion(notebookId);
    return notebook;
  }

  /**
   *
   * @param {string}notebookId
   * @param blockId
   * @returns
   */
  function deleteBlock(notebookId: string, blockId: string) {
    const notebook = getNotebook(notebookId);
    if (!notebook) return;

    notebook.blocks = notebook.blocks.filter((b) => b.id !== blockId);

    replaceNotebook(notebook);
  }

  /**
   * helper function to get the notebook out of the store
   * @param {string} notebookId
   * @returns {tNotebook}
   */
  function getNotebook(notebookId: string) {
    return notebooks.find((n) => n.id === notebookId);
  }

  /**
   * Replace existing contents of a specific block
   * @param {string} notebookId
   * @param {string} blockId
   * @param {tBlock<T>} content - new contents of the block
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function updateBlock(notebookId: string, blockId: string, content: any) {
    const thisNotebook = getNotebook(notebookId);
    const thisBlock = thisNotebook!.blocks.find((b) => b.id === blockId);
    thisBlock!.content = content;
    updateVersions(notebookId, blockId);
    return thisNotebook!;
  }

  /**
   * Increment the change vectors for a specific notebook
   * @param {strinhg} notebookId
   * @returns
   */
  function updateNotebookVersion(notebookId: string) {
    if (!notebookId) return;

    const thisNotebook = getNotebook(notebookId);
    if (!thisNotebook) return;

    changeVector.notebooks[notebookId] =
      changeVector.notebooks[notebookId] || 0;
    changeVector.notebooks[notebookId]++;

    if (changeVector.notebooks[notebookId] % VERSION_THRESHOLD === 0) {
      const version: VersionRecord = {
        date: new Date(),
        contentJSON: JSON.stringify(thisNotebook),
      };

      notebookVersions[notebookId] = notebookVersions[notebookId] || [];
      notebookVersions[notebookId].push(version);
      setNotebookVesions({ ...notebookVersions });
    }
  }

  /**
   * Increment ths change vectors for a specific block
   * @param {string} notebookId
   * @param {string} blockId
   * @returns
   */
  function updateBlockVersion(notebookId: string, blockId: string) {
    if (!notebookId || !blockId) return;

    const thisNotebook = getNotebook(notebookId);
    if (!thisNotebook) return;
    const thisBlock = thisNotebook.blocks.find((b) => b.id === blockId);
    if (!thisBlock) return;

    // increment change vectors
    changeVector.blocks[blockId] = changeVector.blocks[blockId] || 0;
    changeVector.blocks[blockId]++;

    if (changeVector.blocks[blockId] % VERSION_THRESHOLD === 0) {
      const version: VersionRecord = {
        date: new Date(),
        contentJSON: JSON.stringify(thisBlock.content),
      };

      blockVersions[blockId] = blockVersions[blockId] || [];
      blockVersions[blockId].push(version);
      setBlockVesionStore({ ...blockVersions });
    }

    setChangeVector({ ...changeVector });
  }

  /**
   * Wrapper to increment change vectors with one call
   * @param {string} notebookId
   * @param {string} blockId
   */
  function updateVersions(notebookId: string, blockId?: string) {
    updateNotebookVersion(notebookId);
    if (blockId) updateBlockVersion(notebookId, blockId);
  }

  /**
   * Replace an entire notebook in the store
   * @param {tNotebook} newNotebook
   */
  function replaceNotebook(newNotebook: tNotebook) {
    const index = notebooks.findIndex((n) => n.id === newNotebook.id);
    notebooks[index] = newNotebook;
    setNotebooks([...notebooks]);
  }

  return {
    fetchAllNotebooks,
    fetchNotebookById,
    createNewNotebook,
    createNewBlock,
    deleteNotebook,
    changeNotebookTitle,
    deleteBlock,
    updateBlock,
    replaceNotebook,
  };
}
