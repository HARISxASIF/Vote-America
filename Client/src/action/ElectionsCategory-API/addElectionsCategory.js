// addElection.js
const addElectionCategory = async (formData, token) => {
    try {
      const response = await fetch('http://3.17.77.207:3000/election/category/store', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`, // Replace with your actual token if needed
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error('Error Category Details:', result);
        throw new Error(result.errors || 'Failed to add election category ');
      }
  
      console.log('Election Category added successfully:', result);
      return result; // Return the result for further handling
    } catch (error) {
      console.error('Error while adding election category:', error.message);
      throw error; // Rethrow the error to handle it in the main file
    }
  };
  
  export default addElectionCategory;
  