import { lazy } from "react";
import { Login } from "./../Login/Login"
import { Register } from "./../Register/Register"
// import { Perfil } from "./../Perfil/Perfil"

const Home = lazy(() => import("../Home/Home"));
const Product = lazy(() => import("./../Product/product"));
const Booking = lazy(() => import("./../Booking/Booking"));
<<<<<<< HEAD
const Perfil = lazy(() => import("./../Perfil/Perfil"));
=======
const AdminUser = lazy(() => import("./../AdminUser/AdminUser"));
>>>>>>> 8e5970f7ccb59af61a67c828ccd2671dfce1b17a

export const navigation = [
    {
        id: 0,
        path: "/",
        Element: Home,
    },
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
        path: "/perfil",
        Element: Perfil,
    }{
id: 7,
        path: "/admin",
        Element: AdminUser,
    }
];