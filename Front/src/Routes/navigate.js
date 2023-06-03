import { lazy } from "react";
import { Login } from "./../Login/Login"
import { Register } from "./../Register/Register"

const Home = lazy(() => import("../Home/Home"));
const Product = lazy(() => import("./../Product/product"));
const Booking = lazy(() => import("./../Booking/Booking"));
const AdminUser = lazy(() => import("./../AdminUser/AdminUser"));

export const navigation = [
    {
        id: 0,
        path: "/",
        Element: Home,
    },
    // agregue este con 1 para que ande tambien
    {
        id: 1,
        path: "/home",
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
    },
    {
        id: 5,
        path: "/booking",
        Element: Booking,
    },
    {
        id: 6,
        path: "/admin",
        Element: AdminUser,
    }
];