import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import ProductDetails from "./pages/products/ProductDetails";
import Protectedrouter from "./Protectedrouter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children:
      [
        {
          index: true,
          element: <Home />
        },
        {
          path: "products",
          element: <Products />
        },
        {
          path: "product/:id",
          element: <ProductDetails />
        },
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "cart",
          element:
          <Protectedrouter>
            <Cart />
          </Protectedrouter>
        }
      ]

  },
]);

export default router;