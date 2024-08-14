import './WorkspacesContainer.scss'
import { useDispatch, useSelector } from 'react-redux'
import { boardActions, selectors } from '../../store/slices'
import { TodoList } from '../todoList'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { findParentTodo, findTaskIndex, updateTaskList } from '../../utils.ts'
import { ShortcutHandler } from '../shortcutHandler'

export const WorkspacesContent = () => {
  const dispatch = useDispatch()
  const todos = useSelector(selectors.selectTodos)
  const history = useSelector(selectors.selectActionsHistory)
  const currentStepBack = useSelector(selectors.selectCurrentStepBack)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const copyTodos = [...todos]
    const { active, over } = event
    if (!active || !over) return
    if (active.id === over.id) return

    const activeTodoIndex = findTaskIndex(todos, active.id)
    const overTodoIndex = findTaskIndex(todos, over.id)
    const parentTask = findParentTodo(todos, active.id)
    if (!parentTask || !parentTask.subtasks) {
      const todosToUpdate = arrayMove(copyTodos, activeTodoIndex, overTodoIndex)
      dispatch(boardActions.updateTasksList({ todoList: todosToUpdate }))
      return
    } else {
      const todosToUpdate = arrayMove(parentTask.subtasks, activeTodoIndex, overTodoIndex)
      const updatedTodos = updateTaskList(copyTodos, todosToUpdate, parentTask.id)
      dispatch(boardActions.updateTasksList({ todoList: updatedTodos }))
    }
  }

  const handleUndoAction = () => {
    dispatch(boardActions.undoAction())
  }

  const handleRedoAction = () => {
    dispatch(boardActions.redoAction())
  }

  console.log('history', currentStepBack, history.length, history)

  return (
    <div className="workspaces-container">
      <ShortcutHandler onUndo={handleUndoAction} onRedo={handleRedoAction} />
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <TodoList todos={todos} />
      </DndContext>
    </div>
  )
}
