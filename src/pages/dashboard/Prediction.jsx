import React, { useState } from 'react';

const FileBox = () => {
  const [files, setFiles] = useState([]);
  const [showOutput, setShowOutput] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);
  const [threatLevel, setThreatLevel] = useState('');
  const [architecture, setArchitecture] = useState(null);
  const [filePreviews, setFilePreviews] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);

    // Generate file previews
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append each file to the FormData
      files.forEach((file, index) => {
        formData.append(`file`, file);
      });

      // Your API endpoint for handling file upload
      const apiUrl = 'http://127.0.0.1:5000/sat'; // Replace with your actual API endpoint
      console.log(formData);
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      // Handle the response as needed
      const responseData = await response.json();
      console.log('Response:', responseData);
      const level = responseData?.predicted_threat_level;
      let texts = '';
      switch (level) {
        case 0:
          texts = 'No Damage';
          setThreatLevel('No Damage');
          break;
        case 1:
          texts = 'Minor Damage';
          setThreatLevel('Minor Damage');
          break;
        case 2:
          setThreatLevel('High Damage');
          texts = 'High Damage';
          break;
        case 3:
          texts = 'Totally Destroyed';
          setThreatLevel('Totally Destroyed');
          break;
        default:
          break;
      }
      const msg = `How can I reinforce a ${architecture} if the whole architecture has level ${level} danger and the destruction type was ${texts}`;
      const res = await fetch('http://127.0.0.1:5000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required
        },
        body: JSON.stringify({ query: msg }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log('Data received:', data);
      setResponseMsg(data.result);
      setShowOutput(true);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="w-full min-h-[500px] flex align-baseline">
      <div className="p-8 mx-auto bg-gray-200 rounded-md min-h-[200px] my-auto md:max-w-[80%]">
        {!showOutput ? (
          <form onSubmit={(e) => handleSubmit(e)}>
            <label className="block mb-4 text-lg font-bold">Choose File(s):</label>
            {/* Render file previews */}
            {filePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`File Preview ${index + 1}`}
                className="mb-2 rounded-md"
                style={{ maxWidth: '100%', maxHeight: '150px' }}
              />
            ))}
            <input
              type="file"
              onChange={handleFileChange}
              multiple
              required
              className="mb-4 p-2 border border-gray-400 rounded-md block"
            />
            <select
              name="architecture"
              id="architecture"
              onChange={(e) => setArchitecture(e.target.value)}
              className="block mx-auto w-full my-2 h-10 md:my-4 p-2 border border-gray-400 rounded-md"
            >
              <option value="selectArea">--Select Area--</option>
              <option value="bridge">Bridge</option>
              <option value="building">Building</option>
              <option value="city">City</option>
              <option value="others">Others</option>
            </select>
            <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
              Submit
            </button>
          </form>
        ) : (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Output Sections:</h2>
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
              {/* Your first output section */}
              {responseMsg && <p className="text-gray-700 md:text-2xl">{responseMsg}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileBox;
