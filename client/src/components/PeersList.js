const PeersList = () => {
  return (
    <div className="px-8 text-gray-700">
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map(() => (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-300 flex items-center cursor-pointer transition-all duration-200 hover:border-b-2 hover:border-b-green-500">
            <div className="mr-4">
              <img
                src="https://www.vinit.tech/static/media/profile-pic-7.9a9a94465f9233fed74c.png"
                alt=""
                className="w-24 rounded-full shadow-lg border-2 border-green-500"
              />
            </div>
            <div>
              <h2 className="text-gray-900">Walter White</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem
                ipsum dolor sit amet.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeersList;
