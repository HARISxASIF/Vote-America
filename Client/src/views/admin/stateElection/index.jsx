'use client';

import React, { useState } from 'react';
import { Button, Flex, Box } from '@chakra-ui/react';
import StateElectionModal from './components/StateElectionModal';
import StateElectionTable from './components/StateElectionTable';
import { useDisclosure } from '@chakra-ui/react';

export default function StateElectionsData() {
  const [stateElections, setStateElections] = useState([
    { id: 1, name: 'Governor Election', image: 'https://alchetron.com/cdn/john-doe-musician-8ffff17f-5d57-4345-bda0-090736fdb6f-resize-750.jpeg' },
    { id: 2, name: 'Senate Election', image: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/163901_v9_ba.jpg' },
  ]);

  const [newStateElection, setNewStateElection] = useState({ name: '', image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [currentStateElection, setCurrentStateElection] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewStateElection({
      ...newStateElection,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewStateElection({ ...newStateElection, image: file });
  };

  // Add a new state election
  const handleAddStateElection = () => {
    setStateElections([
      ...stateElections,
      { id: Date.now(), name: newStateElection.name,
        image: newStateElection.image instanceof File
        ? URL.createObjectURL(newStateElection.image)
        : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
      },
    ]);
    setNewStateElection({ name: '', image: null });
    onClose();
  };

  // Manage new state election
  const handleManageStateElection = () => {
    onOpen();
    setIsEditing(false);
    setCurrentStateElection(null);
  };

  // Edit state election data
  const handleEditStateElection = (stateElection) => {
    onOpen();
    setIsEditing(true);
    setCurrentStateElection(stateElection);
    setNewStateElection(stateElection);
  };

  // Update the edited state election
  const handleUpdateStateElection = () => {
    setStateElections(
      stateElections.map((stateElection) =>
        stateElection.id === currentStateElection.id
          ? { ...currentStateElection, 
            name: newStateElection.name, 
            image: newStateElection.image instanceof File
              ? URL.createObjectURL(newStateElection.image)
              : currentStateElection.image, }
          : stateElection
      )
    );
    setIsEditing(false);
    setNewStateElection({ name: '', image: null });
    setCurrentStateElection(null);
    onClose();
  };

  // Delete a state election
  const handleDeleteStateElection = (id) => {
    setStateElections(stateElections.filter((stateElection) => stateElection.id !== id));
  };

  return (
    <div style={{ position: 'relative', top: '80px' }}>
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
            onClick={() => handleManageStateElection()}
            bg="#082463"
            color="#fff"
            borderRadius="5px"
            _hover={{ bg: '#CF2B28' }}
            _active={{ bg: '#082463' }}
            _focus={{ bg: '#082463' }}
          >
            Add State Election +
          </Button>
        </Box>
      </Flex>

      <StateElectionModal
        isOpen={isOpen}
        onClose={onClose}
        isEditing={isEditing}
        newStateElection={newStateElection}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleAddStateElection={handleAddStateElection}
        handleUpdateStateElection={handleUpdateStateElection}
      />

      <StateElectionTable
        stateElections={stateElections}
        handleEditStateElection={handleEditStateElection}
        handleDeleteStateElection={handleDeleteStateElection}
      />
    </div>
  );
}
