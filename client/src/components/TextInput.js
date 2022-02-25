const TextInput = ({ label, inputType, placeholder }) => {
  return (
    <div className="mt-4">
      <div>
        <label className="block" for="email">
          {label}
        </label>
        <input
          type={inputType}
          placeholder={placeholder}
          className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
        />
      </div>
    </div>
  );
};

export default TextInput;
