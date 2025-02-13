/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useState } from "react";
import { ModalWindow } from "./modal-window";

export function AddTaskComponent({ className, addTask }) {
  const [addModal, setAddModal] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "projectName") {
      setProjectName(value);
      setErrorMessage("");
    }
    if (name === "projectName" && value === "") {
      setErrorMessage("Enter project name to continue");
    }
    if (name === "projectDescription") setProjectDescription(value);
  };

  const addTaskHandle = (e) => {
    e.preventDefault();
    if (!projectName) {
      setErrorMessage("Enter project name to continue");
    } else {
      addTask(projectName, projectDescription);
      setProjectName("");
      setProjectDescription("");
      setErrorMessage("");
      setAddModal(false);
    }
  };

  const handleCloseModal = () => {
    setAddModal(false);
    setProjectName("");
    setProjectDescription("");
    setErrorMessage("");
  };

  return (
    <>
      <button
        onClick={() => setAddModal(true)}
        className={clsx(
          className,
          "mx-5 rounded-lg bg-blue-500 p-2 text-white transition-colors hover:bg-blue-400",
        )}
      >
        + NEW
      </button>

      {addModal ? (
        <ModalWindow
          modalName="Add new task"
          buttonName="Add task"
          addTaskHandle={addTaskHandle}
          handleModal={handleCloseModal}
          inputValue={projectName}
          areaValue={projectDescription}
          handleInput={handleInput}
          errorMessage={errorMessage}
        />
      ) : null}
    </>
  );
}
