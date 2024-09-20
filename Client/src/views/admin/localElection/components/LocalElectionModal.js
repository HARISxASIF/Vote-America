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

const LocalElectionModal = ({
  isOpen,
  onClose,
  isEditing,
  newLocalElection,
  handleInputChange,
  handleAddLocalElection,
  handleUpdateLocalElection,
  handleImageChange,
  handleIconChange,
}) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
          {isEditing ? 'Update Local Election' : 'Add Local Election'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>First name:</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Enter name"
            value={newLocalElection.name}
            onChange={handleInputChange}
          />

           {/* Image Upload */}
           <FormLabel mt="15px">Local Election Image</FormLabel>
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange} // NEW: Handle file input change
          />

<FormLabel mt="15px">Local Election Icon</FormLabel>
          <Input
            type="file"
            name="icon"
            accept="image/*"
            onChange={handleIconChange} // NEW: Handle file input change
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
            onClick={isEditing ? handleUpdateLocalElection : handleAddLocalElection}
          >
            {isEditing ? 'Update Local Election' : 'Add Local Election'}
          </Button>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default LocalElectionModal;