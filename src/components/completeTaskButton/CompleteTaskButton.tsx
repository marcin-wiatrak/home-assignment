import './CompleteTaskButton.scss'
import { DoneIcon } from '../../assets/icons/Done.tsx'
import clsx from 'clsx'

type TAddCardButtonProps = {
  onClick: () => void
  taskDone: boolean
}

export const CompleteTaskButton = ({ onClick, taskDone }: TAddCardButtonProps) => {
  return (
    <div
      className={clsx('complete-task-button-container', taskDone && 'task-done-animation')}
      onClick={onClick}
    >
      <DoneIcon />
      <p>{taskDone ? 'Task completed!' : 'Complete task'}</p>
    </div>
  )
}
