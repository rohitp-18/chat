import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { registerRequest } from "../store/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../store/actions/chatAction";
import { LOGIN_RESET } from "../store/constants/userConstant";

const Register = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const { user, success, error, loading } = useSelector((state) => state.user);

  const submitForm = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (!email && !password && !name) {
      alert("please fill all fields");
      return;
    }

    dispatch(registerRequest({ name, email, password }));
  };
  useEffect(() => {
    if (user) {
      nevigate("/");
      return;
    }
    if (success) {
      alert("login successfully");
      dispatch({ type: LOGIN_RESET });
      nevigate("/");
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
        <div className="animation-spin"> </div>
      ) : (
        <form
          onSubmit={submitForm}
          className="bg-[#fff] rounded max-w-[450px] my-auto p-3 pt-5 bg-black-900"
        >
          <h1 className="text-center mb-2 text-3xl font-bold">Register Form</h1>
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

          <button
            type="submit"
            className="w-[100%] h-[40px] mt-3 bg-blue-500 text-white font-bold hover:text-blue-700 rounded-full hover:bg-blue-200"
          >
            Register
          </button>

          <div className="text-center font-gray-500">
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
