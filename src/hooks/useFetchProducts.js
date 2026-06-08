// useFetchProducts.js - Custom hook that fetches all products from the DummyJSON API and manages loading and error states.
import { useEffect, useState } from 'react';

function useFetchProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products');

        if (!response.ok) {
          throw new Error('Failed to load products. The server returned an error.');
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
      } finally {
        // finally always runs, ensuring loading spinner is dismissed whether the fetch succeeded or failed.
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

export default useFetchProducts;
