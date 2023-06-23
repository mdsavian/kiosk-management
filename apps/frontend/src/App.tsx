import * as React from "react";
import "./App.css";
import KioskPage from "./pages/KioskPage";
import ProductsPage from "./pages/ProductsPage";
import SnackbarProvider from "./components/common/SnackBar/SnackbarProvider";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import CartPage from "./pages/CartPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <KioskPage />,
    },
    {
      path: "products",
      element: (
        <RecoilRoot>
          <ProductsPage />
        </RecoilRoot>
      ),
    },
    {
      path: "cart",
      element: (
        <RecoilRoot>
          <CartPage />
        </RecoilRoot>
      ),
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
