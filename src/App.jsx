import React, { useState } from "react";
import fileStructure from "../data/data.js";
import FileExplorer from "./components/FileExplorer/FileExplorer.jsx";
import useTraverseTree from "./hooks/use-traverse-tree.js";

const App = () => {
  const [explorer, setExplorer] = useState(fileStructure);
  const { insertNode, deleteNode, updateNode } = useTraverseTree();
  const handleInsertNode = (folderId, item, isFolder) => {
    const finalTree = insertNode(explorer, folderId, item, isFolder);
    setExplorer(finalTree);
  };
  const handleDeleteNode = (nodeId) => {
    const finalTree = deleteNode(explorer, nodeId);
    setExplorer(finalTree);
  };
  const handleUpdateNode = (nodeId, newName) => {
    const finalTree = updateNode(explorer, nodeId, newName);
    setExplorer(finalTree);
  };
  return (
    <div>
      <FileExplorer
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdateNode={handleUpdateNode}
        explorer={explorer}
      />
    </div>
  );
};

export default App;
