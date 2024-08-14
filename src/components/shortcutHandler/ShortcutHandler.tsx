import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { boardActions, selectors } from '../../store/slices'

type TShortcutHandlerProps = {
  onUndo: () => void
  onRedo: () => void
}

export const ShortcutHandler = ({ onUndo, onRedo }: TShortcutHandlerProps) => {
  const dispatch = useDispatch()
  const todos = useSelector(selectors.selectTodos)

  useEffect(() => {
    dispatch(boardActions.setActionsHistory([todos]))
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case 'z':
            event.preventDefault()
            onUndo()
            break
          case 'y':
            event.preventDefault()
            onRedo()
            break
          default:
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onUndo, onRedo])

  return null
}
