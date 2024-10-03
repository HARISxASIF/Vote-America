import BASE_URL from '../../config';

export const updateElectionCategory = async (id, formData, token) => {
  try {

    // If there is no image, do not include it in the form data
    if (!formData.get('image')) {
      formData.delete('image');
    }

    const response = await fetch(`${BASE_URL}/election/category/update/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors || 'Failed to update election category');
    }

    return result; // Return the updated election category data
  } catch (error) {
    console.error('Error while updating election category:', error);
    throw error;
  }
};
