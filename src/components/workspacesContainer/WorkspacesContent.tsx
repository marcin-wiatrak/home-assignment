import './WorkspacesContainer.scss'
import { useSelector } from 'react-redux'
import { selectors } from '../../store/slices'

export const WorkspacesContent = () => {
  const todos = useSelector(selectors.selectTodos)

  return (
    <div className="workspaces-container">
      <ul>
        {todos.map((todo) => (
          <li>{todo.description}</li>
        ))}
      </ul>
    </div>
  )
}
