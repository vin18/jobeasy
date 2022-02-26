import { Link } from 'react-router-dom';
import { useState } from 'react';
import useWindowWidth from '../hooks/useWindowWidth';
import navbarLinks from '../utils/navbarLinks';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useWindowWidth();

  return (
    <div className="navbar fixed bg-base-100 shadow px-4">
      <div className="navbar-start">
        <div className="dropdown bg-transparent">
          <label className="btn btn-ghost lg:hidden bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={() => setIsOpen(!isOpen)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabindex="0"
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li tabindex="0">
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
          {navbarLinks.map((link) => (
            <li key={link.key}>
              <Link
                to={link.to}
                className="hover:text-green-700 bg-transparent"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end">
        <Link to="/login" className="btn btn-sm btn-primary">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Header;
