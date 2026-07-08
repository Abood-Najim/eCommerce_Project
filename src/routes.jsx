import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Cart from "./pages/cart/Cart";
import UserContextProvider from "./context/UserContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: 
    [
      {
        index:true,
        element: <Home />
      },
      {
        path:"products",
        element: <Products/>
      },
      {
        path:"login",
        element:<Login />
      },
      {
        path:"register",
        element:<Register />
      },
      {
        path:"cart",
        element:
        <UserContextProvider> 
          <Cart />              
        </UserContextProvider>
      } /*  this is how i take the permission and using context is the worst thing you ever do  */
    ]

  },
]);

export default router;