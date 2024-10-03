import BASE_URL from '../../config';
export async function login(variables) {
  const bodyData = variables;

  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        // Fixed the casing to `headers`
        'Content-Type': 'application/json', // Specify the content type as JSON
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      // throw new Error(`HTTP error! Status: ${response.status}`);
      return response;
    } else {
      const data = await response.json();
      // localStorage.setItem('authToken', data.token);

      return data;
    }
  } catch (error) {
    return error;
  }
}
