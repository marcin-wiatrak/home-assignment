import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BoardInterface } from '../types'
import { RootState } from '../store.ts'
import { v4 as uuidv4 } from 'uuid'
import {
  completeTask,
  createSubtask,
  handleAddUserActionToHistory,
  removeTask,
  updateTaskDescription,
} from '../../utils.ts'
import { TTodo } from '../../types.ts'

const initialState: BoardInterface | Record<string, never> = {
  todoList: [],
  actionsHistory: [],
  currentStepBack: 1,
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
      state.actionsHistory = handleAddUserActionToHistory(state.actionsHistory, state.todoList)
    },
    addSubtask: (state, { payload }: PayloadAction<AddSubtaskPayload>) => {
      const task: TTodo = {
        id: `task-${uuidv4()}`,
        description: payload.description,
        isCompleted: false,
        subtasks: [],
      }
      state.todoList = createSubtask(state.todoList, payload.parentId, task)
      state.actionsHistory = handleAddUserActionToHistory(state.actionsHistory, state.todoList)
      state.currentStepBack = 1
    },
    removeTask: (state, { payload }: PayloadAction<RemoveTaskPayload>) => {
      const copyTodos = [...state.todoList]
      state.todoList = removeTask(copyTodos, payload.taskId)
      state.actionsHistory = handleAddUserActionToHistory(state.actionsHistory, state.todoList)
      state.currentStepBack = 1
    },
    updateTask: (state, { payload }: PayloadAction<UpdateTaskPayload>) => {
      const copyTodos = [...state.todoList]
      state.todoList = updateTaskDescription(copyTodos, payload.taskId, payload.description)
      state.actionsHistory = handleAddUserActionToHistory(state.actionsHistory, state.todoList)
      state.currentStepBack = 1
    },
    completeTask: (state, { payload }: PayloadAction<CompleteTaskPayload>) => {
      const copyTodos = [...state.todoList]
      state.todoList = completeTask(copyTodos, payload.taskId)
    },
    updateTasksList: (state, { payload }: PayloadAction<UpdateTasksListPayload>) => {
      state.todoList = payload.todoList
      state.actionsHistory = handleAddUserActionToHistory(state.actionsHistory, state.todoList)
      state.currentStepBack = 1
    },
    undoAction: (state) => {
      if (state.currentStepBack === state.actionsHistory.length) return
      state.currentStepBack = state.currentStepBack + 1
      state.todoList = state.actionsHistory[state.actionsHistory.length - state.currentStepBack]
    },
    redoAction: (state) => {
      if (state.currentStepBack === 1) return
      state.currentStepBack = state.currentStepBack - 1
      state.todoList = state.actionsHistory[state.actionsHistory.length - state.currentStepBack]
    },
    setActionsHistory: (state, { payload }: PayloadAction<TTodo[][]>) => {
      state.actionsHistory = payload
    },
    setTasksListFromLS: (state, { payload }: PayloadAction<TTodo[]>) => {
      state.todoList = payload
    },
  },
})

const getBoard = (state: RootState) => state.board

export const selectors = {
  selectTodos: createSelector(getBoard, (board) => board.todoList),
  selectActionsHistory: createSelector(getBoard, (board) => board.actionsHistory),
  selectCurrentStepBack: createSelector(getBoard, (board) => board.currentStepBack),
}

export const boardActions = boardSlice.actions
