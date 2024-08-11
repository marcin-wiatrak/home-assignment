import './WorkspacesContainer.scss'
import { useSelector } from 'react-redux'
import { selectors } from '../../store/slices'
import { TodoList } from '../todoList'

export const WorkspacesContent = () => {
  const todos = useSelector(selectors.selectTodos)

  return (
    <div className="workspaces-container">
      <TodoList todos={todos} />
    </div>
  )
}
