import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Layout from './components/Layout';
import RouterError from './components/RouterError';
import NewDeck from './components/NewDeck';
import NewProject from './components/NewProject';
import ProjectDetail from './components/ProjectDetail';

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
          path: '/project/:id',
          element: <ProjectDetail />
        },
        {
          path: '/new-project',
          element: <NewProject />
        },
        {
          path: '/new-deck/:projectId',
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
