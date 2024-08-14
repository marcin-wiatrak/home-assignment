import './TaskDetailsModal.scss'
import { InputHTMLAttributes, useEffect, useState } from 'react'

type TaskDetailsModalProps = {
  inputProps?: InputHTMLAttributes<HTMLInputElement>
  onConfirm: (taskName: string) => void
  isOpen: boolean
  onClose: () => void
  taskToEdit: {
    taskId?: string
    description?: string
  } | null
}

export const TaskDetailsModal = ({
  inputProps,
  onConfirm,
  isOpen,
  onClose,
  taskToEdit,
}: TaskDetailsModalProps) => {
  const [taskName, setTaskName] = useState('')
  const isEditing = !!taskToEdit?.taskId

  const handleConfirm = () => {
    onConfirm(taskName)
    setTaskName('')
    onClose()
  }

  const handleCloseModal = () => {
    setTaskName('')
    onClose()
  }

  useEffect(() => {
    if (taskToEdit?.description) {
      setTaskName(taskToEdit.description)
    }
  }, [taskToEdit?.description])

  if (!isOpen) return null
  return (
    <div className="new-task-modal-overlay">
      <div className="new-task-modal">
        <div className="new-task-modal-header">
          <h3>{isEditing ? 'Modify task' : 'Add new task'}</h3>
        </div>
        <div className="new-task-modal-body">
          <p>Todo title</p>
          <input
            autoFocus
            {...inputProps}
            value={taskName}
            onChange={({ target }) => setTaskName(target.value)}
          />
        </div>
        <div className="new-task-modal-actions">
          <button className="new-task-modal-actions-button cancel" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="new-task-modal-actions-button confirm" onClick={handleConfirm}>
            {isEditing ? 'Save changes' : 'Add task'}
          </button>
        </div>
      </div>
    </div>
  )
}
