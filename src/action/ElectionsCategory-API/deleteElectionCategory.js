import BASE_URL from '../../config';

const deleteElectionCategory = async (electionCatId, token) => {
  const url = `${BASE_URL}/election/category/delete/${electionCatId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
      },
    });

    if (response.ok) {
      return { success: true, message: 'Election Category deleted successfully' };
    } else {
      return { success: false, message: 'Failed to delete election category' };
    }
  } catch (error) {
    console.error('Error deleting election category:', error);
    return { success: false, message: 'Error deleting election category' };
  }
};

export default deleteElectionCategory;
