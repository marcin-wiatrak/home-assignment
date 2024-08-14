import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BoardInterface } from '../types'
import { TODOS } from '../../constants.ts'
import { RootState } from '../store.ts'
import { v4 as uuidv4 } from 'uuid'
import { completeTask, createSubtask, removeTask, updateTaskDescription } from '../../utils.ts'
import { TTodo } from '../../types.ts'

const initialState: BoardInterface | Record<string, never> = {
  todoList: TODOS,
}

type AddSubtaskPayload = {
  parentId: string
  description: string
}

type AddTopLevelTaskPayload = {
  description: string
}

type UpdateTasksListPayload = {
  todoList: TTodo[]
}

type RemoveTaskPayload = {
  taskId: string
}

type UpdateTaskPayload = {
  taskId: string
  description: string
}

type CompleteTaskPayload = {
  taskId: string
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTopLevelTask: (state, { payload }: PayloadAction<AddTopLevelTaskPayload>) => {
      const task: TTodo = {
        id: `task-${uuidv4()}`,
        description: payload.description,
        isCompleted: false,
        subtasks: [],
      }
      state.todoList.push(task)
    },
    addSubtask: (state, { payload }: PayloadAction<AddSubtaskPayload>) => {
      const task: TTodo = {
        id: `task-${uuidv4()}`,
        description: payload.description,
        isCompleted: false,
        subtasks: [],
      }
      state.todoList = createSubtask(state.todoList, payload.parentId, task)
    },
    removeTask: (state, { payload }: PayloadAction<RemoveTaskPayload>) => {
      const copyTodos = [...state.todoList]
      state.todoList = removeTask(copyTodos, payload.taskId)
    },
    updateTask: (state, { payload }: PayloadAction<UpdateTaskPayload>) => {
      const copyTodos = [...state.todoList]
      state.todoList = updateTaskDescription(copyTodos, payload.taskId, payload.description)
    },
    completeTask: (state, { payload }: PayloadAction<CompleteTaskPayload>) => {
      const copyTodos = [...state.todoList]
      state.todoList = completeTask(copyTodos, payload.taskId)
    },
    updateTasksList: (state, { payload }: PayloadAction<UpdateTasksListPayload>) => {
      state.todoList = payload.todoList
    },
  },
})

const getBoard = (state: RootState) => state.board

export const selectors = {
  selectTodos: createSelector(getBoard, (board) => board.todoList),
}

export const boardActions = boardSlice.actions
