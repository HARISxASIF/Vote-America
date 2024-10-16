import BASE_URL from '../../config';

const deleteUser = async (userId, token) => {
  const url = `${BASE_URL}/user/delete/${userId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
      },
    });

    if (response.ok) {
      return { success: true, message: 'User deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete user' };
    }
  } catch (error) {
    console.error('Error deleting user :', error);
    return { success: false, message: 'Error deleting user' };
  }
};

export default deleteUser;
