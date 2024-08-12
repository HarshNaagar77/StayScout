import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import '../src/Css/index.css'
import Register from './Components/Register.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Feed from './Components/Feed.jsx';
import { ProtectedRoute } from './Components/ProtectedRoute.jsx';
import Login from './Components/Login.jsx';
import Add from './Components/Add.jsx';
import PlacePage from './Components/PlacePage.jsx';
import StripeProvider from './Components/StripeProvider.jsx';
import CheckoutForm from './Components/CheckoutForm.jsx';
import Cart from './Components/Cart.jsx';
import Success from './Components/Success.jsx';
import AddSuccess from './Components/AddSuccess.jsx';
import Profile from './Components/Profile.jsx';


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
    element : <ProtectedRoute> 
    <Add />
  </ProtectedRoute>
  },
  {
    path : '/place/:id',
    element : <ProtectedRoute> <PlacePage /></ProtectedRoute>
  },
  {
    path : '/payment',
    element :  <StripeProvider><CheckoutForm /></StripeProvider>
  },
  {
    path : '/payment/:id',
    element :  <ProtectedRoute><Cart></Cart></ProtectedRoute>
  
  },
  {
    path : '/success' , 
    element : <ProtectedRoute><Success /></ProtectedRoute>
  },
  {
    path : '/profile' , 
    element : <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path : '/addsuccess' , 
    element : <ProtectedRoute><AddSuccess /> </ProtectedRoute>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
