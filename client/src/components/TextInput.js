import { FaEye, FaEyeSlash } from 'react-icons/fa';

const TextInput = ({
  label,
  inputType,
  placeholder,
  error,
  onChange,
  value,
  name,
  isTextArea = false,
  widthFull = false,
  passwordInput = false,
  showPassword,
  setShowPassword,
}) => {
  return (
    <div className="mt-4">
      <div className="relative">
        <label className="block" htmlFor={inputType}>
          {label}
        </label>
        {isTextArea ? (
          <textarea
            type={inputType}
            placeholder={placeholder}
            className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
            value={value}
            onChange={onChange}
            name={name}
          />
        ) : (
          <input
            type={inputType}
            placeholder={placeholder}
            className="px-4 py-2 mt-2 border border-gray-300  rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 block w-full"
            value={value}
            onChange={onChange}
            name={name}
          />
        )}
        {passwordInput && (
          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-12 right-4 cursor-pointer"
          >
            {!showPassword ? (
              <FaEyeSlash className="pb-1" />
            ) : (
              <FaEye className="pb-1" />
            )}
          </div>
        )}
        {error && (
          <span className="text-red-500 font-bold text-sm mt-1">{error}</span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
