import './TodoList.scss'
import { TodoListItem } from './todoListItem'
import { AddCardButton } from '../addCardButton'
import { TTodo } from '../../types.ts'
import { useDispatch } from 'react-redux'
import { boardActions } from '../../store/slices'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React, { useState } from 'react'
import { TaskDetailsModal } from '../taskDetailsModal/TaskDetailsModal.tsx'
import { useDisclose } from '../../hooks/useDisclose.tsx'

type TTodoListProps = {
  todos: TTodo[]
  parentId?: string
}

export const TodoList = ({ todos, parentId }: TTodoListProps) => {
  const [taskToEdit, setTaskToEdit] = useState<{ taskId: string; description: string } | null>(null)
  const [newTaskParentId, setNewTaskParentId] = useState<string>('')
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclose()

  const handleCreateTask = (description: string) => {
    if (newTaskParentId ?? parentId) {
      dispatch(boardActions.addSubtask({ parentId: newTaskParentId ?? parentId, description }))
      setNewTaskParentId('')
      return
    }
    dispatch(boardActions.addTopLevelTask({ description }))
  }

  const handleOpenModifyTaskModal = (taskId?: string, description?: string) => {
    if (taskId && description) setTaskToEdit({ taskId, description })
    onOpen()
  }

  const handleOpenNewTaskModal = (parentId?: string) => {
    if (parentId) setNewTaskParentId(parentId)
    onOpen()
  }

  const handleCloseModal = () => {
    setTaskToEdit(null)
    onClose()
  }

  const handleModifyTask = (description: string) => {
    if (!taskToEdit) return
    dispatch(boardActions.updateTask({ taskId: taskToEdit.taskId, description }))
  }

  const handleModalConfirm = taskToEdit?.taskId ? handleModifyTask : handleCreateTask

  return (
    <>
      <div className="todo-list-container">
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((todo) => (
            <React.Fragment key={todo.id}>
              {todo.subtasks && todo.subtasks?.length > 0 ? (
                <>
                  <TodoListItem
                    key={todo.id}
                    todo={todo}
                    onOpenModal={handleOpenNewTaskModal}
                    onModifyTask={handleOpenModifyTaskModal}
                  />
                  <TodoList todos={todo.subtasks} parentId={todo.id} />
                </>
              ) : (
                <TodoListItem
                  key={todo.id}
                  todo={todo}
                  onOpenModal={handleOpenNewTaskModal}
                  onModifyTask={handleOpenModifyTaskModal}
                />
              )}
            </React.Fragment>
          ))}
        </SortableContext>
        <AddCardButton onClick={onOpen} />
      </div>
      <TaskDetailsModal
        isOpen={isOpen}
        onConfirm={handleModalConfirm}
        onClose={handleCloseModal}
        taskToEdit={taskToEdit}
      />
    </>
  )
}
