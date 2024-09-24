// addElection.js
const addElection = async (formData, token) => {
    try {
      const response = await fetch('http://3.17.77.207:3000/election/store', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`, // Replace with your actual token if needed
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error('Error Details:', result);
        throw new Error(result.errors || 'Failed to add election');
      }
  
      console.log('Election added successfully:', result);
      return result; // Return the result for further handling
    } catch (error) {
      console.error('Error while adding election:', error.message);
      throw error; // Rethrow the error to handle it in the main file
    }
  };
  
  export default addElection;
  