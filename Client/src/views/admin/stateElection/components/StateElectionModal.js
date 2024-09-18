// UserModal.js
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

const StateElectionModal = ({
  isOpen,
  onClose,
  isEditing,
  newStateElection,
  handleInputChange,
  handleAddStateElection,
  handleUpdateStateElection,
  handleImageChange,
}) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
          {isEditing ? 'Update State Election' : 'Add State Election'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>First name:</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Enter name"
            value={newStateElection.name}
            onChange={handleInputChange}
          />

           {/* Image Upload */}
           <FormLabel mt="15px">Stage Election Image:</FormLabel>
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange} // NEW: Handle file input change
          />

          <Button
            fontSize="16px"
            variant="brand"
            fontWeight="500"
            w="100%"
            h="40px"
            borderRadius="5px"
            mt="30px"
            bg="#082463"
            _hover={{ bg: '#CF2B28' }}
            _active={{ bg: '#082463' }}
            _focus={{ bg: '#082463' }}
            onClick={isEditing ? handleUpdateStateElection : handleAddStateElection}
          >
            {isEditing ? 'Update State Election' : 'Add State Election'}
          </Button>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default StateElectionModal;