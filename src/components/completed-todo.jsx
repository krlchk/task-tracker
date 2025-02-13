/* eslint-disable react/prop-types */
export function CompletedTask({ task }) {
  return (
    <div className="flex flex-col gap-5 bg-white p-5 text-lg shadow-xl">
      <div className="flex justify-between">
        <p className="text-xl max-w-[300px] break-words font-bold">{task.projectName}</p>
      </div>
      <p className="max-w-[300px] break-words">{task.projectDescription}</p>
    </div>
  );
}
