import { useState } from 'react';

const INITIAL_STATE = {
  name: '',
  bio: '',
  location: '',
  website: '',
  preferredPronoun: '',
};

const MyProfile = () => {
  const [initialState, setInitialState] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitialState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(initialState);
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
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={initialState.email}
              onChange={handleChange}
              name="email"
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
              Location
            </label>
            <input
              type="text"
              placeholder="Location"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={initialState.location}
              onChange={handleChange}
              name="location"
            />
          </div>

          <div className="w-full">
            <label className="block" htmlFor="projectName">
              Website
            </label>
            <input
              type="text"
              placeholder="Website"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={initialState.website}
              onChange={handleChange}
              name="website"
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
