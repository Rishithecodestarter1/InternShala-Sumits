// Checkout.jsx - Collects user details via a dummy form, shows a cart summary, and places the order by clearing the cart and redirecting home.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, selectCartItems, selectCartTotal } from '../redux/cartSlice.js';

const initialFormData = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const [formData, setFormData] = useState(initialFormData);
  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;

    // Computed property names let one handler update any field that matches its name attribute.
    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  }

  function handlePlaceOrder(event) {
    event.preventDefault();
    setOrderPlaced(true);
    dispatch(clearCart());

    // 2-second delay before redirect gives the user time to read the confirmation message.
    setTimeout(() => navigate('/'), 2000);
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <section className="checkout-section empty-cart">
        <h1>Your cart is empty.</h1>
        <p>Add products before visiting checkout.</p>
        <Link className="button-link" to="/">
          Browse Products
        </Link>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Final step</p>
          <h1>Checkout</h1>
        </div>
      </div>

      {orderPlaced && (
        <div className="success-panel" role="status">
          Order placed successfully! Thank you for shopping with ShoppyGlobe.
        </div>
      )}

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          <label>
            Full Name
            <input name="name" type="text" value={formData.name} onChange={handleInputChange} required />
          </label>

          <label>
            Email
            <input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </label>

          <label>
            Phone
            <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
          </label>

          <label>
            Address
            <textarea name="address" value={formData.address} onChange={handleInputChange} required />
          </label>

          <button type="submit" disabled={orderPlaced}>
            Place Order
          </button>
        </form>

        <aside className="order-summary" aria-label="Order summary">
          <h2>Order Summary</h2>
          <div className="summary-lines">
            {items.map((item) => (
              <div className="summary-line" key={item.id}>
                <span>
                  {item.title} x {item.quantity}
                </span>
                <strong>${(item.price * item.quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
