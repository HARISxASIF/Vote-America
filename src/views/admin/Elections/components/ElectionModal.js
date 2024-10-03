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
import addElection from '../../../../action/Election-API/addElections';
import { updateElection } from '../../../../action/Election-API/updateElection';
import Swal from 'sweetalert2';

const ElectionModal = ({ isOpen, onClose, onSuccess, selectedElection }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [icon, setIcon] = useState(null);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (selectedElection) {
      setName(selectedElection.name);
      // Set existing image and icon if available
      setImage(selectedElection.image);
      setIcon(selectedElection.icon);
    } else {
      resetForm(); // Reset form for adding a new election
    }
  }, [selectedElection, isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    
    // Only append image if a new one has been selected
    if (image && typeof image !== 'string') {
      formData.append('image', image);
    }
    // Only append icon if a new one has been selected
    if (icon && typeof icon !== 'string') {
      formData.append('icon', icon);
    }

    try {
      if (selectedElection) {
        await updateElection(selectedElection._id, formData, token);
        Swal.fire({
          title: "Success!",
          text: 'Election updated successfully!',
          icon: "success",
          confirmButtonColor: "#082463",
        });
      } else {
        await addElection(formData, token);
        Swal.fire({
          title: "Success!",
          text: 'Election added successfully!',
          icon: "success",
          confirmButtonColor: "#082463",
        });
      }
      onSuccess();
      onClose();
      resetForm();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: selectedElection ? 'Failed to update election' : 'Failed to add election',
        icon: "error",
        confirmButtonColor: "#f00",
      });
      onClose();
      resetForm();
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
