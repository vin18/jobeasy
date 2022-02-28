import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import navbarLinks from '../utils/navbarLinks';
import { useAuth } from '../contexts/auth-context';
import { useMutation } from 'react-query';
import { logout } from '../utils/api-client';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useWindowWidth();
  const { user, setUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { mutate: logoutUser } = useMutation(logout, {
    onSuccess: () => {
      navigate(`/`);
      setUser(null);
    },
  });

  return (
    <div className="navbar fixed bg-base-100 shadow px-4">
      <div className="container mx-auto">
        <div className="navbar-start">
          <div className="dropdown bg-transparent">
            <label className="btn btn-ghost md:hidden bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => setIsOpen(!isOpen)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
              <li tabIndex="0">
                <a className="justify-between">
                  Parent
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl text-green-500  hover:bg-transparent"
          >
            JobEasy🚀
          </Link>
        </div>
        <div className="navbar-center md:flex">
          <ul
            className={`flex flex-col sm:flex-row absolute sm:static top-16 left-0 bg-green-100 sm:bg-transparent border border-green-200 sm:border-transparent w-full menu menu-horizontal p-0 ${
              isOpen && isMobile && 'hidden'
            }`}
          >
            {isLoggedIn &&
              navbarLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={link.to}
                    className={`${
                      pathname.includes(link.to) && 'text-green-700'
                    } hover:text-green-700 bg-transparent`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="navbar-end flex justify-end">
          {!isLoggedIn ? (
            <Link to="/login" className="btn btn-sm btn-primary text-green-50">
              Log In
            </Link>
          ) : (
            <button
              onClick={logoutUser}
              className="btn btn-sm btn-primary text-green-50"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
