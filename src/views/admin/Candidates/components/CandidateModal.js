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
import { updateCandidate } from '../../../../action/Candidate-API/updateCandidate'; // Ensure path is correct
import Swal from 'sweetalert2';

const CandidateModal = ({ isOpen, onClose, onSuccess, selectedCandidate }) => {
  const [personalDetailsStatus, setPersonalDetailsStatus] = useState('');
  const [governmentPhotoIdStatus, setGovernmentPhotoIdStatus] = useState('');
  const [documentStatus, setDocumentStatus] = useState('');
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    if (selectedCandidate) {
      setPersonalDetailsStatus(selectedCandidate.personal_details_status || 'Pending');
      setGovernmentPhotoIdStatus(selectedCandidate.government_photo_id_status || 'Pending');
      setDocumentStatus(selectedCandidate.document_status || 'Pending');
    } else {
      resetForm();
    }
  }, [selectedCandidate, isOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (selectedCandidate) {
        await updateCandidate(
          selectedCandidate._id,
          personalDetailsStatus,
          governmentPhotoIdStatus,
          documentStatus,
          token
        );
        Swal.fire({
          title: "Success!",
          text: 'Candidtae status updated successfully!',
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
        text: 'Failed to update candidtae status',
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
    setDocumentStatus('Pending');
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="740px">
        <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
          {selectedCandidate ? 'Update Candidate Status' : 'Candidate Status'}
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
                <option value="Rejected">Rejected</option>
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
                <option value="Rejected">Rejected</option>
              </Select>
            </FormControl>

            <FormControl mt="15px">
              <FormLabel>Document Status</FormLabel>
              <Select
                value={documentStatus}
                onChange={(e) => setDocumentStatus(e.target.value)}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
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
              {selectedCandidate ? 'Update Status' : 'Update'}
            </Button>
          </form>
        </ModalBody>

        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default CandidateModal;
