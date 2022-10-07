import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage"
// import DetailPage from '../pages/DetailPage'
import Template from "../components/Template";
import LoginPage from "../pages/LoginPage";
import DetailPage from "../pages/DetailPage";

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
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />,
  }
]);

export default router