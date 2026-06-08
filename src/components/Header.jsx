// Header.jsx - Sticky navigation bar shown on all pages inside the Layout route. Shows cart item count badge.
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItemCount } from '../redux/cartSlice.js';

function Header() {
  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <header className="site-header">
      <NavLink className="brand-link" to="/">
        🛒 ShoppyGlobe
      </NavLink>

      <nav className="main-nav" aria-label="Primary navigation">
        {/* NavLink adds an active class automatically when the link matches the current route. */}
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink className="cart-link" to="/cart">
          Cart
          <span className="cart-badge" aria-label={`${cartItemCount} items in cart`}>
            {cartItemCount}
          </span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
