/* eslint-disable react/prop-types */
export function ModalWindow({
  handleModal,
  addTaskHandle,
  inputValue,
  areaValue,
  handleInput,
  buttonName,
  modalName,
  errorMessage,
}) {
  return (
    <div
      onClick={handleModal}
      className="fixed inset-0 flex items-center overflow-hidden justify-center backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex h-auto w-2/5 mobile:w-4/5 max-w-lg flex-col rounded-xl bg-white shadow-2xl"
      >
        <div className="flex justify-between p-5">
          <h3 className="text-2xl mobile:text-lg font-bold">{modalName}</h3>
          <button
            className="font-bold text-gray-500 transition-colors hover:text-gray-400"
            onClick={handleModal}
          >
            X
          </button>
        </div>
        <form action="">
          <div className="mb-5 px-5">
            <label
              className="text-sm mobile:text-xs font-bold uppercase tracking-wide text-gray-500"
              htmlFor="project-name"
            >
              Project Name
            </label>
            <input
              onChange={handleInput}
              id="project-name"
              name="projectName"
              value={inputValue}
              type="text"
              required
              placeholder="Project name"
              className="mt-2 flex w-full rounded-md bg-gray-300 p-2 text-lg mobile:text-base placeholder:text-base focus:outline-none"
            />
            <p className="mt-2 text-center text-lg text-red-600">
              {errorMessage}
            </p>
          </div>
          <div className="px-5">
            <label
              className="text-sm mobile:text-xs font-bold uppercase tracking-wide text-gray-500"
              htmlFor="project-desc"
            >
              Task desctiption
            </label>
            <textarea
              onChange={handleInput}
              value={areaValue}
              id="project-desc"
              rows="3"
              name="projectDescription"
              type="text"
              placeholder="Project description"
              className="mt-2 flex w-full rounded-md bg-gray-300 p-2 text-lg placeholder:text-base focus:outline-none"
            />
          </div>
          <div className="mt-5 flex justify-end border-t border-gray-400 p-5">
            <button
              onClick={addTaskHandle}
              className="mt-2 rounded-md bg-blue-500 p-2 text-lg mobile:text-base font-semibold text-white transition-colors hover:bg-blue-400"
            >
              {buttonName}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
