import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import RouterError from './components/RouterError';
import NewDeck from './components/NewDeck';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <RouterError />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: '/new-deck',
          element: <NewDeck />
        }
      ]
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
