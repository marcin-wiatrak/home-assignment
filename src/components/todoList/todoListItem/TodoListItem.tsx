import './TodoListItem.scss'
import { EditIcon, DeleteIcon } from '../../../assets/icons'
import { TTodo } from '../../../types.ts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { AddCardButton } from '../../addCardButton'
import { useDispatch } from 'react-redux'
import { boardActions } from '../../../store/slices'
import { CompleteTaskButton } from '../../completeTaskButton'
import clsx from 'clsx'
import { useEffect } from 'react'

type TTodoListItemProps = {
  todo: TTodo
  onOpenModal: (taskId: string) => void
  onModifyTask: (id: string, description: string) => void
}

export const TodoListItem = ({ todo, onOpenModal, onModifyTask }: TTodoListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo.id })
  const dispatch = useDispatch()

  const handleRemoveTask = () => {
    dispatch(boardActions.removeTask({ taskId: todo.id }))
  }

  const handleCompleteTask = () => {
    dispatch(boardActions.completeTask({ taskId: todo.id }))
  }

  useEffect(() => {
    if (todo.isCompleted) {
      setTimeout(() => {
        dispatch(boardActions.removeTask({ taskId: todo.id }))
      }, 3700)
    }
  }, [dispatch, todo.id, todo.isCompleted])

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }
  return (
    <div className={clsx('todo-list-item-wrapper', todo.isCompleted && 'slide-out-animation')}>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className={clsx('todo-list-item-container', todo.isCompleted ? 'completed' : '')}
      >
        <div className="todo-list-item-content">
          <div className="todo-list-item-description">
            <p>{todo.description}</p>
          </div>
        </div>
        <div className="todo-list-item-actions">
          <div
            className="todo-list-item-actions-button"
            onClick={() => onModifyTask(todo.id, todo.description)}
          >
            <EditIcon />
          </div>
          <div onClick={handleRemoveTask} className="todo-list-item-actions-button">
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'todo-list-item-add-subtask-container',
          todo.isCompleted && 'task-complete',
        )}
      >
        <AddCardButton onClick={() => onOpenModal(todo.id)} />
        <CompleteTaskButton onClick={handleCompleteTask} taskDone={todo.isCompleted} />
      </div>
    </div>
  )
}
