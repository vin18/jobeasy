import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useAuth } from '../contexts/auth-context';
import { updateSocials } from '../utils/api-client';
import toast from 'react-hot-toast';

const INITIAL_STATE = {
  twitter: '',
  github: '',
  linkedin: '',
  instagram: '',
};

const MySocial = () => {
  const [initialState, setInitialState] = useState(INITIAL_STATE);
  const { user } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitialState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    setInitialState({ ...user?.socials[0] });
  }, [user]);

  const {
    mutate: handleAddSocialHandles,
    data,
    isLoading,
  } = useMutation((userValues) => updateSocials(userValues), {
    onSuccess: (data) => {
      toast.success(`Social links updated!`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddSocialHandles({ socials: [initialState] });
  };

  return (
    <div className="m-8">
      <div className="bg-gray-100 px-4 py-3 border border-gray-200">
        <h3 className="text-gray-900">Social Links</h3>
      </div>

      <form className="p-4" onSubmit={handleSubmit}>
        <div className="flex">
          <div className="mr-4 w-full">
            <input
              type="text"
              placeholder="Twitter"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={initialState.twitter}
              onChange={handleChange}
              name="twitter"
            />
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="Linkedin"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={initialState.linkedin}
              onChange={handleChange}
              name="linkedin"
            />
          </div>
        </div>

        <div className="flex mt-4">
          <div className="mr-4 w-full">
            <input
              type="text"
              placeholder="Github"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={initialState.github}
              onChange={handleChange}
              name="github"
            />
          </div>

          <div className="w-full">
            <input
              type="text"
              placeholder="Instagram"
              className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
              value={initialState.instagram}
              onChange={handleChange}
              name="instagram"
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

export default MySocial;
