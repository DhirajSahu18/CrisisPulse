import React, { useState } from 'react';

const FileBox = () => {
  const [files, setFiles] = useState([]);
  const [showOutput, setShowOutput] = useState(false);
  const [responseMsg, setresponseMsg] = useState(null);
  const [threatLevel, setthreatLevel] = useState('');
  const [Architecture, setArchitecture] = useState(null)

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
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
      console.log(formData)
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      // Handle the response as needed
      const responseData = await response.json();
      console.log('Response:', responseData);
      const level = responseData?.predicted_threat_level;
      let texts = ''
      switch (level) {
        case 0:
          texts = 'No Damage'
          setthreatLevel('No Damage')
          break;
        case 1:
          texts = 'Minor Damage'
          setthreatLevel('Minor Damage')
          break;
        case 2:
          setthreatLevel('High Damage')
          texts = 'High Damage'
          break;
        case 3:
          texts = 'Totally Destroyed'
          setthreatLevel('Totally Destroyed')
          break;
        default:
          break;
      }
      const msg = `How can I reinforce a ${Architecture} if the whole architecture has level ${level} danger and the destruction type was ${texts}`
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

      const data = await response.json();
      console.log('Data received:', data);
      setresponseMsg(data.result)
      setShowOutput(true);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (<div className="w-full min-h-[500px] flex align-baseline">
    <div className="p-8 mx-auto bg-gray-200 rounded-md min-h-[200px] my-auto md:max-w-[80%]">
      {!showOutput ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <label className="block mb-4 text-lg font-bold">Choose File(s):</label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            required
            className="mb-4 p-2 border border-gray-400 rounded-md block"
          />
          <select name="Architecture" id="Architecture" onChange={e => setArchitecture(e.target.value)}>
            <option value="bridge">bridge</option>
            <option value="building">building</option>
            <option value="city">city</option>
            <option value="others">others</option>
          </select>
          <button className="bg-blue-500 text-white p-2 rounded-md" type='submit'>
            Submit
          </button>
        </form>
      ) : (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Output Sections:</h2>
          <div className="bg-white p-4 rounded-md shadow-md mb-4">
            {/* Your first output section */}
            <h3 className="text-lg font-semibold mb-2">Section 1:</h3>
            {responseMsg && <p className="text-gray-700">{responseMsg}</p>}
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
