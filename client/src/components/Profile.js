import { FaEdit, FaLocationArrow, FaPencilAlt, FaPlus } from 'react-icons/fa';
import emptyPotfolio from '../assets/emptyPortfolio.png';
import notFoundImg from '../assets/404-error.jpg';
import TextInput from './TextInput';
import { Form, Formik } from 'formik';
import { projectSchema } from '../schemas/schemas';

const Profile = () => {
  const initialState = {
    projectName: '',
    projectDescription: '',
    projectImage: '',
  };

  const handleProjectSubmit = () => {};

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
                <h3 className="font-bold text-2xl">Add Project</h3>

                <Formik
                  validationSchema={projectSchema}
                  initialValues={initialState}
                  onSubmit={handleProjectSubmit}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    values,
                    errors,
                    setFieldValue,
                  }) => {
                    return (
                      <Form noValidate onSubmit={handleSubmit}>
                        <TextInput
                          label="Project Name"
                          placeholder="project name"
                          inputType="text"
                          name="projectName"
                          value={values.projectName}
                          error={errors.projectName}
                          onChange={handleChange}
                          widthFull
                        />

                        <TextInput
                          label="Project Description"
                          placeholder="project description"
                          inputType="text"
                          name="projectDescription"
                          value={values.projectDescription}
                          error={errors.projectDescription}
                          onChange={handleChange}
                          isTextArea
                          widthFull
                        />
                      </Form>
                    );
                  }}
                </Formik>

                <div className="modal-action">
                  <a href="#" className="btn btn-primary">
                    Close
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[1, 2].map((el) => (
              <div
                key={el}
                className="relative border border-gray-100 rounded-md shadow overflow-hidden group transition-all duration-150 hover:-translate-y-1 hover:border-green-300 cursor-pointer"
              >
                <button className="hidden transition-all duration-150 group-hover:flex items-center justify-center bg-green-50 w-8 h-8 rounded-full absolute right-4 top-4">
                  <FaPencilAlt className="text-green-500 text-sm" />
                </button>
                <img src={emptyPotfolio} alt="" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">ShopEasy</h3>
                  <p>An eCommerce store built using the MERN stack</p>
                </div>
              </div>
            ))}
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
