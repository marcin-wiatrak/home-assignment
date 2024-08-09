import {createSelector, createSlice} from '@reduxjs/toolkit'
import { BoardInterface } from '../types'
import { TODOS } from '../../constants.ts'
import {RootState} from "../store.ts";

const initialState: BoardInterface | Record<string, never> = {
  todoList: TODOS,
}

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
})

const getBoard = (state: RootState) => state.board

export const selectors = {
  selectTodos: createSelector(getBoard, (board) => board.todoList),
}

export const {} = boardSlice.actions
