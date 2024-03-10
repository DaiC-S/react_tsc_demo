import React, { useState } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");

  type Task = {
    id: string;
    title: string;
    state: boolean;
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(evt.target.value);
    setTitle(evt.target.value);
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const newTask: Task = {
      id: uuidv4(),
      title: title,
      state: false,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
  };

  const taskEdit = (id: string, title: string) => {
    const updateTask = tasks.map((task) => {
      if (task.id == id) {
        task.title = title;
      }
      return task;
    });
    setTasks(updateTask);
  };

  const taskCheck = (id: string, state: boolean) => {
    const stateChange = tasks.map((task) => {
      if (task.id == id) {
        task.state = !state;
      }
      return task;
    });
    setTasks(stateChange);
  };

  const taskDelete = (id: string) => {
    const fleshTasks = tasks.filter((task) => task.id !== id);
    setTasks(fleshTasks);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div>
        <h2>Tasks</h2>
        <form onSubmit={(evt) => handleSubmit(evt)} className="mb-3">
          <input type="text" onChange={(evt) => handleChange(evt)} className="py-2 px-4 border border-slate- 300 hover:border-slate-500 rounded" />
          <input type="submit" value="Add" className="py-2 px-4 cursor-pointer bg-slate-300 hover:bg-slate-500 rounded" />
        </form>
        <ul>
          {tasks.map((task) => (
            <li key="task.id" className="w-[10%] flex items-center mb-3">
              <input
                type="text"
                onChange={(evt) => taskEdit(task.id, evt.target.value)}
                value={task.title}
                disabled={task.state}
                className="p-2 border border-slate- 300 hover:border-slate-500 rounded"
              />
              <input type="checkbox" onChange={() => taskCheck(task.id, task.state)} />
              <button onClick={() => taskDelete(task.id)} className="py-2 px-4 cursor-pointer bg-slate-300 hover:bg-slate-500 rounded">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
