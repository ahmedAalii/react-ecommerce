import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import CounterContextProvider from "./Context/CounterContext";
import CartContextProvider from "./Context/CartContext";
import WihlistsContextProvider from "./Context/WishlistContext";
import UserContextProvider from "./Context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Checkout from './components/Checkout/Checkout';


//  Lazy Load Components
const Layout = lazy(() => import("./components/Layout/Layout"));
const Home = lazy(() => import("./components/Home/Home"));
const Products = lazy(() => import("./components/Products/Products"));
const Cart = lazy(() => import("./components/Cart/Cart"));
const Brands = lazy(() => import("./components/Brands/Brands"));
const Categories = lazy(() => import("./components/Categories/Categories"));
const Register = lazy(() => import("./components/Register/Register"));
const Login = lazy(() => import("./components/Login/Login"));
const Notfound = lazy(() => import("./components/Notfound/Notfound"));
const ProductDetails = lazy(() => import("./components/ProductDetails/ProductDetails"));
const CategoryDetails = lazy(() => import("./components/CategoryDetails/CategoryDetails"));
const BrandsDetails = lazy(() => import("./components/BrandsDetails/BrandsDetails"));
const ProductsDetails = lazy(() => import("./components/ProductsDetails/ProductsDetails"));
const WishList = lazy(() => import("./components/WishList/WishList"));
const ForgotPass = lazy(() => import("./components/ForgotPass/ForgotPass"));
const VerifyResetCode = lazy(() => import("./components/VerifyResetCode/VerifyResetCode"));
const ResetPassword = lazy(() => import("./components/reset-password/reset-password"));
const AddAddress = lazy(() => import("./components/Addadress/Addadress"));
const GetAddressById = lazy(() => import("./components/GetAddressById/GetAddressById"));

let query = new QueryClient();

let router = createBrowserRouter([
  {
    path: "",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: <ProtectedRoute> <Home /> </ProtectedRoute> },
      { path: "products", element: <ProtectedRoute> <Products /> </ProtectedRoute> },
      { path: "add-address", element: <ProtectedRoute> <AddAddress /> </ProtectedRoute> },
      { path: "/get-address/:id", element: <ProtectedRoute> <GetAddressById /> </ProtectedRoute> },
      { path: "productsdetails/:id", element: <ProtectedRoute> <ProductsDetails /> </ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
      { path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute> },
      { path: "brandsdetails/:id", element: <ProtectedRoute> <BrandsDetails /> </ProtectedRoute> },
      { path: "productdetails/:id/:category", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute> },
      { path: "categories/categorydetails/:id", element: <ProtectedRoute> <CategoryDetails /> </ProtectedRoute> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "wishlist", element: <WishList /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "login/forgotpassword", element: <ForgotPass /> },
      { path: "login/verifyresetcode", element: <VerifyResetCode /> },
      { path: "checkout", element: <ProtectedRoute> <Checkout /> </ProtectedRoute> },

      { path: "*", element: <Notfound /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <UserContextProvider>
        <CounterContextProvider>
          <QueryClientProvider client={query}>
            <CartContextProvider>
              <WihlistsContextProvider>
                <Suspense fallback={<div>Loading App...</div>}>
                  <RouterProvider router={router} />
                </Suspense>
              </WihlistsContextProvider>
              <Toaster />
            </CartContextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </>
  );
}
