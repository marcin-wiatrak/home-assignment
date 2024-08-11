import './TodoListItem.scss'
import { EditIcon, DeleteIcon } from '../../../assets/icons'

type TTodoListItemProps = {
    todo: TTodo
}


export const TodoListItem = ({todo}: TTodoListItemProps) => {
  return (
    <div className="todo-list-item-container">
      <div className="todo-list-item-content">
        <div className="todo-list-item-description">
          <p>{todo.description}</p>
        </div>
      </div>
      <div className="todo-list-item-actions">
        <EditIcon />
        <DeleteIcon />
      </div>
    </div>
  )
}
