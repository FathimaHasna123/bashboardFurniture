import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'

import DashboardPage from './pages/DashboardPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import UserPage from './pages/UserPage.jsx';
import CartPage from './pages/CartPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import ContactPage from './pages/ContactPage.jsx';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
     {
        path: '/',         
        element: <DashboardPage />,
      },
      {
        path: 'dashboard', 
        element: <DashboardPage />,
      },
      {
        path:'product',
        element:<ProductPage/>
      },
      {
        path:'user',
        element:<UserPage/>
      },
      {
        path:'cart',
        element:<CartPage/>
      },
      {
        path:'blog',
        element:<BlogPage/>
      },
      {
        path:'contact',
        element:<ContactPage/>
      },
    ],
  },
]);


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
