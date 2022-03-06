import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { updateProfile } from '../utils/api-client';
import { useAuth } from '../contexts/auth-context';
import toast from 'react-hot-toast';

const INITIAL_STATE = {
  name: '',
  bio: '',
  city: '',
  country: '',
};

const MyProfile = () => {
  const { user } = useAuth();
  const [initialState, setInitialState] = useState(INITIAL_STATE);
  const {
    mutate: handleUserProfileUpdate,
    data,
    isLoading,
  } = useMutation(() => updateProfile({ ...initialState }), {
    onSuccess: (data) => {
      toast.success(`Profile updated!`);
    },
  });

  useEffect(() => {
    setInitialState({ ...user });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitialState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUserProfileUpdate(initialState);
  };

  return (
    <div>
      <div className="bg-gray-100 px-4 py-3 border border-gray-200">
        <h3 className="text-gray-900">Basic Profile</h3>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex">
          <div className="mr-4 w-full">
            <label className="block" htmlFor="projectName">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={initialState.username}
              onChange={handleChange}
              name="username"
            />
          </div>

          <div className="w-full">
            <label className="block" htmlFor="projectName">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full cursor-not-allowed"
              value={initialState.email}
              onChange={handleChange}
              name="email"
              disabled
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block" htmlFor="projectName">
            Bio
          </label>
          <textarea
            type="text"
            placeholder="Something about you"
            className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
            value={initialState.bio}
            onChange={handleChange}
            name="bio"
          />
        </div>

        <div className="flex mt-4">
          <div className="mr-4 w-full">
            <label className="block" htmlFor="projectName">
              City
            </label>
            <input
              type="text"
              placeholder="City"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={initialState.city}
              onChange={handleChange}
              name="city"
            />
          </div>

          <div className="w-full">
            <label className="block" htmlFor="projectName">
              Country
            </label>
            <input
              type="text"
              placeholder="country"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={initialState.country}
              onChange={handleChange}
              name="country"
            />
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 mt-3">
          <button className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
