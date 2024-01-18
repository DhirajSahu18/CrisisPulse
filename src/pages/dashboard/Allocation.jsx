import { StatisticsChart } from '@/widgets/charts';
import { ClockIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const Allocation = () => {
  const [count, setCount] = useState(0);
  const [resAllocation, setResAllocation] = useState([8,9,6]);
  const [fileInputs, setFileInputs] = useState([]);
  const [outputVisible, setOutputVisible] = useState(false);
  const [pieChart, setPieChart] = useState(null);

  useEffect(() => {
    // Generate pieChart options dynamically based on resAllocation
    if (resAllocation && resAllocation.length > 0) {
      const labels = resAllocation.map((_, index) => `Area ${index + 1}`);
      const newPieChart = {
        type: 'pie',
        height: 220,
        series: resAllocation,
        options: {
          labels,
        },
      };
      setPieChart(newPieChart);
    }
  }, [resAllocation]);

  const handleCountChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    setCount(newCount);

    // Generate initial fileInputs array with empty values
    const newFileInputs = Array.from({ length: newCount }, (_, index) => ({
      id: index + 1,
      file: null,
      population: '', // Start with an empty population
    }));
    setFileInputs(newFileInputs);
    setOutputVisible(false);
  };

  const handleFileInputChange = (index, files) => {
    // Update the file input in the array
    setFileInputs((prevFileInputs) => {
      const updatedFileInputs = [...prevFileInputs];
      updatedFileInputs[index].file = files[0];
      return updatedFileInputs;
    });
  };

  const handlePopulationInputChange = (index, value) => {
    // Update the population input in the array
    setFileInputs((prevFileInputs) => {
      const updatedFileInputs = [...prevFileInputs];
      updatedFileInputs[index].population = value;
      return updatedFileInputs;
    });
  };

  const handleSubmit = async () => {
    const updatedFileInputs = [];

    // Loop through each file input
    for (let index = 0; index < count; index++) {
      const fileInput = fileInputs[index];

      // Skip if file is not added
      if (!fileInput.file) {
        continue;
      }

      // Create FormData for the current file
      const formData = new FormData();
      formData.append('file', fileInput.file);

      // Make a POST request to the API
      const apiUrl = 'http://127.0.0.1:5000/sat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      // Handle the response as needed
      const responseData = await response.json();
      const level = responseData?.predicted_threat_level;

      // Add the level and population to the updatedFileInputs array
      updatedFileInputs.push({
        [level]: fileInput.population,
      });
    }

    const Allocationresponse = await fetch(`http://127.0.0.1:5000/allocation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { data: updatedFileInputs },
    });

    // Handle the response as needed
    const AllocationresponseData = await Allocationresponse.json();
    const AllocationPercentage = AllocationresponseData.result;
    setResAllocation(AllocationPercentage);
    // Set the updated fileInputs array in the state
    setFileInputs(updatedFileInputs);

    // Display the output only if all file inputs have been added
    if (updatedFileInputs.length === count) {
      setOutputVisible(true);
    }
  };
  const props = {
      color: "white",
      title: "pie Chart",
      description: "This Week Predictions",
      footer: "campaign sent 3 days ago",
      chart: pieChart,
    }
  return (
    <div className="flex items-center justify-center h-fit md:max-w-[80%] flex-col">
      <div className="bg-gray-200 p-8 rounded-md mt-4">
        <label className="block mb-4 text-lg font-bold">Enter Number:</label>
        <input
          type="number"
          value={count}
          onChange={handleCountChange}
          className="mb-4 p-2 border border-gray-400 rounded-md block"
        />

        {/* Render file inputs based on the count */}
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="mb-4">
            <input
              type="file"
              onChange={(e) => handleFileInputChange(index, e.target.files)}
              className="mb-2 p-2 border border-gray-400 rounded-md block"
            />
            <input
              type="text"
              placeholder={`Population ${index + 1}`}
              value={fileInputs[index]?.population || ''}
              onChange={(e) => handlePopulationInputChange(index, e.target.value)}
              className="p-2 border border-gray-400 rounded-md block"
            />
          </div>
        ))}

        <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded-md" type="button">
          Submit
        </button>

        {/* Display the output if all file inputs are added */}
        {outputVisible && (
          <div className="mt-4">
            <h2 className="text-xl font-bold mb-2">Output:</h2>
            {pieChart && <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-blue-gray-400" />
                &nbsp;{props.footer}
              </Typography>
            }
          />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Allocation;
