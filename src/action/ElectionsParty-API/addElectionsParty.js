import BASE_URL from '../../config';

const addElectionParty = async (formData, token) => {
    try {
      const response = await fetch(`${BASE_URL}/election/party/store`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`, // Replace with your actual token if needed
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        console.error('Error Election Party Details:', result);
        throw new Error(result.errors || 'Failed to add election party ');
      }
  
      console.log('Election Party added successfully:', result);
      return result; // Return the result for further handling
    } catch (error) {
      console.error('Error while adding election party:', error.message);
      throw error; // Rethrow the error to handle it in the main file
    }
  };
  
  export default addElectionParty;
  