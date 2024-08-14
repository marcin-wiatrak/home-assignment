import { TTodo } from './types.ts'
import { UniqueIdentifier } from '@dnd-kit/core'

export const createSubtask = (todos: TTodo[], parentId: string, taskContent: TTodo): TTodo[] => {
  return todos.map((todo) => {
    if (todo.id === parentId) {
      return {
        ...todo,
        subtasks: todo.subtasks?.length ? [...todo.subtasks, taskContent] : [taskContent],
      }
    }
    if (todo.subtasks) {
      return {
        ...todo,
        subtasks: createSubtask(todo.subtasks, parentId, taskContent),
      }
    }
    return todo
  })
}

export const findTask = (todos: TTodo[], taskId: UniqueIdentifier): TTodo | null => {
  let foundTask
  for (const todo of todos) {
    if (todo.id === taskId) {
      foundTask = todo
      return foundTask
    }
    if (todo.subtasks) {
      const task = findTask(todo.subtasks, taskId)
      if (task) {
        return task
      }
    }
  }
  return null
}

export const findTaskIndex = (todos: TTodo[], taskId: UniqueIdentifier): number => {
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].id === taskId) {
      return i
    }
    if (todos[i].subtasks.length) {
      const index = findTaskIndex(todos[i].subtasks, taskId)
      if (index !== -1) {
        return index
      }
    }
  }
  return -1
}

export const findParentTodo = (todos: TTodo[], taskId: UniqueIdentifier): TTodo | null => {
  for (const todo of todos) {
    if (todo.subtasks) {
      if (todo.subtasks.some((subtask) => subtask.id === taskId)) {
        return todo
      }
      const parentTodo = findParentTodo(todo.subtasks, taskId)
      if (parentTodo) {
        return parentTodo
      }
    }
  }
  return null
}

export const updateTaskList = (
  todos: TTodo[],
  updatedArray: TTodo[],
  parentId?: UniqueIdentifier,
): TTodo[] => {
  return todos.map((todo) => {
    if (todo.id === parentId) {
      return {
        ...todo,
        subtasks: updatedArray,
      }
    }
    if (todo.subtasks) {
      return {
        ...todo,
        subtasks: updateTaskList(todo.subtasks, updatedArray, parentId),
      }
    }
    return todo
  })
}

export const removeTask = (todos: TTodo[], taskId: UniqueIdentifier): TTodo[] => {
  return todos.filter((todo) => {
    if (todo.id === taskId) {
      return false
    }
    if (todo.subtasks) {
      todo.subtasks = removeTask(todo.subtasks, taskId)
    }
    return true
  })
}

export const updateTaskDescription = (
  todos: TTodo[],
  taskId: UniqueIdentifier,
  description: string,
): TTodo[] => {
  return todos.map((todo) => {
    if (todo.id === taskId) {
      return {
        ...todo,
        description,
      }
    }
    if (todo.subtasks) {
      return {
        ...todo,
        subtasks: updateTaskDescription(todo.subtasks, taskId, description),
      }
    }
    return todo
  })
}

export const completeTask = (todos: TTodo[], taskId: UniqueIdentifier): TTodo[] => {
  return todos.map((todo) => {
    if (todo.id === taskId) {
      return {
        ...todo,
        isCompleted: true,
      }
    }
    if (todo.subtasks) {
      return {
        ...todo,
        subtasks: completeTask(todo.subtasks, taskId),
      }
    }
    return todo
  })
}

export const handleAddUserActionToHistory = (
  currentHistory: TTodo[][],
  currentStateOfTodoList: TTodo[],
) => {
  const currentHistoryCopy = [...currentHistory]
  if (currentHistory.length === 20) {
    currentHistoryCopy.shift()
  }
  currentHistoryCopy.push(currentStateOfTodoList)
  return currentHistoryCopy
}
