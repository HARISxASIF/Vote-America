// apiRequest.js

export async function apiRequest(url, options = {}) {
    const authToken = localStorage.getItem('authToken');
  
    // Add Authorization header if token exists
    if (authToken) {
      options.headers = {
        ...options.headers,
        Authorization: `${authToken}`,
      };
    }
  
    try {
      const response = await fetch(url, options);
  
      if (response.status === 400) {
        // Check if the response contains "Invalid token" message
        const responseData = await response.json();
        if (responseData.message === 'Invalid Token') {
          handleLogout(); // Logout and redirect user
          return null; // Explicitly return null to indicate failure
        }
      }
  
      // Check for other non-200 responses
      if (!response.ok) {
        throw new Error(response.statusText);
      }
  
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error; // Throw error for further handling if needed
    }
  }
  
  function handleLogout() {
    localStorage.removeItem('authToken');
    window.location.href = '/auth/sign-in'; // Redirect to sign-in page
  }
  