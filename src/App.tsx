import './App.scss'
import { WorkspacesSidebar } from './components/workspacesSidebar'
import { WorkspacesContent } from './components/workspacesContainer'

export const App = () => {
  return (
    <div className="container">
      <WorkspacesSidebar />
      <WorkspacesContent />
    </div>
  )
}
