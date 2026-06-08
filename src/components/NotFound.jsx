// NotFound.jsx - Rendered for any URL that does not match a defined route. Shows the invalid URL and links back to Home.
import { Link, useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <main className="not-found-page">
      <p className="not-found-code">404</p>
      <h1>Page Not Found</h1>
      {/* useLocation().pathname gives us the exact URL the user tried, making the error message specific and helpful. */}
      <p>The route "{location.pathname}" does not exist.</p>
      <Link className="button-link" to="/">
        Return to Home
      </Link>
    </main>
  );
}

export default NotFound;
