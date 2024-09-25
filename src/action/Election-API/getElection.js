import BASE_URL from '../../config';

export const fetchElections = async () => {
    const token = localStorage.getItem('authToken'); // Retrieve the auth token
  
    try {
      // Replace with your API endpoint
      const response = await fetch(`${BASE_URL}/elections`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, // Include the authorization header
        },
      });
  
      // Check if the response status is OK (200-299)
      if (!response.ok) {
        // Log the full response for debugging
      const errorDetails = await response.json();
      console.error('Error Details:', errorDetails);

      throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json(); // Parse the JSON data
      // console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching elections:', error);
      throw error; // Re-throw the error if you want to handle it further up
    }
  };