import React, { useState, useEffect } from 'react';

const EducationalResources = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({
    title: '',
    description: '',
    category: '',
    content: '',
    author: '',
    date_published: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5555/education-resources');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching educational resources:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prevResource) => ({ ...prevResource, [name]: value }));
  };

  const handleAddResource = async () => {
    try {
      const response = await fetch('http://localhost:5555/education-resources', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResource),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const addedResource = await response.json(); // directly use response.json()
      setResources((prevResources) => [...prevResources, addedResource]);

      // Reset the form
      setNewResource({
        title: '',
        description: '',
        category: '',
        content: '',
        author: '',
        date_published: '',
      });
    } catch (error) {
      console.error('Error adding resource:', error.message);
    }
  };


  return (
    <div className="bg-green-100 py-12">
      <h1 className="text-4xl text-black mb-6 font-bold">
        Climate Change Educational Resources
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl text-black mb-4 font-bold">Add New Resource</h2>
        <form>
          {['title', 'description', 'category', 'content', 'author', 'date_published'].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-black text-sm font-semibold mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}:
              </label>
              {field === 'content' ? (
                <textarea
                  name={field}
                  value={newResource[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.replace('_', ' ')}`}
                  className="border p-2 w-full"
                ></textarea>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={newResource[field]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${field.replace('_', ' ')}`}
                  className="border p-2 w-full"
                />
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddResource}
            className="bg-green-800 text-white py-2 px-4 rounded"
          >
            Add Resource
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl text-black mb-4 font-bold">Available Resources</h2>
        <ul className="text-white">
          {resources.map((resource) => (
            <li key={resource.id} className="mb-2">
              <strong>{resource.title}</strong> - {resource.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EducationalResources;
