import BASE_URL from '../../config';
import { apiRequest } from '../Login API/apiRequest';

export const fetchElectionsParty = async () => {
  try {
    // Make the API request using the centralized function
    const data = await apiRequest(`${BASE_URL}/election/parties`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // If the response is null (indicating a failed login due to an invalid token), return early
    if (data === null) return null;

    // Otherwise, return the data fetched from the API
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching election parties:', error);
    throw error; // Re-throw the error if you want to handle it further up
  }
};
