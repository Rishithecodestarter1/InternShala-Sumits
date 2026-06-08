// ProductList.jsx - Home page. Fetches products via custom hook, reads search query from Redux, and renders a grid of ProductItem cards.
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from './ProductItem.jsx';
import useFetchProducts from '../hooks/useFetchProducts.js';
import { selectSearchQuery, setSearchQuery } from '../redux/cartSlice.js';

function ProductList() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const { products, loading, error } = useFetchProducts();

  /*
    The custom hook fetches from the API first. Then the Redux search query
    filters that already-fetched list in the browser as the user types.
  */
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  function handleSearchChange(event) {
    // The search query lives in Redux (not local state) so it persists if the user navigates away and comes back.
    dispatch(setSearchQuery(event.target.value));
  }

  if (loading) {
    return <div className="loading-panel">Loading products...</div>;
  }

  if (error) {
    return (
      // Error is displayed in the UI so the user gets clear feedback without a disruptive browser alert.
      <div className="error-panel" role="alert">
        {error}
      </div>
    );
  }

  return (
    <section className="product-list-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Fresh picks</p>
          <h1>Shop products around the globe</h1>
        </div>

        <label className="search-label" htmlFor="product-search">
          Search products
          <input
            id="product-search"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title..."
          />
        </label>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="empty-state">No products match your search.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
