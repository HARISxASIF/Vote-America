export const updateElectionCategory = async (id, name,description, image, election_id, token) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('image', image);
    formData.append('election_id', election_id);
  
    try {
      const response = await fetch(`http://3.17.77.207:3000/election/category/update/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.errors || 'Failed to update election');
      }
  
      return result; // Return the updated election data
    } catch (error) {
      console.error('Error while updating election:', error);
      throw error;
    }
  };