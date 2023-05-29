import { lazy } from "react";
import Login from "../Login"

const Home = lazy(() => import("../Home/Home"));

export const navigation = [
    {
        id: 1,
        path: "/home",
        Element: Home,
    }
];

export {Login};