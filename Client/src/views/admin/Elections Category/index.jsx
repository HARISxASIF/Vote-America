import React, { useEffect, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { fetchElectionsCategory } from '../../../action/ElectionsCategory-API/getElectionCategory';
import { fetchElections } from '../../../action/Election-API/getElection'; // Import the fetch function for parent elections
import ElectionCategoryTable from './components/ElectionCategoryTable';
import ElectionCategoryModal from './components/ElectionCategoryModal'; // Import the ElectionModal
// import { updateElection } from '../../../action/Election-API/updateElection'; // Import the update function


const ElectionsCategoryData = () => {
  const [electionsCat, setElectionsCat] = useState([]);
  const [parentElections, setParentElections] = useState([]); // State for parent elections
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedElectionCat, setSelectedElectionCat] = useState(null);
  const token = localStorage.getItem('authToken');

  const getElections = async () => {
    try {
      const data = await fetchElectionsCategory();
      console.log('Fetched Elections Category:', data);
      setElectionsCat(data.electionCategories);
    } catch (error) {
      console.error('Failed to fetch elections category:', error);
    }
  };

  const getParentElections = async () => {
    try {
      const data = await fetchElections(); // Fetch parent elections data
      setParentElections(data.elections); // Store it in state
      // console.log(data.elections)
    } catch (error) {
      console.error('Failed to fetch parent elections:', error);
    }
  };



  useEffect(() => {
    getElections();
    getParentElections();
  }, []);

  const handleEdit = (election) => {
    setSelectedElectionCat(election); // Set the selected election
    setIsModalOpen(true); 
  };

  return (
    <div>
      <ElectionCategoryTable 
        electionsCat={electionsCat} 
        parentElections={parentElections} 
        onEdit={handleEdit} 
        onDelete={getElections} 
        token={token} 
        openModal={() => setIsModalOpen(true)}
      />
      <ElectionCategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedElectionCat(null); // Clear selected election when closing
        }}
        onSuccess={getElections}
        selectedElectionCat={selectedElectionCat}
        parentElections={parentElections}
      />
    </div>
  );
};

export default ElectionsCategoryData;
