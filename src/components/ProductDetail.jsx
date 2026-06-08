// ProductDetail.jsx - Fetches and displays full details for one product using its ID from the dynamic URL route parameter.
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice.js';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductDetail() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);

        if (!response.ok) {
          throw new Error('Product not found. Please choose another product.');
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setProduct(null);
        setError(err.message);
      } finally {
        // finally always runs, so the loading message disappears after success or failure.
        setLoading(false);
      }
    }

    fetchProductDetail();
    // [id] dependency means re-fetching triggers automatically if the user navigates to a different product.
  }, [id]);

  function handleAddToCart() {
    // The same addToCart reducer handles products added from both the card and detail page.
    dispatch(addToCart(product));
  }

  if (loading) {
    return <div className="loading-panel">Loading product details...</div>;
  }

  if (error) {
    return (
      <section className="detail-section">
        <Link className="back-link" to="/">
          Back to Products
        </Link>
        <div className="error-panel" role="alert">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="detail-section">
      <Link className="back-link" to="/">
        Back to Products
      </Link>

      <div className="detail-layout">
        <div className="detail-gallery">
          {product.images.map((imageUrl) => (
            <img
              key={imageUrl}
              src={imageUrl}
              alt={`${product.title} product view`}
              // Native browser lazy loading - defers image fetch until the element enters the viewport.
              loading="lazy"
            />
          ))}
        </div>

        <div className="detail-copy">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="detail-description">{product.description}</p>
          <p className="price detail-price">${product.price.toFixed(2)}</p>
          <dl className="product-facts">
            <div>
              <dt>Rating</dt>
              <dd>{product.rating}</dd>
            </div>
            <div>
              <dt>Stock</dt>
              <dd>{product.stock}</dd>
            </div>
            <div>
              <dt>Brand</dt>
              <dd>{product.brand || 'Not listed'}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{product.category}</dd>
            </div>
          </dl>
          <button type="button" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
