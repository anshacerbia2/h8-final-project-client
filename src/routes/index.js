import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage"
// import DetailPage from '../pages/DetailPage'
import Template from "../components/Template";
import LoginPage from "../pages/LoginPage";
import DetailPage from "../pages/DetailPage";
import DashboardCustomer from "../pages/DashboardCustomer";
import CartPage from "../pages/CartPage";
import DashboardAdmin from "../pages/DashboardAdmin";
import ProductListPage from "../pages/ProductListPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Template />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'product',
        element: <DetailPage />
      },
      {
        path: 'dashboard-customer',
        element: <DashboardCustomer />
      },
      {
        path: 'dashboard-admin',
        element: <DashboardAdmin />
      },
      {
        path: "cart",
        element: <CartPage />
      },
      {
        path: "products",
        element: <ProductListPage />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />,
  }
]);

export default router