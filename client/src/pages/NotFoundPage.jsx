// NotFoundPage.jsx - Displayed for URLs that do not match a defined route.
import { Link, useLocation } from 'react-router-dom'

function NotFoundPage() {
  const location = useLocation()

  return (
    <main className="not-found-page">
      <h1>404</h1>
      <p>Page Not Found</p>
      <p>The path "{location.pathname}" does not exist.</p>
      <Link className="primary-button" to="/">
        Go back to Home
      </Link>
    </main>
  )
}

export default NotFoundPage
