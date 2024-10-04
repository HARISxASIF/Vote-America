import BASE_URL from '../../config';
import { apiRequest } from '../Login API/apiRequest';

export const fetchUsers = async () => {
  try {
    // Use apiRequest to make the API call
    const response = await apiRequest(`${BASE_URL}/users`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is null (which indicates token expiration and logout)
    if (response === null) {
      console.warn('Session expired, user logged out.');
      return; // Exit if user is logged out
    }

    // The `apiRequest` function already handles the response parsing, so `response` here is the parsed data.
    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error; // Re-throw the error if you want to handle it further up
  }
};
