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
import addElectionParty from '../../../../action/ElectionsParty-API/addElectionsParty'; 
import { updateElectionParty } from '../../../../action/ElectionsParty-API/updateElectionParty';
import Swal from 'sweetalert2'

const ElectionPartyModal = ({ isOpen, onClose, onSuccess, selectedElectionParty, parentElections }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState(null);
  const [election_id, setElection_id] = useState('');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (selectedElectionParty) {
      setName(selectedElectionParty.name);
      setDescription(selectedElectionParty.description);
      setIcon(selectedElectionParty.icon);
      setElection_id(selectedElectionParty.election_id);
    } else {
      resetForm();
    }
  }, [selectedElectionParty, isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (icon && typeof icon !== 'string') {
      formData.append('icon', icon);
    }
    formData.append('election_id', election_id);

    try {
      if (selectedElectionParty) {
        await updateElectionParty(selectedElectionParty._id,formData, token);
        Swal.fire({
          title: "Success!",
          text: 'Election Party updated successfully!',
          icon: "success",
          confirmButtonColor: "#082463",
        });
      } else {
        await addElectionParty(formData, token);
        Swal.fire({
          title: "Success!",
          text: 'Election Party added successfully!',
          icon: "success",
          confirmButtonColor: "#082463",
        });
      }
      onSuccess();
      onClose();
      resetForm();
    } catch (error) {

      selectedElectionParty ? 
      Swal.fire({
        title: "Error!",
        text: 'Failed to update election party',
        icon: "error",
        confirmButtonColor: "#f00",
      })
       : 
       Swal.fire({
        title: "Error!",
        text: 'Failed to add election party',
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
    setIcon(null);
    setElection_id('');
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="740px">
        <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
          {selectedElectionParty ? 'Update Election Party' : 'Add Election Party'}
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
              <FormLabel mt="15px">Election Party Icon</FormLabel>
              <Input
                pt="5px"
                type="file"
                accept="image/*"
                onChange={(e) => setIcon(e.target.files[0])}
                required={!selectedElectionParty}
              />
            </FormControl>

            <FormControl>
              <FormLabel mt="15px">Election Party</FormLabel>
              <Select value={election_id} onChange={(e) => setElection_id(e.target.value)} placeholder='Select Election Party'>
                {parentElections.map((election) => (
                  <option key={election._id} value={election._id}>
                    {election.name}
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
              {selectedElectionParty ? 'Update Election Party' : 'Add Election Party'}
            </Button>
          </form>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ElectionPartyModal;
