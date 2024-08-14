export type TTodo = {
  id: string
  description: string
  isCompleted: boolean
  subtasks: TTodo[]
  parentId?: string
}

export type TMenuItem = {
  id: string
  title: string
  icon: () => JSX.Element
}
