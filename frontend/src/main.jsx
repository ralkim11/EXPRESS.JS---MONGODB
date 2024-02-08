import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Root, { loader as rootLoader, action as rootAction, } from "./routes/root";
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import "./index.css";
import ErrorPage from "./error-page";
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";
import EditContact, { action as editAction, } from "./routes/edit";
import { action as destroyAction } from "./routes/destroy";
import Index from "./routes/index";

// Creating a browser router instance for handling client side routing
//'CreateRoutesFromElements' creates routes using JSX elements, which allows to define the route hierarchy
//'Route' represents a route with attributes like path, element, loader, action, and errorElement
//Root, Contact, EditContact, Index: Represent components for different routes
//loader and action: Functions associated with loading and handling actions for specific routes
//errorElement: The component to render in case of an error.

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      loader={rootLoader}
      action={rootAction}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="contacts/:contactId"
          element={<Contact />}
          loader={contactLoader}
          action={contactAction}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<EditContact />}
          loader={contactLoader}
          action={editAction}
        />
        <Route
          path="contacts/:contactId/destroy"
          action={destroyAction}
        />
      </Route>
    </Route>
  )
);

//ReactDOM.createRoot: Creates a root for React rendering
//<React.StrictMode>: Wraps the RouterProvider in StrictMode to enable additional runtime checks and warnings
//RouterProvider: Provides the router context to the app
//router={router}: Associates the created router instance with the RouterProvider
//ReactDOM.createRoot(...).render(...): Renders the app inside the specified root element

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
