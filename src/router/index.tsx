import { createBrowserRouter } from "react-router-dom";
import { About, Home, Smartphones } from "@/app";
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
        path: 'about-us',
        element: <About />
      }
    ]
  }
])
