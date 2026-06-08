// App.jsx - Defines the modern React Router setup and lazy-loads every route component.
import React, { Suspense } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css';

/*
  React.lazy() enables code splitting. Each route component gets downloaded only
  when the user first visits that route, which reduces the first page load size.
*/
const Header = React.lazy(() => import('./components/Header.jsx'));
const ProductList = React.lazy(() => import('./components/ProductList.jsx'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail.jsx'));
const Cart = React.lazy(() => import('./components/Cart.jsx'));
const Checkout = React.lazy(() => import('./components/Checkout.jsx'));
const NotFound = React.lazy(() => import('./components/NotFound.jsx'));

function Layout() {
  return (
    <>
      <Header />
      <main className="page-shell">
        {/* Outlet is where React Router renders the child route that matches the URL. */}
        <Outlet />
      </main>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <ProductList /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    // Suspense catches lazy-loaded components while their JS bundle is downloading and shows the fallback.
    <Suspense fallback={<div className="loading-screen">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
