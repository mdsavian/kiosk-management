import * as React from "react";
import "./App.css";
import KioskPage from "./pages/KioskPage";
import ProductsPage from "./pages/ProductsPage";
import SnackbarProvider from "./components/common/SnackBar/SnackbarProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <KioskPage />,
    },
    {
      path: "products",
      element: <ProductsPage />,
    },
    {
      path: "cart",
      element: <div>Cart</div>,
    },
  ]);

  return (
    <div className="container">
      <SnackbarProvider>
        <RouterProvider router={router} />
      </SnackbarProvider>
    </div>
  );
}

export default App;
