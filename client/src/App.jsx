import { Outlet, createBrowserRouter } from 'react-router-dom'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import AuthPage from './pages/AuthPage.jsx'
import ChannelPage from './pages/ChannelPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import VideoPlayerPage from './pages/VideoPlayerPage.jsx'

function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <div className="app-shell__body">
        <Sidebar />
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
