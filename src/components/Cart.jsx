// Cart.jsx - Displays all items currently in the Redux cart. Shows total price and links to Checkout.
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from './CartItem.jsx';
import { selectCartItems, selectCartTotal } from '../redux/cartSlice.js';

function Cart() {
  const items = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <section className="cart-section empty-cart">
        <h1>Your cart is empty.</h1>
        <p>Start shopping to add products to your cart.</p>
        <Link className="button-link" to="/">
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your picks</p>
          <h1>Shopping Cart</h1>
        </div>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <p>Total</p>
        <strong>${cartTotal.toFixed(2)}</strong>
        <Link className="button-link" to="/checkout">
          Proceed to Checkout
        </Link>
      </div>
    </section>
  );
}

export default Cart;
