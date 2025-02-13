/* eslint-disable react/prop-types */
export function CompletedTask({ task }) {
  return (
    <div className="flex flex-col gap-5 bg-white p-5 text-lg shadow-xl">
      <div className="flex justify-between">
        <p className="text-xl font-bold">{task.projectName}</p>
      </div>
      <p>{task.projectDescription}</p>
    </div>
  );
}
