import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const initialData = {
  columns: {
    todo: {
      name: "To-Do",
      items: [],
    },
    inprogress: {
      name: "In Progress",
      items: [],
    },
    done: {
      name: "Done",
      items: [],
    },
  },
};

function App() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem("taskBoard");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return {
        todo: { ...initialData.columns.todo },
        inprogress: { ...initialData.columns.inprogress },
        done: { ...initialData.columns.done },
      };
    }
  });
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    localStorage.setItem("taskBoard", JSON.stringify(columns));
  }, [columns]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    const id = Date.now().toString();
    const task = { id, ...newTask };
    setColumns((prev) => ({
      ...prev,
      todo: {
        ...prev.todo,
        items: [task, ...prev.todo.items],
      },
    }));
    setNewTask({ title: "", description: "" });
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceCol = columns[source.droppableId];
    const destCol = columns[destination.droppableId];
    const sourceItems = Array.from(sourceCol.items);
    const [moved] = sourceItems.splice(source.index, 1);
    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
      });
    } else {
      const destItems = Array.from(destCol.items);
      destItems.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destCol,
          items: destItems,
        },
      });
    }
  };

  const handleDelete = (colId, taskId) => {
    setColumns((prev) => ({
      ...prev,
      [colId]: {
        ...prev[colId],
        items: prev[colId].items.filter((item) => item.id !== taskId),
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
        Task Board
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-6 justify-center items-start w-full max-w-6xl mx-auto">
          {Object.entries(columns).map(([colId, col]) => (
            <div
              className="bg-white rounded-lg shadow-lg p-4 flex-1 min-w-[260px] max-w-md"
              key={colId}
            >
              <h2 className="text-xl font-semibold mb-4 text-blue-600">
                {col.name}
              </h2>
              {colId === "todo" && (
                <form
                  className="flex flex-col gap-2 mb-4"
                  onSubmit={handleAddTask}
                >
                  <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    required
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <input
                    type="text"
                    placeholder="Description (optional)"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                  <button
                    type="submit"
                    className="bg-purple-500 text-white rounded px-4 py-2 hover:bg-purple-600 transition"
                  >
                    Add
                  </button>
                </form>
              )}
              <Droppable droppableId={colId}>
                {(provided) => (
                  <div
                    className="flex flex-col gap-3 min-h-[60px]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {col.items.map((item, idx) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={idx}
                      >
                        {(provided) => (
                          <div
                            className="bg-gradient-to-r from-purple-200 to-blue-100 rounded shadow p-3 flex flex-col relative"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-gray-800">
                                {item.title}
                              </span>
                              <button
                                className="text-red-500 hover:text-red-700 text-lg font-bold px-2"
                                onClick={() => handleDelete(colId, item.id)}
                              >
                                &times;
                              </button>
                            </div>
                            {item.description && (
                              <div className="text-sm text-gray-600">
                                {item.description}
                              </div>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
