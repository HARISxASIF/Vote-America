import BASE_URL from '../../config';

export const updateElectionParty = async (id, name,description, icon, election_id, token) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('icon', icon);
    formData.append('election_id', election_id);
  
    try {
      const response = await fetch(`${BASE_URL}/election/party/update/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.errors || 'Failed to update election party');
      }
  
      return result; // Return the updated election party data
    } catch (error) {
      console.error('Error while updating election party:', error);
      throw error;
    }
  };