import "./App.css";

import { useState } from "react";
// ...existing code...
import "./App.css";

let idCounter = 1;

function createNode() {
  return { id: idCounter++, value: "", children: [] };
}

function InputNode({ node, onChange, onAddSubInput }) {
  return (
    <div style={{ marginLeft: 24, marginTop: 8 }}>
      <input
        type="text"
        value={node.value}
        onChange={(e) => onChange(node.id, e.target.value)}
        style={{ marginRight: 8 }}
        placeholder="Enter value"
      />
      <button onClick={() => onAddSubInput(node.id)}>Add Sub Input</button>
      {node.children.length > 0 && (
        <div style={{ marginLeft: 24 }}>
          {node.children.map((child) => (
            <InputNode
              key={child.id}
              node={child}
              onChange={onChange}
              onAddSubInput={onAddSubInput}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  const [inputs, setInputs] = useState([]);

  // Add a new main input
  const handleAddInput = () => {
    setInputs([...inputs, createNode()]);
  };

  // Change value of a node by id
  const handleChange = (id, value) => {
    function update(nodes) {
      return nodes.map((node) =>
        node.id === id
          ? { ...node, value }
          : { ...node, children: update(node.children) }
      );
    }
    setInputs(update(inputs));
  };

  // Add sub input to a node by id
  const handleAddSubInput = (id) => {
    function add(nodes) {
      return nodes.map((node) =>
        node.id === id
          ? { ...node, children: [...node.children, createNode()] }
          : { ...node, children: add(node.children) }
      );
    }
    setInputs(add(inputs));
  };

  return (
    <div style={{ padding: 32 }}>
      <button onClick={handleAddInput}>Add Input</button>
      <div style={{ marginTop: 24 }}>
        {inputs.map((node) => (
          <InputNode
            key={node.id}
            node={node}
            onChange={handleChange}
            onAddSubInput={handleAddSubInput}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
