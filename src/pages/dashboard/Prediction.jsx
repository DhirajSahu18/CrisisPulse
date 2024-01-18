import React, { useState } from 'react';

const FileBox = () => {
  const [files, setFiles] = useState([]);
  const [showOutput, setShowOutput] = useState(false);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(files)
    // Your logic for processing files and generating output goes here
    setShowOutput(true);
  };

  return (<div className="w-full min-h-[500px] flex align-baseline">
    <div className="p-8 mx-auto bg-gray-200 rounded-md min-h-[200px] my-auto md:max-w-[80%]">
      {!showOutput ? (
        <form onSubmit={(e)=>handleSubmit(e)}>
          <label className="block mb-4 text-lg font-bold">Choose File(s):</label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            required
            className="mb-4 p-2 border border-gray-400 rounded-md block"
          />
          <button  className="bg-blue-500 text-white p-2 rounded-md" type='submit'>
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Output Sections:</h2>
          <div className="bg-white p-4 rounded-md shadow-md mb-4">
            {/* Your first output section */}
            <h3 className="text-lg font-semibold mb-2">Section 1:</h3>
            <p className="text-gray-700">Text for the first section goes hereText for the first section goes hereText for the first section goes hereText for the first section goes hereText for the first section goes hereText for the first section goes hereText for the first section goes here.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md mb-4">
            {/* Your second output section */}
            <h3 className="text-lg font-semibold mb-2">Section 2:</h3>
            <p className="text-gray-700">Text for the second section goes here.</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-md">
            {/* Your third output section */}
            <h3 className="text-lg font-semibold mb-2">Section 3:</h3>
            <p className="text-gray-700">Text for the third section goes here.</p>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default FileBox;
