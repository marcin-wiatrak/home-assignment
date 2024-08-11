import './TodoList.scss'
import { TodoListItem } from './todoListItem'

type TTodoListProps = {
  todos: TTodo[]
}

export const TodoList = ({ todos }: TTodoListProps) => {
  return (
    <div className="todo-list-container">
      {todos.map((todo) => (
        <TodoListItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
