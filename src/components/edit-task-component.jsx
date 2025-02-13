/* eslint-disable react/prop-types */
import { useState } from "react";
import { ModalWindow } from "./modal-window";

export function EditTask({
  task,
  updateTask,
}) {
  const [editModal, setEditModal] = useState(false);
  const [projectName, setProjectName] = useState(task.projectName);
  const [projectDescription, setProjectDescription] = useState(
    task.projectDescription,
  );
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

  const updateTaskHandle = (e) => {
    e.preventDefault();
    if (!projectName) {
      setErrorMessage("Enter project name to continue");
    } else {
      updateTask(task.id, projectName, projectDescription);
      setErrorMessage("");
      setEditModal(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setEditModal(true)}
        className="rounded-lg mobile:w-2/3 mobile:self-end mobile:order-1 border-2 border-blue-500 mobile:px-0 px-5 font-semibold text-blue-500 transition-colors hover:bg-blue-500 hover:text-white"
      >
        Edit
      </button>
      {editModal ? (
        <ModalWindow
          modalName="Edit task"
          buttonName="Update"
          addTaskHandle={updateTaskHandle}
          handleInput={handleInput}
          handleModal={() => setEditModal(false)}
          inputValue={projectName}
          areaValue={projectDescription}
          errorMessage={errorMessage}
        />
      ) : null}
    </>
  );
}
