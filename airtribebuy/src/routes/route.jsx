import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppWrapper from "../AppWrapper";
import Home from "../pages/Home";
import Redirect from "../pages/Redirect";
import LoginPage from "../pages/Login";
import PrivateRoutes from "./PrivateRoutes";
import ProductDetails from "../pages/ProductDetails";
import AppContainer from "../pages/AppContainer";
import WishlistPage from "../components/WishlistPage";
import CartPage from "../components/CartPage";


const routes = createBrowserRouter(
[
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/",
        element:    <AppContainer>
                        <PrivateRoutes />
                    </AppContainer>,
        children: [
            {
                path: "/products",
                element: <AppWrapper />,
                children: [
                    {
                        index: true,
                        element: <Home />,
                    },
                    {
                        path: ":productid",
                        element: <ProductDetails />,
                    },
                ]
            },
            {
                path: "/wishlist",
                element: <WishlistPage />,
            },
            {
                path: "/cart",
                element: <CartPage />,
            },
            {
                path: "*",
                element: <Redirect />,
            }  
        ]
    } 
]
)

export default function AppRouter() {
    return <RouterProvider router={routes} />
}