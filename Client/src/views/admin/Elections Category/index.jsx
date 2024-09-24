import React, { useEffect, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { fetchElectionsCategory } from '../../../action/ElectionsCategory-API/getElectionCategory';
import ElectionCategoryTable from './components/ElectionCategoryTable';
import ElectionCategoryModal from './components/ElectionCategoryModal'; // Import the ElectionModal
// import { updateElection } from '../../../action/Election-API/updateElection'; // Import the update function

const ElectionsCategoryData = () => {
  const [electionsCat, setElectionsCat] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedElection, setSelectedElection] = useState(null);
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

  useEffect(() => {
    getElections();
  }, []);

  const handleEdit = (election) => {
    setSelectedElection(election); // Set the selected election
    setIsModalOpen(true); // Open the modal
  };

  // const handleUpdateElection = async (name, image, icon) => {
  //   if (selectedElection) {
  //     try {
  //       await updateElection(selectedElection._id, name, image, icon, token);
  //       alert('Election updated successfully!');
  //       getElections(); // Refresh the elections list
  //       setIsModalOpen(false); // Close the modal
  //     } catch (error) {
  //       alert('Failed to update election');
  //     }
  //   }
  // };

  return (
    <div>
      <Flex
        maxW="100%"
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="center"
        justifyContent="end"
      >
        <Box>
          <Button
            onClick={() => setIsModalOpen(true)}
            bg="#082463"
            color="#fff"
            borderRadius="5px"
            _hover={{ bg: '#CF2B28' }}
            _active={{ bg: '#082463' }}
            _focus={{ bg: '#082463' }}
            position="relative"
            top="100px"
            zIndex="999"
          >
            Add Election +
          </Button>
        </Box>
      </Flex>
      <ElectionCategoryTable 
        electionsCat={electionsCat} 
        // onEdit={handleEdit} 
        onDelete={getElections} // Pass onDelete function to refresh list after deletion
        token={token} // Pass the token for authorization
      />
      <ElectionCategoryModal
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

export default ElectionsCategoryData;
