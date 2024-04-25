import React, { useEffect, useState } from 'react';
import Task3 from './Task3';
import NavbarInit from './Navbar';

function App() {
  const [data, setData] = useState({ paper: [], reviewers: [] });
  const [loading, setLoading] = useState(false);  // Define loading state
  const [error, setError] = useState(null);       // Define error state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);  // Start loading before the fetch operation
      try {
        const response = await fetch('http://localhost:3001/api/data');
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log("Data fetched from server:", data);
        setData(data);  // Update state with fetched data
        setError(null); // Clear any existing errors
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError(err.message);  // Set error message
      } finally {
        setLoading(false);  // Stop loading after fetch completes
      }
    };
  
    fetchData();
  }, []);

  // Conditional rendering based on state
  if (loading) return <p>Loading...</p>; // Display loading indicator
  if (error) return <p>Error: {error}</p>; // Display error message

  return (
    <div className='container'>
      <NavbarInit />
      <div className="content-wrapper">  
          <h3>Research Papers</h3>
          <div className="Assign">
            <Task3 data={data} />
          </div>
        </div>
    </div>
  );
}

export default App;
