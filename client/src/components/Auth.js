import { useState } from 'react';
import { useMutation } from 'react-query';
import { Form, Formik } from 'formik';
import { loginSchema, registerSchema } from '../schemas/schemas';
import TextInput from './TextInput';
import { auth } from '../utils/api-client';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isMember, setIsMember] = useState(true);
  const responseType = isMember ? 'login' : 'register';
  const navigate = useNavigate();
  const { mutate, data, isLoading, error, isError } = useMutation(
    (response) => auth(response.currentUser, response.endPoint),
    {
      onSuccess: ({ data }) => navigate(`/profile/${data.user.username}`),
    }
  );

  const initialState = {
    username: '',
    email: '',
    password: '',
  };

  const handleSubmit = (values) => {
    const registerAction = {
      currentUser: {
        username: values.username,
        email: values.email,
        password: values.password,
      },
      endPoint: 'register',
    };

    const loginAction = {
      currentUser: {
        email: values.email,
        password: values.password,
      },
      endPoint: 'login',
    };

    mutate(isMember ? loginAction : registerAction);
  };

  const handleGuestLogin = () => {
    const guestLoginAction = {
      currentUser: {
        email: 'test@example.com',
        password: '123456',
      },
      endPoint: 'login',
    };

    mutate(guestLoginAction);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-md border-t-4 border-green-500">
        <h2 className="text-3xl font-bold text-center mb-1 text-green-600">
          JobEasy🚀
        </h2>
        <h3 className="text-2xl font-bold text-center">
          {isMember ? 'Login to your account 🔐 ' : 'Register your account 🔐'}
        </h3>
        <Formik
          validationSchema={isMember ? loginSchema : registerSchema}
          initialValues={initialState}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, handleChange, values, errors, setFieldValue }) => {
            return (
              <Form noValidate onSubmit={handleSubmit}>
                {!isMember && (
                  <TextInput
                    label="Username"
                    placeholder="Username"
                    inputType="text"
                    name="username"
                    value={values.username}
                    error={errors.username}
                    onChange={handleChange}
                  />
                )}
                <TextInput
                  label="Email"
                  placeholder="Email"
                  inputType="text"
                  name="email"
                  value={values.email}
                  error={errors.email}
                  onChange={handleChange}
                />

                <TextInput
                  label="Password"
                  placeholder="Password"
                  inputType="password"
                  name="password"
                  value={values.password}
                  error={errors.password}
                  onChange={handleChange}
                />

                <div className="flex justify-between items-center text-sm  mt-1">
                  {isMember ? (
                    <p>
                      Not a user?{' '}
                      <span
                        className="text-green-600 cursor-pointer hover:underline"
                        onClick={() => setIsMember(false)}
                      >
                        Register here
                      </span>
                    </p>
                  ) : (
                    <p>
                      Already a user?{' '}
                      <span
                        className="text-green-600 cursor-pointer hover:underline"
                        onClick={() => setIsMember(true)}
                      >
                        Login here
                      </span>
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    disabled={isLoading}
                    className={`btn btn-primary mt-4 px-12 mr-4 ${
                      isLoading && 'loading'
                    }`}
                  >
                    {isMember ? 'Login' : 'Register'}
                  </button>
                  <button
                    onClick={handleGuestLogin}
                    disabled={isLoading}
                    className={`btn btn-primary mt-4 ${isLoading && 'loading'}`}
                  >
                    {'Login as guest'}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Auth;
