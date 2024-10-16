import BASE_URL from '../../config';

const showCandidate = async (candidateId, token) => {
  const url = `${BASE_URL}/candidate/show/${candidateId}`;

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
      return { success: false, message: 'Failed to fetch candidate data' };
    }
  } catch (error) {
    console.error('Error fetching candidate data:', error);
    return { success: false, message: 'Error fetching candidate data' };
  }
};

export default showCandidate;
