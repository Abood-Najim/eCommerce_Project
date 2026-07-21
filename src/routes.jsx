import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import ProductDetails from "./pages/products/ProductDetails";
import Protectedrouter from "./Protectedrouter";
import Checkout from "./pages/checkout/Checkout";
import ProfileLayout from "./pages/profile/ProfileLayout";
import ProfileInfo from "./pages/profile/ProfileInfo";
import ProfileOrders from "./pages/profile/ProfileOrders";
import ResetPassword from "./pages/forgotPassword/ResetPassword";
import VerifyCode from "./pages/verifyCode/VerifyCode";
import SetNewPassword from "./pages/setNewPass/SetNewPassword";
import Categories from "./pages/categories/Categories";

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
          path: "categories",
          element: <Categories />
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
          path: "resetPassword",
          element:
            <ResetPassword />
        },
        {
          path: "verifyCode",
          element:
            <VerifyCode />
        },
        {
          path: "setNewPass",
          element:
            <SetNewPassword />
        },
        {
          path: "profile",
          element:
            <Protectedrouter>
              <ProfileLayout />
            </Protectedrouter>,
          children: [
            {
              index: true,
              element: <ProfileInfo />
            },
            {
              path: 'orders',
              element: <ProfileOrders />
            }
          ]

        },
        {
          path: "cart",
          element:
            <Protectedrouter>
              <Cart />
            </Protectedrouter>
        },
        {
          path: "checkout",
          element:
            <Protectedrouter>
              <Checkout />
            </Protectedrouter>
        }
      ]

  },
]);

export default router;