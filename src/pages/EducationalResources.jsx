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
        // API call to fetch climate change data
        const apiUrl = 'https://climate-change-live408.p.rapidapi.com/';
        const apiOptions = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'd6e00a0f52msh67724852f814818p16f733jsnbce0ac261138',
            'X-RapidAPI-Host': 'climate-change-live408.p.rapidapi.com',
          },
        };
  
        try {
          const apiResponse = await fetch(apiUrl, apiOptions);
          const apiResult = await apiResponse.text();
          console.log(apiResult);
        } catch (error) {
          console.error('Error fetching climate change data:', error);
        }
  
        // Fetch educational resources on component mount
        try {
          const response = await fetch('http://127.0.0.1:4000/education-resources');
          const data = await response.json();
          setResources(data);
        } catch (error) {
          console.error(error);
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
      await fetch('YOUR_BACKEND_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newResource),
      });

      // Refetch the resources after adding a new one
      const response = await fetch('http://127.0.0.1:4000/education-resources');
      const data = await response.json();
      setResources(data);

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
      console.error(error);
    }
  };

  return (
    <div className="bg-green-500 p-8">
      <h1 className="text-4xl text-white mb-6 font-bold">
        Climate Change Educational Resources
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl text-white mb-4 font-bold">Add New Resource</h2>
        <form>
          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={newResource.title}
              onChange={handleInputChange}
              placeholder="Enter title"
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Description:
            </label>
            <input
              type="text"
              name="description"
              value={newResource.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Category:
            </label>
            <input
              type="text"
              name="category"
              value={newResource.category}
              onChange={handleInputChange}
              placeholder="Enter category"
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Content:
            </label>
            <textarea
              name="content"
              value={newResource.content}
              onChange={handleInputChange}
              placeholder="Enter content"
              className="border p-2 w-full"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Author:
            </label>
            <input
              type="text"
              name="author"
              value={newResource.author}
              onChange={handleInputChange}
              placeholder="Enter author"
              className="border p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm font-semibold mb-2">
              Date Published:
            </label>
            <input
              type="text"
              name="date_published"
              value={newResource.date_published}
              onChange={handleInputChange}
              placeholder="Enter date published"
              className="border p-2 w-full"
            />
          </div>

          <button
            type="button"
            onClick={handleAddResource}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Resource
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl text-white mb-4 font-bold">
          Available Resources
        </h2>
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