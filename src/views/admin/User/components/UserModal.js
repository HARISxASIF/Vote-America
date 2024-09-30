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
  Button,
  Select,
  FormControl,
} from '@chakra-ui/react';
import { updateUser } from '../../../../action/User-API/updateUser'; // Ensure path is correct
import Swal from 'sweetalert2';

const UserModal = ({ isOpen, onClose, onSuccess, selectedUser }) => {
  const [personalDetailsStatus, setPersonalDetailsStatus] = useState('');
  const [governmentPhotoIdStatus, setGovernmentPhotoIdStatus] = useState('');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (selectedUser) {
      setPersonalDetailsStatus(selectedUser.personal_details_status || 'Pending');
      setGovernmentPhotoIdStatus(selectedUser.government_photo_id_status || 'Pending');
    } else {
      resetForm();
    }
  }, [selectedUser, isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (selectedUser) {
        await updateUser(
          selectedUser._id,
          personalDetailsStatus,
          governmentPhotoIdStatus,
          token
        );
        Swal.fire({
          title: "Success!",
          text: 'User status updated successfully!',
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
        text: 'Failed to update user status',
        icon: "error",
        confirmButtonColor: "#f00",
      });
      onClose();
      resetForm();
    }
  };

  const resetForm = () => {
    setPersonalDetailsStatus('Pending');
    setGovernmentPhotoIdStatus('Pending');
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="740px">
        <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
          {selectedUser ? 'Update User Status' : 'User Status'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Personal Details Status</FormLabel>
              <Select
                value={personalDetailsStatus}
                onChange={(e) => setPersonalDetailsStatus(e.target.value)}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </Select>
            </FormControl>

            <FormControl mt="15px">
              <FormLabel>Government Photo ID Status</FormLabel>
              <Select
                value={governmentPhotoIdStatus}
                onChange={(e) => setGovernmentPhotoIdStatus(e.target.value)}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
              </Select>
            </FormControl>

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
              {selectedUser ? 'Update Status' : 'Update'}
            </Button>
          </form>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
