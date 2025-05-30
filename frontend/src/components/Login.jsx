import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader.jsx";
import { useLoginMutation } from "../slices/usersApiSlice";
import { login as authLogin } from "../slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const [login, { isLoading, error }] = useLoginMutation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [UserError, setUserError] = useState("");

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [navigate, authStatus]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      dispatch(authLogin(res));
      navigate("/");
    } catch (err) {
      setUserError(err.data.message);
    }
  };

  return (
    <div className="px-28 flex justify-center items-center h-full">
      {isLoading && <Loader />}
      <div className="w-2xl box bg-gray-50 border flex flex-col justify-center items-center p-7 rounded border-gray-200 shadow">
        <h2 className="brand text-2xl tracking-wide">LogIn Account</h2>
        <p className="error text-red-500 text-sm mt-10">{UserError}</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-y-5 mt-3"
        >
          <input
            name="email"
            value={formData.email}
            className="w-full px-4 py-2 rounded border border-gray-200 focus:bg-gray-100 focus:border-gray-300 outline-none"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <input
            name="password"
            value={formData.password}
            className="w-full px-4 py-2 rounded border border-gray-200 focus:bg-gray-100 focus:border-gray-300 outline-none"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full text-white rounded bg-slate-800 font-semibold tracking-wider py-3 cursor-pointer hover:bg-slate-700 transition duration-150"
          >
            Log In
          </button>
        </form>
        <p className="text-sm mt-3">
          Don't have an account?&nbsp;
          <NavLink
            to="/signup"
            className="text-blue-900 font-semibold cursor-pointer underline italic"
          >
            Register Account
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
