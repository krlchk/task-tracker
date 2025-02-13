/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { EditTask } from "./edit-task-component";
import { useDrag } from "react-dnd";

/* eslint-disable react/prop-types */
export function ToDo({ task, updateTask, deleteTask, errorHandling }) {
  const [time, setTime] = useState(task.duration || 0);
  const [isTimeRunning, setIsTimeRunning] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "todo",
    item: {
      id: task.id,
      projectName: task.projectName,
      projectDescription: task.projectDescription,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    let interval;
    if (isTimeRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimeRunning]);

  useEffect(() => {
    updateTask(task.id, task.projectName, task.projectDescription, time);
  }, [time]);

  const handleTime = () => {
    setIsTimeRunning((prevSate) => !prevSate);
  };

  const timeReset = () => {
    setTime(0);
    setIsTimeRunning(false);
  };

  return (
    <div
      ref={drag}
      className="flex flex-col gap-5 bg-white p-5 text-lg shadow-xl"
    >
      <div className="flex justify-between mobile:flex-col">
        <p className="h-auto max-w-[300px] break-words text-xl font-bold mobile:order-2">
          {task.projectName}
        </p>
        <EditTask
          task={task}
          updateTask={updateTask}
          errorHandling={errorHandling}
        />
      </div>
      <p className="h-auto max-w-[300px] break-words">{task.projectDescription}</p>
      <div className="flex justify-center gap-5 py-3 mobile:flex-col">
        <div className="flex text-xl font-bold mobile:justify-center">
          <p className="self-end">
            {("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:
          </p>
          <p className="self-end">
            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
          </p>
          <p className="self-end">
            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
          </p>
          <p className="self-end text-base font-normal">
            {("0" + ((time / 10) % 100)).slice(-2)}
          </p>
        </div>
        <button
          onClick={handleTime}
          className="rounded-lg border-2 border-gray-500 px-2 font-semibold text-gray-500 transition-colors hover:bg-gray-500 hover:text-white"
        >
          {isTimeRunning ? "Stop" : "Start"}
        </button>
        <button
          onClick={timeReset}
          className="rounded-lg border-2 border-gray-500 px-2 font-semibold text-gray-500 transition-colors hover:bg-gray-500 hover:text-white"
        >
          Reset
        </button>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="w-full rounded-lg border-2 border-red-500 font-semibold text-red-500 transition-colors hover:bg-red-500 hover:text-white"
      >
        Delete
      </button>
    </div>
  );
}
