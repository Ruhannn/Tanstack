import { useState } from "react";
import { useProjects } from "../service/queries";

export default function Projects() {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const {
    data,
    isPending,
    error,
    isError,
    isPlaceholderData,
    isLoading,
    isFetching,
  } = useProjects(page, perPage);

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="mb-4 text-2xl font-bold text-gray-200">Projects</h1>
      {isLoading && <div className="mt-2 text-gray-500">Loading...</div>}
      {isError && <div className="text-red-500">Error: {error.message}</div>}
      {!isPending && !isError && (
        <div className="w-full max-w-3xl  p-4 bg-[#2c2f3a] rounded-lg shadow-md">
          {data?.data?.length > 0 ? (
            <ul className="space-y-2">
              {data.data.map((project) => (
                <li
                  key={project.id}
                  className="p-3 rounded bg-[#1a1b26] text-gray-300">
                  {project.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-600">No projects found.</p>
          )}
        </div>
      )}

      <div className="flex items-center mt-6 space-x-4">
        <button
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}
          className={`px-4 py-2 rounded-md text-white ${
            page === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 rounded hover:bg-indigo-700"
          } transition`}>
          Previous Page
        </button>
        <span className="font-medium text-gray-200 min-w-[120px]">
          {isFetching ? "Loading" : `Current Page: ${page}`}
        </span>
        <button
          onClick={() => {
            if (!isPlaceholderData) {
              setPage((old) => old + 1);
            }
          }}
          disabled={page === data?.pages}
          className={`px-4 py-2 rounded-md text-white ${
            page === data?.pages
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 rounded hover:bg-indigo-700"
          } transition`}>
          Next Page
        </button>
      </div>
    </div>
  );
}
