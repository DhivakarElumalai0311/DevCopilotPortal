import { RouteObject } from "react-router-dom";
import { Routes } from "./Route.tsx";

const routes: RouteObject[] = [...Routes];

for (const route of routes) {
  if (route.errorElement) continue;
}

export const BaseRoutes: RouteObject[] = routes;
