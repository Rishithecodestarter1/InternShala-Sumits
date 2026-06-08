# ShoppyGlobe

ShoppyGlobe is a React e-commerce practice project built with the latest Vite this time I did not know that we have to use latest In calsses we used create Vite@7, React 18, Redux Toolkit, React Router v6, and vanilla CSS. It fetches products from DummyJSON, lets users search products, view product details, manage a Redux-powered cart, and complete a dummy checkout flow.

## Scaffold Commands

```bash
npm create vite@latest shoppyglobe -- --template react
cd shoppyglobe
npm install
npm install react@18.3.1 react-dom@18.3.1 react-router-dom@6.30.4 @reduxjs/toolkit react-redux prop-types
```

## Live Repository

Replace this placeholder with your public GitHub repository URL before submission:

https://github.com/your-username/shoppyglobe

## Tech Stack

- Vite latest
- React 18
- Redux Toolkit
- React Redux
- React Router v6 with `createBrowserRouter`
- PropTypes
- Vanilla CSS

## Setup Instructions

1. Clone the repository.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:5173` in the browser.

## Features

- Product listing fetched from `https://dummyjson.com/products`.
- Custom `useFetchProducts` hook with loading and error states.
- Redux search query that filters products by title.
- Product detail route using `/product/:id`.
- Redux cart actions for add, remove, increase, decrease, and clear.
- Cart badge showing total item quantity.
- Cart page with line totals and grand total.
- Checkout form with an order summary.
- Order placement message, cart clearing, and automatic redirect home.
- 404 page that shows the invalid route path.
- Route-level lazy loading with `React.lazy` and `Suspense`.
- Native image lazy loading with `loading="lazy"`.
- Responsive RGB-only CSS for desktop, tablet, and mobile screens.

## Folder Structure

```text
src/
  components/
    Header.jsx
    ProductList.jsx
    ProductItem.jsx
    ProductDetail.jsx
    Cart.jsx
    CartItem.jsx
    NotFound.jsx
    Checkout.jsx
  hooks/
    useFetchProducts.js
  redux/
    store.js
    cartSlice.js
  App.jsx
  main.jsx
  App.css
  index.css
```

## Git Commit Strategy

The assignment requires at least 25 meaningful commits. Make each commit after completing the matching task:

1. `init: scaffold project with latest Vite and install dependencies`
2. `setup: configure Redux store with cartSlice`
3. `feat: implement addToCart reducer and selector`
4. `feat: implement removeFromCart reducer`
5. `feat: implement increaseQuantity and decreaseQuantity reducers`
6. `feat: implement clearCart reducer for post-checkout`
7. `feat: implement setSearchQuery action for product search`
8. `setup: configure React Router with createBrowserRouter and Layout route`
9. `feat: build Header component with NavLink and cart count badge`
10. `feat: create useFetchProducts custom hook with loading and error states`
11. `feat: build ProductList component with custom hook and Redux search filter`
12. `feat: build ProductItem component with Add to Cart button and PropTypes`
13. `feat: add lazy loading to all product images for performance`
14. `feat: build ProductDetail component with dynamic route and useEffect fetch`
15. `feat: add error handling to ProductDetail fetch`
16. `feat: build Cart component with item list and total price`
17. `feat: build CartItem component with quantity controls and remove button`
18. `feat: build Checkout component with dummy form and order placement`
19. `feat: implement clearCart dispatch and navigate on Place Order`
20. `feat: build NotFound 404 page with useLocation pathname display`
21. `perf: wrap all route components with React.lazy and Suspense`
22. `style: add global reset, header, and card styles in App.css`
23. `style: add product grid layout and responsive breakpoints`
24. `style: add cart, checkout, and 404 page styles`
25. `docs: add README with GitHub link, setup instructions, and features list`

## Submission Note

`node_modules` is not included. Run `npm install` after cloning, and delete `node_modules` before zipping or submitting the project folder.
