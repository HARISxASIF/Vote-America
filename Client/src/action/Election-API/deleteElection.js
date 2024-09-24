const deleteElection = async (electionId, token) => {
    const url = `http://3.17.77.207:3000/election/delete/${electionId}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
        },
      });
  
      if (response.ok) {
        return { success: true, message: 'Election deleted successfully' };
      } else {
        return { success: false, message: 'Failed to delete election' };
      }
    } catch (error) {
      console.error('Error deleting election:', error);
      return { success: false, message: 'Error deleting election' };
    }
  };
  
  export default deleteElection;
  