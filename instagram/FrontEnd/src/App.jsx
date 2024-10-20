import Home from './components/Home';
import Login from './components/login';
import Mainlayout from './components/Mainlayout';
import Profile from './components/profile';
import Signup from './components/Signup';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';

const browsewRouter = createBrowserRouter([
  {
    path:'/',
    element:<Mainlayout/>,//should write outlate otherwise it wont render
    children:[//childerns are inside mainlayout (fixed);
      {
        path:'/',
        element:<Home/>
      },{
        path:'/profile',
        element:<Profile/>
      }
    ]
  },
  {
    path:'/login',
    element:<Login/>
  },
  { 
    path:'/signup',
    element:<Signup/>
  },{}
]);


function App() {


  return (
    <>
      <RouterProvider router={browsewRouter}/>
    </>
  )
}

export default App
