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

      const addedResource = await response.json();
      setResources((prevResources) => [...prevResources, addedResource]);

      // Reset the form
      setNewResource({
        title: '',
        description: '',
        image_url:'',
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
    <div className="bg-green-100 p-8">
      <h1 className="text-4xl text-black mb-6 font-bold">
       You need to Know this!!
      </h1>
        {/* Displaying the available resources */}
      {/* Add New Resource form */}
      <div className="flex">
      <div className="w-1/2">
          <img src="https://climate.nasa.gov/system/internal_resources/details/original/1209_shutterstock_88550854.jpg" 
          alt="Climate Image" 
          className="max-w-full h-auto pr-4"
          style={{height:'100%'}} />
          {/* You can replace the above 'src' attribute with the path to your image */}
        </div> 
      <div className="w-1/2 pr-8">
        <h2 className="text-2xl text-black mb-4 font-bold">Add New Resource</h2>
        <form>
          {['title', 'description', 'image_url','category', 'content', 'author', 'date_published'].map((field) => (
            <div key={field} className="pl-4">
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
            className="bg-green-800 text-white py-2 px-2 rounded mt-4 ml-4"
          >
            Add Resource
          </button>
        </form>
      </div>   
    </div>
    <div
  style={{
    background: "url('https://www.arthomepatna.com/wp-content/uploads/2019/02/SEA_GREEN-600x600.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginTop: "20px", 
    backdropFilter: "blur(90px)", 
  }}
  
>
<div style={{ textAlign: "center" }}>
    <h1 className="text-2xl text-black mb-4 font-bold">Available Resources</h1>
  </div>
  {/* <div className="flex">
  <div className="w-1/2">
  {resources.map((resource) => (
    <li key={resource.id} className="mb-4">
      <img
        src={resource.image_url}
        alt={resource.title}
        style={{ width: '100%', height: '150%' }}
      />
    </li>
  ))}
</div> */}
      <div className="flex">
      <ul className="text-white">
  {resources.map((resource) => (
    <li key={resource.id} className="mb-4" style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '15px' }}>
      <h3 className="text-xl font-bold">{resource.title}</h3>
      <img
        src={resource.image_url}
        alt={resource.title}
        style={{ width: '60%', height: '150%' }}
      />
      <p className="text-black mb-2">
        <strong>Description:</strong> {resource.description}
      </p>
      <p className="text-black mb-2">
        <strong>Author:</strong> {resource.author}
      </p>
      <p className="mb-2">{resource.content}</p>
      <p className="text-black">
        <strong>Date Published:</strong> {resource.date_published}
      </p>
    </li>
  ))}
</ul>
  </div>
  </div>
</div>
  );
};

export default EducationalResources;

