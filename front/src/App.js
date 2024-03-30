import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {useEffect} from "react"
import Chat from "./pages/Chat"
import { Provider} from "react-redux"




import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/Home";
import store from "./store/store"
//import Notify from "./pages/notify"

function App() {

  useEffect(() => {
    
  }, [])
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    /*{
      path: "/don",
      element: <Notify />
    },*/
    {
      path: "/:id",
      element: <Chat />
    },
    {
      path: "/",
      element: <Home />,
    }
  ]);
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
      
}

export default App;
