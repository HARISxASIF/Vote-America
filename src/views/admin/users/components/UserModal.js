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

const UserModal = ({
  isOpen,
  onClose,
  isEditing,
  newUser,
  handleInputChange,
  handleAddUser,
  handleUpdateUser,
}) => {
  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
          {isEditing ? 'Update User' : 'Add User'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormLabel>First name:</FormLabel>
          <Input
            type="text"
            name="name"
            placeholder="Enter name"
            value={newUser.name}
            onChange={handleInputChange}
          />

          <FormLabel mt="15px">Phone No.</FormLabel>
          <Input
            type="number"
            name="phone"
            placeholder="Enter phone number"
            value={newUser.phone}
            onChange={handleInputChange}
          />

          <FormLabel>Email:</FormLabel>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={newUser.email}
            onChange={handleInputChange}
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
            onClick={isEditing ? handleUpdateUser : handleAddUser}
          >
            {isEditing ? 'Update User' : 'Add User'}
          </Button>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default UserModal;