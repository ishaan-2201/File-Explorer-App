const useTraverseTree = () => {
  const insertNode = (tree, folderId, item, isFolder) => {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      });
      return tree;
    }
    let latestNode = [];
    latestNode = tree.items.map((obj) => {
      return insertNode(obj, folderId, item, isFolder);
    });
    return { ...tree, items: latestNode };
  };
  const deleteNode = (tree, nodeId) => {
    if (tree.id === nodeId) {
      return null;
    }

    const filteredItems = tree.items
      .map((item) => deleteNode(item, nodeId))
      .filter((item) => item !== null);
    return { ...tree, items: filteredItems };
  };

  const updateNode = (tree, nodeId, newName) => {
    if (tree.id === nodeId) {
      return { ...tree, name: newName };
    }
    const updatedItems = tree.items.map((item) =>
      updateNode(item, nodeId, newName)
    );

    return { ...tree, items: updatedItems };
  };

  return { insertNode, deleteNode, updateNode };
};

export default useTraverseTree;
