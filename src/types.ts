export type TTodo = {
  id: string
  description: string
  isCompleted: boolean
  subtasks: TTodo[]
}

export type TMenuItem = {
  id: string
  title: string
  icon: () => JSX.Element
}
