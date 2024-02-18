import React, { useState, useEffect } from "react";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/signup")
      .then((response) => response.json())
      .then((data) => {
        const { password, ...filteredData } = data;
        setUserData(filteredData);
      })
      .catch((error) =>
        console.error("Error fetching user information:", error)
      );
  }, []);

  const openProfile = () => {
    setIsProfileOpen(true);
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      {userData && (
        <div className="cursor-pointer" onClick={openProfile}>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-2">User Information</h2>
            <ul>
              {Object.entries(userData).map(([key, value]) => (
                <li key={key} className="mb-1">
                  <strong className="mr-2">{key}:</strong> {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isProfileOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium text-gray-900">
                      User Profile
                    </h3>
                    <div className="mt-2">
                      <div className="flex flex-col">
                        {Object.entries(userData).map(([key, value]) => (
                          <div key={key} className="py-2 border-b">
                            <span className="font-semibold">{key}:</span>{" "}
                            {value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={closeProfile}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
