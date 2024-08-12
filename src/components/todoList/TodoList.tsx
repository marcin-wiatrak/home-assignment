import './TodoList.scss'
import { TodoListItem } from './todoListItem'
import { AddCardButton } from '../addCardButton'
import { TTodo } from '../../types.ts'

type TTodoListProps = {
  todos: TTodo[]
}

export const TodoList = ({ todos }: TTodoListProps) => {
  return (
    <div className="todo-list-container">
      {todos.map((todo) => (
        <>
          {todo.subtasks && todo.subtasks?.length > 0 ? (
            <TodoList todos={todo.subtasks} />
          ) : (
            <TodoListItem key={todo.id} todo={todo} />
          )}
        </>
      ))}
      <AddCardButton onClick={() => console.log('test click')} />
    </div>
  )
}
