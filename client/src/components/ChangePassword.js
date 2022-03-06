import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useAuth } from '../contexts/auth-context';
import { changePassword } from '../utils/api-client';
import toast from 'react-hot-toast';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const INITIAL_STATE = {
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
};

const MySocial = () => {
  const [initialState, setInitialState] = useState(INITIAL_STATE);
  const { oldPassword, newPassword, confirmNewPassword } = initialState;
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitialState((prevState) => ({ ...prevState, [name]: value }));
  };

  const {
    mutate: handleChangePassword,
    data,
    isLoading,
  } = useMutation((userValues) => changePassword(userValues), {
    onSuccess: (data) => {
      if (data) toast.success(`Password updated!`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return toast.error(`Passwords don't match!`);
    }
    handleChangePassword({ oldPassword, newPassword });
  };

  return (
    <div className="m-8">
      <div className="bg-gray-100 px-4 py-3 border border-gray-200">
        <h3 className="text-gray-900">Change Password</h3>
      </div>

      <form className="p-4" onSubmit={handleSubmit}>
        <div className="flex">
          <div className="w-1/2 relative">
            <input
              type={showOldPassword ? 'text' : 'password'}
              placeholder="Old password"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={oldPassword}
              onChange={handleChange}
              name="oldPassword"
            />
            <div
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute top-5 right-4 cursor-pointer"
            >
              {!showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        <div className="flex mt-4">
          <div className="mr-4 w-full relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="New password"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={newPassword}
              onChange={handleChange}
              name="newPassword"
            />
            <div
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute top-5 right-4 cursor-pointer"
            >
              {!showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <div className="w-full relative">
            <input
              type={showConfirmNewPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={confirmNewPassword}
              onChange={handleChange}
              name="confirmNewPassword"
            />
            <div
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
              className="absolute top-5 right-4 cursor-pointer"
            >
              {!showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <button className="btn btn-primary">Change password</button>
        </div>
      </form>
    </div>
  );
};

export default MySocial;
