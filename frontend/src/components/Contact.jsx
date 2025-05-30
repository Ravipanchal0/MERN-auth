import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Contact = () => {
  const navigate = useNavigate();
  const { authStatus, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [navigate, authStatus]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    msg: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="px-28 flex justify-center items-center h-full">
      <div className="w-2xl box border flex flex-col justify-center items-center p-7 rounded border-gray-200 shadow">
        <h2 className="brand text-2xl tracking-wide">Contact Us</h2>
        <form className="flex flex-col w-full gap-y-3 mt-5">
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
            name="title"
            value={formData.title}
            className="w-full px-4 py-2 rounded border border-gray-200 focus:bg-gray-50 focus:border-gray-300 outline-none"
            type="text"
            placeholder="Enter your title"
            onChange={handleChange}
          />
          <textarea
            name="msg"
            placeholder="Enter your message"
            value={formData.msg}
            className="w-full h-40 resize-none px-4 py-2 rounded border border-gray-200 focus:bg-gray-50 focus:border-gray-300 outline-none"
            onChange={handleChange}
            style={{ resize: "" }}
          ></textarea>
          <button
            type="submit"
            className="w-full text-white rounded bg-slate-800 font-semibold tracking-wider py-3 cursor-pointer hover:bg-slate-700 transition duration-150"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
