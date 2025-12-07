import React from "react";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fluentV9Theme } from "../Constants/theme.ts";
import Root from "../Root/Root.tsx";
import { BaseRoutes } from "./routes/baseRoute.tsx";
import { FluentProvider } from "@fluentui/react-components";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: BaseRoutes,
    },
  ]);
  return (
    <FluentProvider theme={fluentV9Theme}>
      <RouterProvider router={router} />
    </FluentProvider>
  );
};

export default App;
