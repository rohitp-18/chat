import { Link, useNavigate } from "react-router-dom";
//import {bindActionCreators} from "redux"
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../store/actions/userAction";

import { useEffect, useState } from "react";
import { clearErrors } from "../store/actions/chatAction";
import { LOGIN_RESET } from "../store/constants/userConstant";

const Login = () => {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");

  const { user, success, error, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("please fill all fields");
      return;
    }

    dispatch(loginRequest({ email, password }));
  };

  useEffect(() => {
    if (user) {
      navigate("/");
      return;
    }
    if (success) {
      alert("login successfully");
      dispatch({ type: LOGIN_RESET });
      navigate("/");
      return;
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, user, success, error]);

  return (
    <div className="bg-[#eee] min-h-[100vh] align-center flex justify-center">
      {loading ? (
        <h1>Loading ....</h1>
      ) : (
        <form
          onSubmit={(e) => loginHandler(e)}
          className="bg-[#fff] rounded max-w-[450px] my-auto p-3 pt-5 bg-black-900"
        >
          <h1 className="text-center mb-2 text-3xl font-bold">Login Form</h1>
          <input
            className="outline-transparent outline-0 bg-transparent border-b-2 border-gray-600 my-3 p-2 w-[100%]"
            type="email"
            value={email}
            onChange={(e) => setEamil(e.target.value)}
            placeholder="Email"
          />
          <input
            className="outline-transparent outline-0 bg-transparent border-b-2 border-gray-600 my-3 p-2 w-[100%]"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-[100%] h-[40px] mt-5 bg-blue-500 text-white font-bold hover:text-blue-700 rounded-full hover:bg-blue-200"
          >
            Login
          </button>
          <div className="text-center font-gray-500">
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
