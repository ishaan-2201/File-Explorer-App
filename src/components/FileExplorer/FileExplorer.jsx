import React, { useState } from "react";
import "./FileExplorer.css";

const FileExplorer = ({
  handleInsertNode,
  explorer,
  handleDeleteNode,
  handleUpdateNode,
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState(explorer.name);

  // Handle adding a new file or folder
  const handleAddFileExplorer = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });
  };

  // Add item on Enter key press
  const handleAddItem = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput((prev) => ({ ...prev, visible: false }));
    }
  };

  // Delete item
  const handleDeleteItem = (e) => {
    e.stopPropagation();
    handleDeleteNode(explorer.id);
  };

  // Enable edit mode to update item name
  const handleEditItem = (e) => {
    e.stopPropagation();
    setEditMode(true);
  };

  // Update item name on Enter key press or on blur
  const handleUpdateItem = (e) => {
    if ((e.key === "Enter" || e.type === "blur") && updatedName.trim()) {
      handleUpdateNode(explorer.id, updatedName);
      setEditMode(false);
    }
  };

  // Prevent rendering if no file structure is provided
  if (!explorer) {
    return <p>No File structure provided</p>;
  }

  return explorer.isFolder ? (
    <div className="folder">
      <div className="folder-name" onClick={() => setExpand((prev) => !prev)}>
        <p>
          📁
          {editMode ? (
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              onKeyDown={handleUpdateItem}
              onBlur={handleUpdateItem}
              autoFocus
            />
          ) : (
            explorer.name
          )}
        </p>
        <div className="operations">
          <span onClick={(e) => handleAddFileExplorer(e, true)}>➕ 📁</span>
          <span onClick={(e) => handleAddFileExplorer(e, false)}>➕ 📄</span>
          <span onClick={handleEditItem}>✏️</span>
          <span onClick={handleDeleteItem}>❌</span>
        </div>
      </div>
      {showInput.visible && (
        <div>
          <span>{showInput.isFolder ? "📁" : "📄"}</span>
          <input
            type="text"
            autoFocus
            onKeyDown={handleAddItem}
            onBlur={() => setShowInput((prev) => ({ ...prev, visible: false }))}
          />
        </div>
      )}
      {expand && (
        <div className="children">
          {explorer.items.map((item) => (
            <FileExplorer
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleUpdateNode={handleUpdateNode}
              key={item.id}
              explorer={item}
            />
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className="file">
      <p>
        📄
        {editMode ? (
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            onKeyDown={handleUpdateItem}
            onBlur={handleUpdateItem}
            autoFocus
          />
        ) : (
          explorer.name
        )}
      </p>
      <div className="operations">
        <span onClick={handleEditItem}>✏️</span>
        <span onClick={handleDeleteItem}>❌</span>
      </div>
    </div>
  );
};

export default FileExplorer;
