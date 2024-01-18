import React, { useState } from 'react';

const FileBox = () => {
  const [files, setFiles] = useState([]);
  const [showOutput, setShowOutput] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = () => {
    // Your logic for processing files and generating output goes here
    setShowOutput(true);
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-gray-200 rounded-md">
      {!showOutput ? (
        <>
          <label className="block mb-4 text-lg font-bold">Choose File(s):</label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="mb-4 p-2 border border-gray-400 rounded-md"
          />
          <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-md">
            Submit
          </button>
        </>
      ) : (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Output Sections:</h2>
          <div className="bg-white p-4 rounded-md shadow-md mb-4">
            {/* Your first output section */}
            <h3 className="text-lg font-semibold mb-2">Section 1:</h3>
            <p>Text for the first section goes here.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md mb-4">
            {/* Your second output section */}
            <h3 className="text-lg font-semibold mb-2">Section 2:</h3>
            <p>Text for the second section goes here.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            {/* Your third output section */}
            <h3 className="text-lg font-semibold mb-2">Section 3:</h3>
            <p>Text for the third section goes here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileBox;
