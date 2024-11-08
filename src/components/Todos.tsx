import { useForm, SubmitHandler } from "react-hook-form";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../service/mutation";
import { useTodoIds, useTodos } from "../service/queries";
import { Todo } from "../@types/todo";

export default function Todos() {
  const todosIdsQuery = useTodoIds();
  const todosQueries = useTodos(todosIdsQuery.data);

  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();

  const handelCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };

  const handelMarkAsDoneSubmit = (data: Todo | undefined) => {
    if (data) updateTodoMutation.mutate({ ...data, checked: true });
  };
  const handelDeleteTodoSubmit = (id: number) => deleteTodoMutation.mutate(id);
  return (
    <>
      {/* Display Todos IDs if needed */}
      {/* {todosIdsQuery.data?.map((id) => (
      <p key={id}>id: {id}</p>
    ))} */}

      <form
        onSubmit={handleSubmit(handelCreateTodoSubmit)}
        className="w-full max-w-md space-y-4 bg-[#2c2f3a] p-6 rounded-lg shadow-md"
      >
        <h4 className="text-lg font-semibold text-gray-200">Create New Todo</h4>

        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full px-4 py-2 bg-[#1a1b26] text-gray-300 placeholder-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          placeholder="Description"
          {...register("description")}
          className="w-full px-4 py-2 bg-[#1a1b26] text-gray-300 placeholder-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={createTodoMutation.isPending}
          type="submit"
          className="w-full py-2 font-semibold text-gray-100 transition duration-200 bg-indigo-600 rounded hover:bg-indigo-700 disabled:opacity-50"
        >
          {createTodoMutation.isPending ? "Cheating..." : "Cheat Todo"}
        </button>
      </form>

      <ul className="w-full max-w-md space-y-4">
        {todosQueries.map(({ data }) => (
          <li
            key={data?.id}
            className="p-4 bg-[#2c2f3a] rounded-lg shadow-md flex flex-col space-y-2"
          >
            <div className="text-sm text-gray-400">ID: {data?.id}</div>
            {/* delete btn */}
            {data && data.id && (
              <button onClick={() => handelDeleteTodoSubmit(data.id!)}>
                Delete
              </button>
            )}
            <div className="text-gray-300">
              <strong className="block text-lg text-gray-200">
                Title: {data?.title}
              </strong>
              <span className="block text-gray-400">
                Description: {data?.description}
              </span>
            </div>
            {/* maskAsDoneBtn */}
            <div>
              <button
                disabled={data?.checked}
                onClick={() => handelMarkAsDoneSubmit(data)}
              >
                {data?.checked ? "Done" : "Mark as Done"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
