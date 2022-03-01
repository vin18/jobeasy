import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  addProject,
  getAllProjects,
  updateProject,
  deleteProject,
} from '../utils/api-client';
import emptyPortfolio from '../assets/emptyPortfolio.png';
import { FaPencilAlt, FaPlus, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { getBase64FromUrl } from '../utils/getBase64FromUrl';

const INITIAL_STATE = {
  projectName: '',
  projectDescription: '',
};

const MyProjects = () => {
  const [projectImage, setProjectImage] = useState();
  const [projectImagePreview, setProjectImagePreview] = useState();
  const [initialState, setInitialState] = useState(INITIAL_STATE);
  const [isEditing, setIsEditing] = useState();

  const queryClient = useQueryClient();

  useEffect(() => {
    async function hydrateEditData() {
      if (isEditing) {
        const image = await getBase64FromUrl(isEditing.image.url);
        setInitialState({
          projectName: isEditing.name,
          projectDescription: isEditing.description,
        });
        setProjectImage(image);
        setProjectImagePreview(image);
      }
    }
    hydrateEditData();
  }, [isEditing]);

  const {
    data: projects,
    isLoading: projectsLoading,
    error,
    isError,
  } = useQuery('projects', getAllProjects);

  const mutationRequestHandler = (response) => {
    if (response?.isDelete) {
      return deleteProject(response?.projectId);
    } else if (response?.isEdit) {
      return updateProject({
        ...initialState,
        image: isEditing.image,
        imageInBase64: projectImage,
        projectId: response?.projectId,
      });
    } else {
      return addProject(response);
    }
  };

  const { mutate: handleProjectSubmit, data } = useMutation(
    mutationRequestHandler,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
        setInitialState(INITIAL_STATE);
        setProjectImage('');
        setProjectImagePreview('');
        setIsEditing(null);
      },
    }
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInitialState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (values = {}) => {
    const valuesToSend = {
      ...initialState,
      projectImage,
    };

    if (values.isDelete && values.projectId) {
      handleProjectSubmit({
        isDelete: values.isDelete,
        projectId: values.projectId,
      });
    } else if (values.isEdit && values.projectId) {
      handleProjectSubmit({
        isEdit: values.isEdit,
        projectId: values.projectId,
      });
    } else {
      handleProjectSubmit(valuesToSend);
    }
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

  const renderModal = () => {
    return (
      <div className="modal" id="my-modal-2">
        <div className="modal-box">
          <h3 className="font-bold text-2xl text-green-600">
            {!isEditing ? 'Add' : 'Edit'} Project
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
                src={projectImagePreview ? projectImagePreview : emptyPortfolio}
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
                onClick={() =>
                  isEditing
                    ? handleSubmit({ isEdit: true, projectId: isEditing._id })
                    : handleSubmit()
                }
              >
                <span className="mr-1">{isEditing ? 'Edit' : 'Add'}</span>{' '}
                <FaPlusCircle />
              </a>

              <a href="#" className="btn btn-primary">
                <span className="mr-1">Cancel</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <section>
      <div className="flex flex-col justify-between bg-gray-50 min-h-full px-8 py-4 shadow border border-b-0 border-green-100 rounded">
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-semibold mr-2">🎯 My Projects</h2>
          <a href="#my-modal-2">
            <button className="flex justify-center items-center bg-green-500 w-7 h-7 rounded-full">
              <FaPlus className="text-xs text-green-50" />
            </button>
          </a>
        </div>

        {renderModal()}

        {projects?.length === 0 && (
          <div className="flex justify-center items-center">
            <p>There are currently no projects added yet 🤷‍♂️</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {!projectsLoading &&
            projects?.map((project) => {
              return (
                <div
                  key={project?._id}
                  className="relative border border-gray-100 rounded-md shadow overflow-hidden group transition-all duration-150 hover:-translate-y-1 hover:border-green-300 cursor-pointer"
                >
                  <a href="#my-modal-2" onClick={() => setIsEditing(project)}>
                    <button className="hidden transition-all duration-150 group-hover:flex items-center justify-center bg-green-50 w-8 h-8 rounded-full absolute right-14 top-4">
                      <FaPencilAlt className="text-green-500 text-sm" />
                    </button>
                  </a>

                  <button
                    onClick={() =>
                      handleSubmit({ isDelete: true, projectId: project._id })
                    }
                    className="hidden transition-all duration-150 group-hover:flex items-center justify-center bg-green-50 w-8 h-8 rounded-full absolute right-4 top-4"
                  >
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
  );
};

export default MyProjects;
