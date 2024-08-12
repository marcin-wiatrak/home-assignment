import './AddCardButton.scss'
import { AddIcon } from '../../assets/icons/Add.tsx'

type TAddCardButtonProps = {
    onClick: () => void
}

export const AddCardButton = ({onClick}: TAddCardButtonProps) => {
  return (
    <div className="add-card-button-container" onClick={onClick}>
        <AddIcon />
        <p>Add a card</p>
    </div>
  )
}
