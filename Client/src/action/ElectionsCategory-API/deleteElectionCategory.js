const deleteElectionCategory = async (electionCatId, token) => {
  const url = `http://3.17.77.207:3000/election/category/delete/${electionCatId}`;

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
