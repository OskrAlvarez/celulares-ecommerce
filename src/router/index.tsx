import { createBrowserRouter, Navigate } from "react-router-dom";
import { About, Checkout, Home, Login, OrdersUser, OrderUser, Register, Smartphone, Smartphones, ThankYou } from "@/app";
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
            element: <OrdersUser />
          },
          {
            path: 'orders/:id',
            element: <OrderUser />
          }
        ]
      },
    ]
  },
  {
    path: '/checkout',
    element: <Checkout />
  },
  {
    path: '/checkout/:id/thank-you',
    element: <ThankYou />
  },
])
