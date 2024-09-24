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
} from '@chakra-ui/react';
import addElectionCategory from '../../../../action/ElectionsCategory-API/addElectionsCategory'; // Import the addElection function
import { updateElectionCategory } from '../../../../action/ElectionsCategory-API/updateElectionCategory'; // Import the updateElection function

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
      setImage(null);
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
    formData.append('image', image);
    formData.append('election_id', election_id);

    try {
      if (selectedElectionCat) {
        await updateElectionCategory(selectedElectionCat._id, name,description, image, election_id, token); // Update election
        alert('Election Category updated successfully!');
      } else {
        await addElectionCategory(formData, token); // Add new election
        alert('Election Category added successfully!');
      }
      onSuccess(); // Call onSuccess to refresh the election list
      onClose(); // Close the modal
      resetForm(); // Reset form fields
    } catch (error) {
      alert(selectedElectionCat ? 'Failed to update election category' : 'Failed to add election category');
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
      <ModalContent>
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
            <FormLabel mt="15px">Description:</FormLabel>
            <Input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            />

            <FormLabel mt="15px">Election Category Image</FormLabel>
            <Input
              pt="5px"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required={!selectedElectionCat} // Make it required only when adding
            />

            <FormLabel mt="15px">Election Category</FormLabel>
            {/* {selectedElectionCat ?
            <Input
              type="text"
              value={election_id}
              onChange={(e) => setElection_id(e.target.value)}
              placeholder="Enter Election Category"
              required
            />
            : */}
           <Select value={election_id} onChange={(e) => setElection_id(e.target.value)} placeholder='Select Election Category'>
              {parentElections.map((election) => (
                <option key={election._id} value={election._id}>
                  {election.name} {/* Display election name */}
                </option>
              ))}
            </Select>

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
