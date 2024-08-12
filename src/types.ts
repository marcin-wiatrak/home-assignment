export type TTodo = {
  id: string
  description: string
  isCompleted: boolean
  subtasks?: TTodo[]
}
