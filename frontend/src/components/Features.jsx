import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Features = () => {
  const navigate = useNavigate();
  const { authStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [navigate, authStatus]);

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="box border border-slate-300 shadow rounded p-5">
        <h1 className="text-3xl font-bold mb-3">Features</h1>
        <p className="w-3xl text-justify">
          Explore the key features that set this platform apart. Each element
          is84 designed with user experience, performance, and simplicity in
          mind. Whether you're here to build, manage, or grow, these tools are
          crafted to help you achieve more—faster and smarter.
        </p>
        <ul className="mt-3 ml-5 list-disc space-y-2">
          <li>
            <span className="font-semibold">User-Friendly Interface : </span>
            Clean, intuitive design that makes navigation seamless.
          </li>
          <li>
            <span className="font-semibold">Responsive Design : </span>
            Optimized for all devices—desktop, tablet, and mobile.
          </li>
          <li>
            <span className="font-semibold">Secure Authentication : </span>
            Ensures user data is protected with robust login systems.
          </li>
          <li>
            <span className="font-semibold">Customizable Components : </span>
            Tailor features to match your unique needs and preferences.
          </li>
          <li>
            <span className="font-semibold">Fast Performance : </span>
            Built with speed in mind for a smooth, lag-free experience.
          </li>
          <li>
            <span className="font-semibold">Real-Time Updates : </span>
            Stay in sync with live data and instant changes.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Features;
