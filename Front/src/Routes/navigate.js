import { lazy } from "react";

const Home = lazy(() => import("../Home/Home"));
const Product = lazy(() => import("./../Product/product.jsx"));
const Login = lazy(() => import("../Login/Login"));
const Register = lazy(() => import("../Register/Register"));

export const navigation = [
    {
        id: 1,
        path: "/",
        Element: Home,
    },
    {
        id: 2,
        path: "/hotel/:id",
        Element: Product,
    },
    {
        id: 3,
        path: "/login",
        Element: Login,
    },
    {
        id: 4,
        path: "/register",
        Element: Register,
    }
];