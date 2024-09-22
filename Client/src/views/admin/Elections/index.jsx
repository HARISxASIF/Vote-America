import React, { useEffect, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react'; // Import Chakra UI Button
import { fetchElections } from '../../../action/getElection';
import ElectionTable from './components/ElectionTable';
import ElectionModal from './components/ElectionModal'; // Import the ElectionModal

const ElectionsData = () => {
  const [elections, setElections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const token = localStorage.getItem('authToken'); // Replace with your actual token

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
            onClick={() => setIsModalOpen(true)} // Open modal
            bg="#082463"
            color="#fff"
            borderRadius="5px"
            _hover={{ bg: '#CF2B28' }}
            _active={{ bg: '#082463' }}
            _focus={{ bg: '#082463' }}
            position="relative"
            top= "100px"
            zIndex= "999"
          >
            Add Election +
          </Button>
        </Box>
      </Flex>
      <ElectionTable elections={elections} />
      <ElectionModal
        isOpen={isModalOpen} // Pass modal state
        onClose={() => setIsModalOpen(false)} // Close modal
        onSuccess={getElections} // Refresh elections after adding
      />
    </div>
  );
};

export default ElectionsData;
