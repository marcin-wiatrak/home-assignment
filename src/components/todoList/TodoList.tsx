import './TodoList.scss'
import { TodoListItem } from './todoListItem'
import { AddCardButton } from '../addCardButton'
import { TTodo } from '../../types.ts'
import { useDispatch } from 'react-redux'
import { boardActions } from '../../store/slices'

type TTodoListProps = {
  todos: TTodo[]
  parentId?: string
}

export const TodoList = ({ todos, parentId }: TTodoListProps) => {
  const dispatch = useDispatch()

  const handleCreateTask = (description: string) => {
    if (parentId) {
      dispatch(boardActions.addSubtask({ parent_id: parentId, description }))
      return
    }
    dispatch(boardActions.addTopLevelTask({ description }))
  }

  return (
    <div className="todo-list-container">
      {todos.map((todo) => (
        <>
          {todo.subtasks && todo.subtasks?.length > 0 ? (
            <TodoList todos={todo.subtasks} parentId={todo.id} />
          ) : (
            <TodoListItem key={todo.id} todo={todo} />
          )}
        </>
      ))}
      <AddCardButton onClick={() => handleCreateTask('temporary task')} />
    </div>
  )
}
