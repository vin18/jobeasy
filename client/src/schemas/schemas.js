import * as yup from 'yup';

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, 'Username must be atleast 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .trim()
    .required('Username is required')
    .defined(),
  email: yup
    .string()
    .email('Email must be a valid email')
    .lowercase()
    .required('Email is required')
    .defined(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(150)
    .required('Password is required')
    .defined(),
});

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email must be a valid email')
    .lowercase()
    .required('Email is required')
    .defined(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(150)
    .required('Password is required')
    .defined(),
});

const projectSchema = yup.object().shape({
  projectName: yup.string().required('Project name is required').defined(),
  projectDescription: yup
    .string()
    .required('Project description is required')
    .defined(),
  projectAvatar: yup.string().defined(),
});

export { registerSchema, loginSchema, projectSchema };
