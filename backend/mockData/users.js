import bcrypt from 'bcryptjs';

const users = [
  {
    username: 'test',
    email: 'test@example.com',
    password: bcrypt.hashSync('123456'),
  },
  {
    username: 'walter',
    email: 'walter@example.com',
    password: bcrypt.hashSync('123456'),
  },
  {
    username: 'admin',
    email: 'admin@example.com',
    password: bcrypt.hashSync('234567'),
  },
];

export default users;
