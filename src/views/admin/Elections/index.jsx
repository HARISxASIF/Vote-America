import React, { useEffect, useState } from 'react';
import { fetchElections } from '../../../action/Election-API/getElection';
import ElectionTable from './components/ElectionTable';
import ElectionModal from './components/ElectionModal'; // Import the ElectionModal

const ElectionsData = () => {
  const [elections, setElections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedElection, setSelectedElection] = useState(null);
  const token = localStorage.getItem('authToken');

  const getElections = async () => {
    try {
      const data = await fetchElections();
      console.log('Fetched Elections:', data);
      setElections(data.elections);
    } catch (error) {
      console.error('Failed to fetch elections:', error);
    }
  };

  useEffect(() => {
    getElections();
  }, []);

  const handleEdit = (election) => {
    setSelectedElection(election); // Set the selected election
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div>
      <ElectionTable 
        elections={elections} 
        onEdit={handleEdit} 
        onDelete={getElections} // Pass onDelete function to refresh list after deletion
        token={token} // Pass the token for authorization
        openModal={() => setIsModalOpen(true)}
      />
      <ElectionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedElection(null); // Clear selected election when closing
        }}
        onSuccess={getElections}
        selectedElection={selectedElection}
      />
    </div>
  );
};

export default ElectionsData;
