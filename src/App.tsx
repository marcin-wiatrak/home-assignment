import './App.scss'
import { WorkspacesSidebar } from './components/workspacesSidebar'
import { WorkspacesContent } from './components/workspacesContainer'

export const App = () => {
  return (
    <>
      <div className="mobile-warning">
        <p>Mobile version is not supported yet. Please use desktop version.</p>
      </div>
      <div className="container">
        <WorkspacesSidebar />
        <WorkspacesContent />
      </div>
    </>
  )
}
