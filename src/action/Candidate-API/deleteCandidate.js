import BASE_URL from '../../config';

const deleteCandidate = async (candidateId, token) => {
  const url = `${BASE_URL}/candidate/delete/${candidateId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
      },
    });

    if (response.ok) {
      return { success: true, message: 'Candidate deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete candidate' };
    }
  } catch (error) {
    console.error('Error deleting candidate:', error);
    return { success: false, message: 'Error deleting candidate' };
  }
};

export default deleteCandidate;
