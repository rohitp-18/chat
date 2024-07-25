import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Chat from "./pages/Chat";
import { Provider } from "react-redux";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/Home";
import store from "./store/store";
import { getUserAction } from "./store/actions/userAction";
import ProtectRoute from "./components/ProtectRoute";
//import Notify from "./pages/notify"

function App() {
  useEffect(() => {
    store.dispatch(getUserAction());
  }, [store]);
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
      element: <Chat />,
    },
    {
      path: "/",
      element: (
        <ProtectRoute>
          <Home />
        </ProtectRoute>
      ),
    },
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
