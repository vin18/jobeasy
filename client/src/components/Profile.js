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
import { projectSchema } from '../schemas/schemas';
import { useQuery, useMutation } from 'react-query';
import { addProject, getAllProjects } from '../utils/api-client';

const INITIAL_STATE = {
  projectName: '',
  projectDescription: '',
};
const Profile = () => {
  const [projectImage, setProjectImage] = useState();
  const [projectImagePreview, setProjectImagePreview] = useState();
  const [initialState, setInitialState] = useState(INITIAL_STATE);

  const {
    data: projects,
    isLoading: projectsLoading,
    error,
    isError,
  } = useQuery('projects', getAllProjects);

  const { mutate: handleProjectSubmit, data } = useMutation(
    (response) => addProject(response),
    {
      onSuccess: () => {
        setInitialState(INITIAL_STATE);
        setProjectImage('');
        setProjectImagePreview('');
      },
    }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitialState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    const values = {
      ...initialState,
      projectImage,
    };

    handleProjectSubmit(values);
  };

  const handleImageChange = (event) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setProjectImage(reader.result);
        setProjectImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(event.target.files[0]);
  };

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

          <div class="avatar">
            <div class="w-40 h-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 shadow-lg">
              <img
                src="https://www.vinit.tech/static/media/profile-pic-7.9a9a94465f9233fed74c.png"
                alt=""
                className="w-48 rounded-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </header>

      <section>
        <div className="flex flex-col justify-between bg-gray-50 min-h-full px-8 py-4 shadow border border-b-0 border-green-100 rounded">
          <div className="flex items-center mb-4">
            <h2 className="text-2xl font-semibold mr-2">🎯 My Projects</h2>
            <a href="#my-modal-2">
              <button className="flex justify-center items-center bg-green-500 w-7 h-7 rounded-full">
                <FaPlus className="text-xs text-green-50" />
              </button>
            </a>

            <div className="modal" id="my-modal-2">
              <div className="modal-box">
                <h3 className="font-bold text-2xl text-green-600">
                  Add Project
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="mt-4">
                    <div>
                      <label className="block" htmlFor="projectName">
                        Project Name
                      </label>
                      <input
                        type="text"
                        placeholder="Project name"
                        className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
                        value={initialState.projectName}
                        onChange={handleChange}
                        name="projectName"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <div>
                      <label className="block" htmlFor="projectName">
                        Project Description
                      </label>
                      <textarea
                        placeholder="Project description"
                        className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
                        value={initialState.projectDescription}
                        onChange={handleChange}
                        name="projectDescription"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block mb-1">Project Cover</label>
                    <img
                      className="mb-2 w-full h-64 rounded"
                      src={
                        projectImagePreview
                          ? projectImagePreview
                          : emptyPortfolio
                      }
                      alt="Project image"
                    />

                    <input
                      type="projectImage"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </div>

                  <div className="flex justify-center mt-2">
                    <a
                      href="#"
                      className="flex items-center btn btn-primary mr-2"
                      onClick={handleSubmit}
                    >
                      <span className="mr-1">Add</span> <FaPlusCircle />
                    </a>

                    <a href="#" className="btn btn-primary">
                      <span className="mr-1">Cancel</span>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projectsLoading && <p>Loading</p>}
            {projects?.length === 0 && (
              <div className="flex flex-col justify-center items-center">
                <p>There are currently no projects added yet 🤷‍♂️</p>
              </div>
            )}
            {!projectsLoading &&
              projects?.map((project) => {
                return (
                  <div
                    key={project?._id}
                    className="relative border border-gray-100 rounded-md shadow overflow-hidden group transition-all duration-150 hover:-translate-y-1 hover:border-green-300 cursor-pointer"
                  >
                    <button className="hidden transition-all duration-150 group-hover:flex items-center justify-center bg-green-50 w-8 h-8 rounded-full absolute right-14 top-4">
                      <FaPencilAlt className="text-green-500 text-sm" />
                    </button>

                    <button className="hidden transition-all duration-150 group-hover:flex items-center justify-center bg-green-50 w-8 h-8 rounded-full absolute right-4 top-4">
                      <FaTrashAlt className="text-green-500 text-sm" />
                    </button>
                    <img
                      className="h-48"
                      src={project?.image?.url || emptyPortfolio}
                      alt=""
                    />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold">{project?.name}</h3>
                      <p>{project?.description}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      <section>
        <div className="flex flex-col justify-between bg-gray-50 min-h-full px-8 py-4 shadow border border-green-100 rounded">
          <div className="flex items-center mb-2">
            <h2 className="text-2xl font-semibold mr-2">📝 My Blogs</h2>
            <button className="flex justify-center items-center bg-green-500 w-7 h-7 rounded-full">
              <FaPlus className="text-xs text-green-50" />
            </button>
          </div>

          <div className="flex flex-col justify-center items-center">
            <p>There are currently no blogs added yet 🤷‍♂️</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
