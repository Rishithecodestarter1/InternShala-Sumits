// ProductItem.jsx - Represents a single product card. Receives a product via props and dispatches addToCart to Redux on button click.
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice.js';

function ProductItem({ product }) {
  const dispatch = useDispatch();

  function handleAddToCart() {
    // Sending the full product object lets the reducer store the product details plus a quantity field.
    dispatch(addToCart(product));
  }

  return (
    <article className="product-card">
      <Link className="product-image-link" to={`/product/${product.id}`} aria-label={`View ${product.title}`}>
        <img
          src={product.thumbnail}
          alt={product.title}
          // loading="lazy" defers image download until the card is near the viewport, improving initial page performance.
          loading="lazy"
        />
      </Link>

      <div className="product-card-body">
        <Link className="product-title-link" to={`/product/${product.id}`}>
          <h2>{product.title}</h2>
        </Link>
        <p className="rating">Rating: {product.rating}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <button type="button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

// Props: { product: { id, title, price, thumbnail, rating } }
ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;
