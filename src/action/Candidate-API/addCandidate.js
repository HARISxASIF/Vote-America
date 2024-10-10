import BASE_URL from '../../config';

const addCandidate = async (formData, token) => {
    try {
      const response = await fetch(`${BASE_URL}/candidate/create`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`, // Replace with your actual token if needed
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error('Error candidate Details:', result);
        throw new Error(result.errors || 'Failed to add candidate ');
      }
  
      console.log('Candidate added successfully:', result);
      return result; // Return the result for further handling
    } catch (error) {
      console.error('Error while adding candidate:', error.message);
      throw error; // Rethrow the error to handle it in the main file
    }
  };
  
  export default addCandidate;
  