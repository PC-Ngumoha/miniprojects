import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import App from './App.jsx';
import Home from '../pages/Home/Home.jsx';
import Compose from '../pages/Compose/Compose.jsx';
import Post from '../pages/Post/Post.jsx';
import Error from '../pages/Error/Error.jsx';
import './global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'compose',
        element: <Compose />,
      },
      {
        path: 'post/:postId',
        element: <Post />,
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
