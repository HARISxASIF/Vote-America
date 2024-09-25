import BASE_URL from '../../config';

const deleteElectionParty = async (partyId, token) => {
  const url = `${BASE_URL}/election/party/delete/${partyId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
      },
    });

    if (response.ok) {
      return { success: true, message: 'Election Party deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete election party' };
    }
  } catch (error) {
    console.error('Error deleting party category:', error);
    return { success: false, message: 'Error deleting election party' };
  }
};

export default deleteElectionParty;
