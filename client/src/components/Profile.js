import { useState } from 'react';
import {
  FaEdit,
  FaLocationArrow,
  FaPencilAlt,
  FaPlus,
  FaPlusCircle,
  FaTrashAlt,
} from 'react-icons/fa';
import emptyPortfolio from '../assets/emptyPortfolio.png';
import notFoundImg from '../assets/404-error.jpg';
import MyProjects from './MyProjects';
import MyBlogs from './MyBlogs';

const Profile = () => {
  return (
    <div className="w-3/5 mx-auto text-gray-700">
      <header>
        <div className="flex justify-between bg-gray-50 min-h-full p-8 shadow border border-green-100 border-b-0 rounded">
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center">
                <h2 className="text-3xl font-semibold">Vinit Raut</h2>
                <p className="text-sm px-1 rounded">he/him</p>
              </div>
              <p>
                I am a web developer and UI/UX enthusiast.
                <br /> I ❤️ Javascript and CSS
              </p>
            </div>

            <div className="mt-4">
              <h3>⚡Skills</h3>
              <div className="space-x-4">
                <div className="badge bg-green-50 text-green-700 border border-green-600">
                  Javascript
                </div>
                <div className="badge bg-green-50 text-green-700 border border-green-600">
                  React
                </div>
                <div className="badge bg-green-50 text-green-700 border border-green-600">
                  Redux
                </div>
                <div className="badge bg-green-50 text-green-700 border border-green-600">
                  Nodejs
                </div>
              </div>

              <div className="mt-2 text-gray-600">📍Mumbai, India</div>
            </div>
          </div>

          <div className="avatar">
            <div className="w-40 h-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg">
              <img
                src="https://www.vinit.tech/static/media/profile-pic-7.9a9a94465f9233fed74c.png"
                alt=""
                className="w-48 rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </header>

      <MyProjects />
      <MyBlogs />
    </div>
  );
};

export default Profile;
