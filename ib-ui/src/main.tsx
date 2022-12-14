import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";
import Quiz from "./Quiz";
import Done from "./Done";
import Badge from "./Badge";
import Users from "./Users";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "quiz/:network/:pageNo",
    element: <Quiz />,
  },
  {
    path: "done/:network",
    element: <Done />,
  },
  {
    path: "badge/:network/:badgeId",
    element: <Badge />,
  },
  {
    path: "users",
    element: <Users />,
  },
  {
    path: "users/:pageNo",
    element: <Users />,
  },
]);

const uri = import.meta.env.VITE_BACKEND;

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
