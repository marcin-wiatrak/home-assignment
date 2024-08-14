import './WorkspaceNavigation.scss'
import { WorkspacesNavigationItem } from './workspacesNavigationItem'
import { MENU_ITEMS } from '../../constants.ts'

export const WorkspaceNavigation = () => {
  return (
    <div className="workspaces-navigation-container">
      {MENU_ITEMS.map((item) => (
        <WorkspacesNavigationItem item={item} />
      ))}
    </div>
  )
}
