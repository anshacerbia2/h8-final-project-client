import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage"
// import DetailPage from '../pages/DetailPage'
import Template from "../components/Template";
import LoginPage from "../pages/LoginPage";
import DetailPage from "../pages/DetailPage";
import CartPage from "../pages/CartPage";
import Register from "../pages/Register";
import ProductListPage from "../pages/ProductListPage";
import Dashboard from "../pages/Dashboard";
import DashboardSettings from "../components/DashboardSettings";

import DashboardAddress from "../components/DashboardAddress";
import DashboardProducts from "../components/DashboardProducts";
import DashboardCart from "../components/DashboardCart";
import DashboardHistory from "../components/DashboardHistory";
import AllProducts from "../pages/AllProducts";
import Auction from "../pages/Auction";
import ChatPage from "../pages/ChatPage";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      //testing chat
      {
        path: '/chat/:id',
        element: <ChatPage />
      },
      //testing chat
      {
        path: 'product/:id',
        element: <DetailPage />
      },
      {
        path: '/all-products',
        element: <AllProducts />
      },
      {
        path: '/auction',
        element: <Auction />
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
          {
            path: "settings",
            element: <DashboardSettings />
          },
          {
            path: "address",
            element: <DashboardAddress />
          },
          {
            path: "cart",
            element: <DashboardCart />
          },
          {
            path: "products",
            element: <DashboardProducts />
          },
          {
            path: "history",
            element: <DashboardHistory />
          }
        ]
      },
    ]
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <Register />,
  }
]);

export default router