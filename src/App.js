import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './pages/Home';
import Main from './pages/Main';
import CreateProduct from './components/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
const router = createBrowserRouter([
  {
   path:'/',
   element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
   },
   {
    path:"/main",
    element:<Main/>
   },
   {
    path:"/create",
    element:<CreateProduct/>
   },
   {
    path: "/update/:id",
    element: <UpdateProduct />
  }
])

function App() {

  return (
    <RouterProvider router={router}>
    <div className="App">
      <Login/>
      <Main/>
      <CreateProduct/>
      <UpdateProduct/>
    </div>
    </RouterProvider>
  );
}

export default App;
