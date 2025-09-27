import { createBrowserRouter } from "react-router-dom";
import { About, Home, Smartphone, Smartphones } from "@/app";
import { RootLayout } from "@/layouts/RootLayout";

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
        path: 'smarthphone/:slug',
        element: <Smartphone />
      },
      {
        path: 'about-us',
        element: <About />
      }
    ]
  }
])
