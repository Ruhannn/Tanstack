import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../@types/todo";
import { createTodo, deleteTodo, updateTodo } from "./api";

export function useCreateTodo() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (data: Todo) => createTodo(data),
        onMutate: () => {
            console.log("mutate");
        },
        onError: () => {
            console.log("error");
        },
        onSuccess: () => {
            console.log("success");
        },
        onSettled: async (_, error) => {
            console.log("settled");
            error ?
                console.log(error) : await qc.invalidateQueries({ queryKey: ["todos"] })
        }
    })
}

export function useUpdateTodo() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (data: Todo) => updateTodo(data),
        onMutate: () => {
            console.log("mutate");
        },
        onError: () => {
            console.log("error");
        },
        onSuccess: () => {
            console.log("success");
        },
        onSettled: async (_, error, variables) => {
            console.log("settled");

            if (error) {
                console.log(error);
            } else {
                await qc.invalidateQueries({ queryKey: ["todos"] });
                await qc.invalidateQueries({
                    queryKey: ["todo", { id: variables.id }],
                });
            }

        }
    })
}

export function useDeleteTodo() {
    const qc = useQueryClient()
    return useMutation({
        mutationFn: (id: number) => deleteTodo(id),
        onMutate: () => {
            console.log("mutate");
        },
        onError: () => {
            console.log("error");
        },
        onSuccess: () => {
            console.log("success");
        },
        onSettled: async (_, error) => {
            console.log("settled");

            if (error) {
                console.log(error);
            } else {
                await qc.invalidateQueries({ queryKey: ["todos"] });
            }

        }
    })
}