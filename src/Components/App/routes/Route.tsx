import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("../../../Pages/Home.tsx"));

const route: RouteObject[] = [
  {
    path: "home",
    element: <Home />,
  },
];

for (const childRoute of route[0].children ?? []) {
  if (childRoute.errorElement) continue;
}

export const Routes = route;
