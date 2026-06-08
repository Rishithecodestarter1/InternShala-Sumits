import { useState } from 'react'
import { Outlet, createBrowserRouter } from 'react-router-dom'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import AuthPage from './pages/AuthPage.jsx'
import ChannelPage from './pages/ChannelPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import VideoPlayerPage from './pages/VideoPlayerPage.jsx'

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-shell">
      <Header onMenuClick={() => setSidebarOpen((isOpen) => !isOpen)} />
      <div className="app-shell__body">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="app-shell__main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'watch/:videoId', element: <VideoPlayerPage /> },
      { path: 'channel/:channelId', element: <ChannelPage /> },
    ],
  },
  { path: '/auth', element: <AuthPage /> },
  { path: '*', element: <NotFoundPage /> },
])

export default Layout
