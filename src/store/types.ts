import { TTodo } from '../types.ts'

export interface BoardInterface {
  todoList: TTodo[]
  actionsHistory: TTodo[][]
  currentStepBack: number
}
