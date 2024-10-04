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
  Select,
  Textarea,
  HStack,
  FormControl,
} from '@chakra-ui/react';
import addElectionCategory from '../../../../action/ElectionsCategory-API/addElectionsCategory'; // Import the addElection function
import { updateElectionCategory } from '../../../../action/ElectionsCategory-API/updateElectionCategory'; // Import the updateElection function
import Swal from 'sweetalert2';

const ElectionCategoryModal = ({ isOpen, onClose, onSuccess, selectedElectionCat, parentElections  }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [election_id, setElection_id] = useState('');
  const token = localStorage.getItem('authToken'); // Replace with your actual token

  useEffect(() => {
    if (selectedElectionCat) {
      setName(selectedElectionCat.name);
      setDescription(selectedElectionCat.description);
      setImage(selectedElectionCat.image);
      setElection_id(selectedElectionCat.election_id);
    } else {
      resetForm(); // Reset form for adding a new election
    }
  }, [selectedElectionCat, isOpen]);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image && typeof image !== 'string') {
      formData.append('image', image);
    }
    formData.append('election_id', election_id);

    try {
      if (selectedElectionCat) {
        await updateElectionCategory(selectedElectionCat._id, formData, token); // Update election
        Swal.fire({
          title: "Success!",
          text: 'Election Category updated successfully!',
          icon: "success",
          confirmButtonColor: "#082463",
        });
      } else {
        await addElectionCategory(formData, token); // Add new election
        Swal.fire({
          title: "Success!",
          text: 'Election Category added successfully!',
          icon: "success",
          confirmButtonColor: "#082463",
        });
      }
      onSuccess(); // Call onSuccess to refresh the election list
      onClose(); // Close the modal
      resetForm(); // Reset form fields
    } catch (error) {
      selectedElectionCat ? 
      Swal.fire({
        title: "Error!",
        text: 'Failed to update election category',
        icon: "error",
        confirmButtonColor: "#f00",
      })
       : 
       Swal.fire({
        title: "Error!",
        text: 'Failed to add election category',
        icon: "error",
        confirmButtonColor: "#f00",
      })
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setImage(null);
    setElection_id('');
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="740px">
        <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
          {selectedElectionCat ? 'Update Election Category' : 'Add Election Category'}
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
            
            <HStack spacing="24px" alignItems="flex-start"> 
              <FormControl>
                <FormLabel mt="15px">Election Category Image</FormLabel>
                <Input
                  pt="5px"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required={!selectedElectionCat} // Make it required only when adding
                />
              </FormControl>

              <FormControl>
                <FormLabel mt="15px">Election Category</FormLabel>
                <Select value={election_id} onChange={(e) => setElection_id(e.target.value)} placeholder='Select Election Category'>
                    {parentElections.map((election) => (
                      <option key={election._id} value={election._id}>
                        {election.name} {/* Display election name */}
                      </option>
                    ))}
                </Select>
              </FormControl>
            </HStack>

            <FormLabel mt="15px">Description:</FormLabel>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Enter description'
              required
              size='lg'
              fontSize="1rem"
              minHeight="9rem"
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
              {selectedElectionCat ? 'Update Election Category' : 'Add Election Category'}
            </Button>
          </form>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ElectionCategoryModal;
