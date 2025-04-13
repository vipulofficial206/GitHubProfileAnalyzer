import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import RepoPage from './Pages/RepoPage'
import Commits from './Pages/Commits'

function App() {
  return (
    <div className="min-h-screen ">
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/Repo" element={<RepoPage/>} />
  <Route path="/Commits" element={<Commits/>} />
</Routes>
    </div>
  )
}

export default App
