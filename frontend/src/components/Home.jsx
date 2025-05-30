import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { authStatus, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [navigate, authStatus]);
  return (
    <div className="h-full flex justify-center items-center">
      <h1 className="text-7xl font-bold text-center gap-y-24">
        <p className="mb-4">Hi, {user?.data?.name}</p>
        <p className="tracking-wide">
          Welcome to
          <span className="text-slate-700 tracking-widest"> MernAuth</span>
        </p>
      </h1>
    </div>
  );
};

export default Home;
