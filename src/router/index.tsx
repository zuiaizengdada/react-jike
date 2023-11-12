import { createBrowserRouter } from 'react-router-dom';

import Latout from '@/pages/Layout';
import Login from '@/pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Latout />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

export default router;
