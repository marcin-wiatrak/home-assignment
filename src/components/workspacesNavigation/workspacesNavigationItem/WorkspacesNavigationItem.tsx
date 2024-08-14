import './WorkspacesNavigationItem.scss'
import { TMenuItem } from '../../../types.ts'

type WorkspacesNavigationItemProps = {
  item: TMenuItem
}

export const WorkspacesNavigationItem = ({ item }: WorkspacesNavigationItemProps) => {
  const Icon = item.icon
  return (
    <div className="workspaces-navigation-item-container">
      <Icon />
      <p>{item.title}</p>
    </div>
  )
}
