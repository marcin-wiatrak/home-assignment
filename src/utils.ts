import {TTodo} from "./types.ts";

export const createSubtask = (todos: TTodo[], parentId: string, taskContent: TTodo): TTodo[] => {
    return todos.map((todo) => {
        if (todo.id === parentId) {
            return {
                ...todo,
                subtasks: todo.subtasks?.length ? [...todo.subtasks, taskContent] : [taskContent]
            }
        }
        if (todo.subtasks) {
            return {
                ...todo,
                subtasks: createSubtask(todo.subtasks, parentId, taskContent)
            }
        }
        return todo
    })
}