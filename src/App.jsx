/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { AddTaskComponent } from "./components";
import { ToDo } from "./components";
import { useDrop } from "react-dnd";
import { CompletedTask } from "./components/completed-todo";

function App() {
  const [taskList, setTaskList] = useState(() => {
    const savedTasks = localStorage.getItem("taskList");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [completedTasks, setCompletedTasks] = useState([]);

  const [taskCounter, setTaskCounter] = useState(() => {
    const savedCounter = localStorage.getItem("taskCounter");
    return savedCounter ? JSON.parse(savedCounter) : 0;
  });

  useEffect(() => {
    localStorage.setItem("taskList", JSON.stringify(taskList));
  }, [taskList]);

  useEffect(() => {
    localStorage.setItem("taskCounter", JSON.stringify(taskCounter));
  }, [taskCounter]);

  const addTask = (projectName, projectDescription) => {
    setTaskList((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        projectName,
        projectDescription,
        duration: 0,
        timeStamp: new Date().toISOString(),
      },
    ]);
    window.location.reload();
    setTaskCounter((prevCount) => prevCount + 1);
  };

  const updateTask = (
    id,
    newProjectName,
    newProjectDescription,
    newDuration,
  ) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              projectName: newProjectName,
              projectDescription: newProjectDescription,
              duration: newDuration,
            }
          : task,
      ),
    );
  };

  const deleteTask = (id) => {
    const filteredTasks = taskList.filter((task) => task.id !== id);
    setTaskList(filteredTasks);
    setTaskCounter((prevCount) => prevCount - 1);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "todo",
    drop: (item) => addToCompleted(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToCompleted = (id) => {
    setTaskList((prevTaskList) => {
      const moveTask = prevTaskList.find((task) => task.id === id);
      if (!moveTask) return prevTaskList;

      setCompletedTasks((prevCompleted) => {
        if (prevCompleted.some((task) => task.id === id)) {
          return prevCompleted;
        }
        return [...prevCompleted, moveTask];
      });

      return prevTaskList.filter((task) => task.id !== id);
    });

    setTaskCounter((prevCount) => Math.max(prevCount - 1, 0));
  };

  return (
    <>
      <div className="mobile:p-5 flex flex-col gap-3 p-10">
        <h1 className="mobile:text-2xl text-4xl font-bold">The Task Tracker</h1>
        <div className="mobile:text-xl flex items-center text-2xl font-semibold">
          <p>Click</p>
          <AddTaskComponent addTask={addTask} />
          <p>to add a new task</p>
        </div>
        <div className="xs:flex-col mt-10 flex w-full justify-around">
          <div className="xs:mb-10 xs:w-full flex w-2/5 max-w-[600px] flex-col gap-5">
            <div className="mobile:text-lg flex justify-between bg-gray-300 p-5 text-xl font-bold">
              <p>ToDo:</p>
              <p className="text-green-600">{taskCounter}</p>
            </div>
            {taskList
              .slice(0)
              .reverse()
              .map((task) => (
                <ToDo
                  key={task.id}
                  taskList={taskList}
                  task={task}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              ))}
          </div>
          <div
            ref={drop}
            className="xs:mb-10 xs:w-full flex w-2/5 max-w-[600px] flex-col gap-5"
          >
            <div className="mobile:text-lg w-auto bg-gray-300 p-5 text-xl font-bold">
              <p>Completed:</p>
            </div>
            {completedTasks.map((task, i) => (
              <CompletedTask key={i} task={task} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
