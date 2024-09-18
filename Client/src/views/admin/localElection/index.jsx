'use client';

import React, { useState } from 'react';
import { Button, Flex, Box } from '@chakra-ui/react';
import LocalElectionModal from './components/LocalElectionModal';
import LocalElectionTable from './components/LocalElectionTable';
import { useDisclosure } from '@chakra-ui/react';

export default function LocalElectionsData() {
  const [localElections, setLocalElections] = useState([
    { id: 1, name: 'City Mayor Election', image: 'https://alchetron.com/cdn/john-doe-musician-8ffff17f-5d57-4345-bda0-090736fdb6f-resize-750.jpeg' },
    { id: 2, name: 'District Council Election', image: 'https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/163901_v9_ba.jpg' },
  ]);

  const [newLocalElection, setNewLocalElection] = useState({ name: '', image: null });
  const [isEditing, setIsEditing] = useState(false);
  const [currentLocalElection, setCurrentLocalElection] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewLocalElection({
      ...newLocalElection,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewLocalElection({ ...newLocalElection, image: file });
  };

  // Add a new local election
  const handleAddLocalElection = () => {
    setLocalElections([
      ...localElections,
      { id: Date.now(), name: newLocalElection.name,
        image: newLocalElection.image instanceof File
        ? URL.createObjectURL(newLocalElection.image)
        : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
      },
    ]);
    setNewLocalElection({ name: '', image: null });
    onClose();
  };

  // Manage new local election
  const handleManageLocalElection = () => {
    onOpen();
    setIsEditing(false);
    setCurrentLocalElection(null);
  };

  // Edit local election data
  const handleEditLocalElection = (localElection) => {
    onOpen();
    setIsEditing(true);
    setCurrentLocalElection(localElection);
    setNewLocalElection(localElection);
  };

  // Update the edited local election
  const handleUpdateLocalElection = () => {
    setLocalElections(
      localElections.map((localElection) =>
        localElection.id === currentLocalElection.id
          ? { ...currentLocalElection, 
            name: newLocalElection.name, 
            image: newLocalElection.image instanceof File
              ? URL.createObjectURL(newLocalElection.image)
              : currentLocalElection.image, }
          : localElection
      )
    );
    setIsEditing(false);
    setNewLocalElection({ name: '', image: null });
    setCurrentLocalElection(null);
    onClose();
  };

  // Delete a local election
  const handleDeleteLocalElection = (id) => {
    setLocalElections(localElections.filter((localElection) => localElection.id !== id));
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
            onClick={() => handleManageLocalElection()}
            bg="#082463"
            color="#fff"
            borderRadius="5px"
            _hover={{ bg: '#CF2B28' }}
            _active={{ bg: '#082463' }}
            _focus={{ bg: '#082463' }}
          >
            Add Local Election +
          </Button>
        </Box>
      </Flex>

      <LocalElectionModal
        isOpen={isOpen}
        onClose={onClose}
        isEditing={isEditing}
        newLocalElection={newLocalElection}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleAddLocalElection={handleAddLocalElection}
        handleUpdateLocalElection={handleUpdateLocalElection}
      />

      <LocalElectionTable
        localElections={localElections}
        handleEditLocalElection={handleEditLocalElection}
        handleDeleteLocalElection={handleDeleteLocalElection}
      />
    </div>
  );
}
