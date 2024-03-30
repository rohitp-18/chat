import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { registerRequest } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const user = useSelector((state) => state.login);

  const submitForm = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    dispatch(registerRequest({ name, email, password }));
    if (user) {
      nevigate("/");
    }
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
        <div className="animation-spin"> </div>
      ) : (
        <form
          onSubmit={submitForm}
          className="p-2 max-w-[450px] my-auto p-2 pt-3 m-2 mt-[80px] bg-white-900"
        >
          <h1 className="text-center text-3xl font-bold">Register Form</h1>
          <input
            className="outline-transparent outline-0 bg-transparent border-b-2 border-gray-600 my-3 p-2 w-[100%]"
            name="name"
            type="text"
            placeholder="Name"
          />

          <input
            className="outline-transparent outline-0 bg-transparent border-b-2 border-gray-600 my-3 p-2 w-[100%]"
            type="email"
            name="email"
            placeholder="Email"
          />

          <input
            className="outline-transparent outline-0 bg-transparent border-b-2 border-gray-600 my-3 p-2 w-[100%]"
            name="password"
            type="password"
            placeholder="Password"
          />

          <div className="text-gray-600">Forgot Password?</div>

          <button
            type="submit"
            className="w-[100%] h-[40px] mt-3 bg-blue-500 text-white font-bold hover:text-blue-700 rounded-full hover:bg-blue-200"
          >
            Register{" "}
          </button>

          <div className="text-center font-gray-500 mt-2">
            Already have an account
            <Link to="/login" className="text-blue-500">
              {" "}
              login now
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default Register;
