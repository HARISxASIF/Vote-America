import BASE_URL from '../../config';
import { apiRequest } from '../Login API/apiRequest';

export const fetchCandidates = async () => {
  try {
    // Replace with your API endpoint
    const response = await apiRequest(`${BASE_URL}/candidates`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response === null) {
      // This means the token was invalid and the user was logged out
      return;
    }

    // The response has already been parsed as JSON in apiRequest
    return response;
  } catch (error) {
    console.error('Error fetching candidates:', error);
    throw error; // Re-throw the error if you want to handle it further up
  }
};
