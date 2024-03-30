import { Link, useNavigate } from "react-router-dom";
//import {bindActionCreators} from "redux"
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../store/actions/userAction";

import { useEffect } from "react";

const Login = () => {
  const user = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const nevigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const data = { email, password };

    dispatch(loginRequest(data));
    nevigate("/");
  };

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      nevigate("/");
    }
  }, [dispatch, user]);

  return (
    <div className="flex justify-center">
      {user.loading ? (
        <h1>Loading ....</h1>
      ) : (
        <form
          onSubmit={(e) => loginHandler(e)}
          className="p-2 max-w-[450px] my-auto p-2 pt-3 m-2 mt-[80px] bg-white-900"
        >
          <h1 className="text-center text-3xl font-bold">Login Form</h1>

          <input
            className="outline-transparent outline-0 bg-transparent border-b-2 border-gray-600 my-3 p-2 w-[100%]"
            name="email"
            type="email"
            placeholder="Email"
          />

          <input
            className="outline-transparent outline-0 bg-transparent border-b-2 border-gray-600 my-3 p-2 w-[100%]"
            name="password"
            type="password"
            placeholder="Password"
          />

          <div className="text-gray-600">Forgot Password?</div>

          <button className="w-[100%] h-[40px] mt-3 bg-blue-500 text-white font-bold hover:text-blue-700 rounded-full hover:bg-blue-200">
            Login
          </button>

          <div className="text-center font-gray-500 mt-2">
            If you are new user
            <Link to="/register" className="text-blue-500">
              {" "}
              register now
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
