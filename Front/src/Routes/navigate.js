import { lazy } from "react";

const Home = lazy(() => import("../Home/Home"));

export const navigation = [
    {
        id: 1,
        path: "/home",
        Element: Home,
    }
];