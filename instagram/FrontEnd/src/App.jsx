import Signup from './components/Signup';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './components/Home';
import Mainlayout from './components/Mainlayout';
import Profile from './components/profile';
import Login from './components/login';
import Feed from './components/feed';



const brousingRouter = createBrowserRouter([
  {
    path:"/",
    element:<Mainlayout/>,
    children:[
      {
        path:'/',
        element:<Feed/>
      },
      {
        path:'/',
        element:<Home/>
      }
    ]
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:'/login',
    element:<Login/>
  },{
    path:"/feed",
    element:<Feed/>
  }
])


function App() {


  return (
    <>
      
    <RouterProvider router={brousingRouter}/> 

    </>

  )
}

export default App
