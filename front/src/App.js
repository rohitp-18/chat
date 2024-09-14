import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import Chat from "./pages/Chat";
import { Provider, useDispatch, useSelector } from "react-redux";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/Home";
import store from "./store/store";
import { getUserAction } from "./store/actions/userAction";
import ProtectRoute from "./components/ProtectRoute";
import Notify from "./pages/notify";
import socket from "./components/socketContext";
import { getAllNotify } from "./store/actions/notifyActions";

function App() {
  useEffect(() => {
    store.dispatch(getUserAction());
    store.dispatch(getAllNotify());
  }, [store]);

  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.select);
  // const { socket } = useSelector((state) => state.select);
  const dispatch = useDispatch();
  // let socket;
  useEffect(() => {
    if (!user) return;
    // socket = io("http://localhost:5000/", {
    //   rejectUnauthorized: false,
    // });
    socket.emit("setup", user);
    socket.connect();
    socket.on("disconected", () => {
      socket.connect();
    });
    socket.on("connected", (users) => {
      dispatch({ type: "chat-connect", payload: users });
    });

    return () => {
      socket.off("disconnected");
      socket.off("connected");
    };
  }, [user, socket]);

  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/notify",
      element: <>{socket && <Notify />}</>,
    },
    {
      path: "/:id",
      element: <Chat />,
    },
    {
      path: "/",
      element: <ProtectRoute>{socket && <Home />}</ProtectRoute>,
      // element: <></>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
