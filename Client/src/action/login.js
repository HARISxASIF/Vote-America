export async function login(variables) {
    const bodyData = variables;
    try {
      const response = await fetch('http://3.17.77.207:3000/login', {
        method: 'POST',
        headers: { // Fixed the casing to `headers`
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: JSON.stringify(bodyData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log(response, 'response');
    //   const data = await response.json();
  } catch (error) {
    console.log(error, 'error');
  }
}
