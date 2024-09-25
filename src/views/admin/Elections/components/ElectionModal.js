import React, { useEffect, useState } from 'react';
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
import addElection from '../../../../action/Election-API/addElections'; // Import the addElection function
import { updateElection } from '../../../../action/Election-API/updateElection'; // Import the updateElection function
import Swal from 'sweetalert2';

const ElectionModal = ({ isOpen, onClose, onSuccess, selectedElection }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const token = localStorage.getItem('authToken'); // Replace with your actual token

  useEffect(() => {
    if (selectedElection) {
      setName(selectedElection.name);
      // Reset image and icon when opening the modal
      setImage(null);
      setIcon(null);
    } else {
      resetForm(); // Reset form for adding a new election
    }
  }, [selectedElection, isOpen]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('icon', icon);

    try {
      if (selectedElection) {
        await updateElection(selectedElection._id, name, image, icon, token); // Update election
        Swal.fire({
          title: "Success!",
          text: 'Election updated successfully!',
          icon: "success",
          confirmButtonColor: "#082463",
        });
      } else {
        await addElection(formData, token); // Add new election
        Swal.fire({
          title: "Success!",
          text: 'Election added successfully!',
          icon: "success",
          confirmButtonColor: "#082463",
        });
      }
      onSuccess(); // Call onSuccess to refresh the election list
      onClose(); // Close the modal
      resetForm(); // Reset form fields
    } catch (error) {
      selectedElection ? 
      Swal.fire({
        title: "Error!",
        text: 'Failed to update election',
        icon: "error",
        confirmButtonColor: "#f00",
      })
       : 
       Swal.fire({
        title: "Error!",
        text: 'Failed to add election',
        icon: "error",
        confirmButtonColor: "#f00",
      })
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
      <ModalContent maxWidth="650px">
        <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
          {selectedElection ? 'Update Election' : 'Add Election'}
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
              pt="5px"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required={!selectedElection} // Make it required only when adding
            />

            <FormLabel mt="15px">Election Icon</FormLabel>
            <Input
              pt="5px"
              type="file"
              accept="image/*"
              onChange={(e) => setIcon(e.target.files[0])}
              required={!selectedElection} // Make it required only when adding
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
              {selectedElection ? 'Update Election' : 'Add Election'}
            </Button>
          </form>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ElectionModal;
