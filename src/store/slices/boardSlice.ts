import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { BoardInterface } from '../types'
import { TODOS } from '../../constants.ts'
import {RootState} from "../store.ts";
import {v4 as uuidv4} from 'uuid'
import {createSubtask} from "../../utils.ts";

const initialState: BoardInterface | Record<string, never> = {
  todoList: TODOS,
}

type AddSubtaskPayload = {
    parent_id: string
    description: string
}

type AddTopLevelTaskPayload = {
    description: string
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addTopLevelTask: (state, {payload}: PayloadAction<AddTopLevelTaskPayload>) => {
      const task = {
        id: uuidv4(),
        description: payload.description,
        isCompleted: false,
      }
      state.todoList.push(task)
    },
    addSubtask: (state, {payload}: PayloadAction<AddSubtaskPayload>) => {
        const task = {
            id: uuidv4(),
            description: payload.description,
            isCompleted: false,
        }
        state.todoList = createSubtask(state.todoList, payload.parent_id, task)
    }
  },
})

const getBoard = (state: RootState) => state.board

export const selectors = {
  selectTodos: createSelector(getBoard, (board) => board.todoList),
}

export const boardActions = boardSlice.actions