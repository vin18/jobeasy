import { useState } from 'react';
import TextInput from './TextInput';

const Auth = () => {
  const [isMember, setIsMember] = useState(true);

  return (
    <div className="flex items-center justify-center">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-md border-t-4 border-green-500">
        <h2 className="text-3xl font-bold text-center mb-1 text-green-600">
          JobEasy🚀
        </h2>
        <h3 className="text-2xl font-bold text-center">
          {isMember ? 'Login to your account 🔐 ' : 'Register your account 🔐'}
        </h3>
        <form>
          {!isMember && (
            <TextInput
              label="Username"
              placeholder="Username"
              inputType="text"
            />
          )}
          <TextInput label="Email" placeholder="Email" inputType="text" />

          <TextInput
            label="Password"
            placeholder="Password"
            inputType="password"
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
            <button className="btn btn-primary mt-4 px-12 mr-4">
              {isMember ? 'Login' : 'Register'}
            </button>
            <button className="btn btn-primary mt-4">Login as guest</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
