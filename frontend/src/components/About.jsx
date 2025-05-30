import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const About = () => {
  const navigate = useNavigate();
  const { authStatus, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!authStatus) {
      navigate("/login");
    }
  }, [navigate, authStatus]);
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h2 className="text-5xl mb-5 font-semibold">About Me</h2>
      <div className="w-3xl p-6 border border-gray-300 rounded shadow ">
        <h3 className="username">
          Hi there, I'm &nbsp;
          <span className="text-xl italic font-semibold">
            {user?.data?.name[0].toUpperCase() + user?.data?.name?.slice(1)}
          </span>
        </h3>
        <p className="about mt-3 text-justify">
          I'm a passionate full-stack developer with hands-on experience in
          building dynamic web applications using the MERN stack. I’ve
          contributed to real-world projects like Cleanbot—an automated
          floor-cleaning device—and Unity Health Care, a fully functional
          hospital website. With a background in system engineering at TCS and a
          strong foundation in front-end and back-end development, I aim to
          create solutions that are both user-friendly and efficient. I have
          also built several front-end projects using ReactJS, JavaScript, and
          Tailwind CSS, along with API integrations.
          <br />
          <br />I enjoy solving problems through clean, scalable code and
          collaborating with teams to bring ideas to life. Currently, I’m
          focused on improving my skills in Node.js and building full-stack
          applications that can add value to users. I believe in continuous
          learning, exploring new technologies, and pushing my boundaries with
          each project I take on. Welcome to my portfolio—let’s connect and
          build something impactful together!
        </p>
      </div>
    </div>
  );
};

export default About;
