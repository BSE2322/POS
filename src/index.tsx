//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import Products from './pages/products';
import Catalog from './pages/catalog';
import Selling from './pages/selling'
import {Receipt} from "./pages/receipt";
import "../src/assets/styles/style.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Catalog/>,
  },
  {
    path:"/manage-products",
    element: <Products/>
  },
  {
    path:"/sell-products",
    element: <Selling/>
  },
  {
    path:"/receipt",
    element:<Receipt/>
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
