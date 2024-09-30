import BASE_URL from '../../config';

export const updateUser = async (id, personal_details_status, government_photo_id_status, token) => {
  try {
    const response = await fetch(`${BASE_URL}/user/change/status/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json', // Set content type to JSON
      },
      body: JSON.stringify({
        personal_details_status,  // Send data as JSON
        government_photo_id_status
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.errors || 'Failed to update user');
    }

    return result; // Return the updated user data
  } catch (error) {
    console.error('Error while updating user:', error);
    throw error;
  }
};
