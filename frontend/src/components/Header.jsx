import { AiFillBug } from "react-icons/ai";
import { FaSignInAlt } from "react-icons/fa";
import { HiLogin } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { authStatus, user } = useSelector((state) => state.auth);
  const navItems = [
    {
      name: "Home",
      slug: "/",
    },
    {
      name: "About",
      slug: "/about",
    },
    {
      name: "Features",
      slug: "/features",
    },
    {
      name: "Contact Us",
      slug: "/contact",
    },
  ];
  return (
    <>
      <header>
        <nav className="bg-slate-950 flex items-center justify-between text-white px-28 py-4">
          <NavLink to="/" className="logo flex items-center space-x-1">
            <AiFillBug size={32} />
            <h1 className="brand font-bold text-2xl">MernAuth</h1>
          </NavLink>
          <div className="nav-menu">
            <ul className="flex items-center gap-x-10 font-semibold ">
              {authStatus &&
                navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.slug}
                    className={({ isActive }) =>
                      isActive
                        ? "cursor-pointer text-slate-300"
                        : "cursor-pointer hover:text-slate-300"
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
            </ul>
          </div>
          {authStatus ? (
            <div className="profile">
              <NavLink
                to="/profile"
                className="circle size-10 border rounded-full bg-white text-slate-800 flex justify-center items-center font-bold cursor-pointer"
              >
                {user?.data?.name?.[0]?.toUpperCase()}
              </NavLink>
            </div>
          ) : (
            <div className="login flex items-center gap-x-4">
              <NavLink
                to="/login"
                className="flex items-center gap-x-2   rounded px-5 py-1.5 font-semibold hover:bg-slate-800  transition duration-200 cursor-pointer tracking-wider bg-slate-900"
              >
                <FaSignInAlt />
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="flex items-center gap-x-2 rounded px-5 py-1.5 font-semibold hover:bg-slate-800  transition duration-200 cursor-pointer tracking-wider bg-slate-900"
              >
                Sign Up <HiLogin />
              </NavLink>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
