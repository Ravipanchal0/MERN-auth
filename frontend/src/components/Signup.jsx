import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterAccountMutation } from "../slices/usersApiSlice";
import { useLoginMutation } from "../slices/usersApiSlice";
import { login as authLogin } from "../slices/authSlice.js";
import Loader from "./Loader.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerAccount, { isLoading }] = useRegisterAccountMutation();
  const [login, { isLoading: loginLoader }] = useLoginMutation();
  const [userError, setUserError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterAccount = async (e) => {
    e.preventDefault();
    try {
      setUserError("");
      const res = await registerAccount(formData).unwrap();
      if (res?.success) {
        const resLogin = await login({
          email: formData.email,
          password: formData.password,
        }).unwrap();
        dispatch(authLogin(resLogin));
        navigate("/");
      }
    } catch (err) {
      setUserError(err.data.message);
    }
  };

  return (
    <div className="px-28 flex justify-center items-center h-full">
      {(isLoading || loginLoader) && <Loader />}
      <div className="w-2xl box border flex flex-col justify-center items-center p-7 rounded border-gray-200 shadow">
        <h2 className="brand text-2xl tracking-wide">Register Account</h2>
        <p className="error text-red-500 text-sm mt-10">{userError}</p>
        <form
          onSubmit={handleRegisterAccount}
          className="flex flex-col w-full gap-y-5 mt-2"
        >
          <input
            name="name"
            value={formData.name}
            className="w-full px-4 py-2 rounded border border-gray-200 focus:bg-gray-50 focus:border-gray-300 outline-none"
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
          />
          <input
            name="email"
            value={formData.email}
            className="w-full px-4 py-2 rounded border border-gray-200 focus:bg-gray-50 focus:border-gray-300 outline-none"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <input
            name="password"
            value={formData.password}
            className="w-full px-4 py-2 rounded border border-gray-200 focus:bg-gray-50 focus:border-gray-300 outline-none"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full text-white rounded bg-slate-800 font-semibold tracking-wider py-3 cursor-pointer hover:bg-slate-700 transition duration-150"
          >
            Register
          </button>
        </form>
        <p className="text-sm mt-3">
          Already have an account?&nbsp;
          <NavLink
            to="/login"
            className="text-blue-900 font-semibold cursor-pointer underline italic"
          >
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
