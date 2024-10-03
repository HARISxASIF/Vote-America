import BASE_URL from '../../config';

export const updateElection = async (id, formData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/election/update/${id}`, {
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
