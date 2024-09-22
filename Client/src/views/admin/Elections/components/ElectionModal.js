import React, { useState } from 'react';
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
import addElection from '../../../../action/addElections'; // Import the addElection function

const ElectionModal = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const token = localStorage.getItem('authToken'); // Replace with your actual token

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('icon', icon);

    try {
      await addElection(formData, token); // Call the addElection function
      onSuccess(); // Call onSuccess to refresh the election list
      onClose(); // Close the modal
      resetForm(); // Reset form fields
    } catch (error) {
      alert('Failed to add election');
    }
  };

  const resetForm = () => {
    setName('');
    setImage(null);
    setIcon(null);
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
          Add Election
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              required
            />

            <FormLabel mt="15px">Election Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />

            <FormLabel mt="15px">Election Icon</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setIcon(e.target.files[0])}
              required
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
              type="submit"
            >
              Add Election
            </Button>
          </form>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ElectionModal;