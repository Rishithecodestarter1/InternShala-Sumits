// CartItem.jsx - Represents one item in the cart. Dispatches quantity and removal actions to Redux.
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/cartSlice.js';

function CartItem({ item }) {
  const dispatch = useDispatch();
  const lineTotal = item.price * item.quantity;

  return (
    <article className="cart-item">
      <img
        src={item.thumbnail}
        alt={item.title}
        // Native browser lazy loading - defers image fetch until the element enters the viewport.
        loading="lazy"
      />

      <div className="cart-item-details">
        <h2>{item.title}</h2>
        <p>${item.price.toFixed(2)} each</p>
        <strong>${lineTotal.toFixed(2)}</strong>
      </div>

      <div className="quantity-controls" aria-label={`Change quantity for ${item.title}`}>
        <button
          type="button"
          className={item.quantity === 1 ? 'muted-button' : ''}
          onClick={() => dispatch(decreaseQuantity(item.id))}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button type="button" onClick={() => dispatch(increaseQuantity(item.id))}>
          +
        </button>
      </div>

      {/* The reducer enforces a minimum of 1, while Remove deletes the item intentionally. */}
      <button type="button" className="remove-button" onClick={() => dispatch(removeFromCart(item.id))}>
        Remove
      </button>
    </article>
  );
}

// Props: { item: { id, title, price, thumbnail, quantity } }
CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
