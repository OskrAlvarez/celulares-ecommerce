import { createBrowserRouter, Navigate } from "react-router-dom";
import { About, Home, Login, OrderUser, Register, Smartphone, Smartphones } from "@/app";
import { RootLayout } from "@/layouts/RootLayout";
import { ClientLayout } from "@/layouts/ClientLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,  // Toma el mismo path del padre(RootLayout)
        element: <Home />
      },
      {
        path: 'smartphones',
        element: <Smartphones />
      },
      {
        path: 'smartphone/:slug',
        element: <Smartphone />
      },
      {
        path: 'about-us',
        element: <About />
      },
      {
        path:'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'account',
        element: <ClientLayout />,
        children: [
          {
            path: '',
            element: <Navigate to='/account/orders' />
          },
          {
            path: 'orders',
            element: <OrderUser />
          }
        ]
      }
    ]
  }
])
