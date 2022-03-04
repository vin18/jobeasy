import { Form, Formik } from 'formik';
import { useState } from 'react';
import MyProfile from './MyProfile';
import TextInput from './TextInput';

const Settings = () => {
  return (
    <div className="m-8 mt-0 text-gray-600 border border-green-50 shadow rounded">
      <MyProfile />
    </div>
  );
};

export default Settings;
