import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Register from './Components/Register.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Feed from './Components/Feed.jsx';
import { ProtectedRoute } from './Components/ProtectedRoute.jsx';
import Login from './Components/Login.jsx';
import Add from './Components/Add.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/start',
    element : <ProtectedRoute>
    <Feed />
  </ProtectedRoute>

  },
  {
    path: '/feed',
    element: (
      <ProtectedRoute>
        <Feed />
      </ProtectedRoute>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path : '/add',
    element : <Add></Add>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
