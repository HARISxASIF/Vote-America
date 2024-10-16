import BASE_URL from '../../config';

const showUser = async (userId, token) => {
  const url = `${BASE_URL}/user/show/${userId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      return { success: false, message: 'Failed to fetch user data' };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { success: false, message: 'Error fetching user data' };
  }
};

export default showUser;
