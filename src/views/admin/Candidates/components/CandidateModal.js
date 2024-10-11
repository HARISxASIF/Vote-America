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
  Input,
  InputGroup,
  InputRightElement,
  HStack,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { updateCandidate } from '../../../../action/Candidate-API/updateCandidate'; // Ensure path is correct
import addCandidate from '../../../../action/Candidate-API/addCandidate'; // Import addCandidate API
import Swal from 'sweetalert2';

const CandidateModal = ({ isOpen, onClose, onSuccess, selectedCandidate }) => {
  // State for Add Candidate fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [zipCode, setZipCode] = useState('');
  const [dob, setDob] = useState('');
  const [securityNumber, setSecurityNumber] = useState('');
  const [frontSide, setFrontSide] = useState(null); // For file upload
  const [backSide, setBackSide] = useState(null); // For file upload
  const [additionalDocuments, setAdditionalDocuments] = useState(null); // For file upload
  const [image, setImage] = useState(null); // For file upload
  const token = localStorage.getItem('authToken');

  // States for Update Candidate fields
  const [personalDetailsStatus, setPersonalDetailsStatus] = useState('Pending');
  const [governmentPhotoIdStatus, setGovernmentPhotoIdStatus] =
    useState('Pending');
  const [documentStatus, setDocumentStatus] = useState('Pending');

  const handlePasswordToggle = () => setShowPassword(!showPassword);
  const handleConfirmPasswordToggle = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    if (selectedCandidate) {
      // For updating candidate status
      setPersonalDetailsStatus(
        selectedCandidate.personal_details_status || 'Pending',
      );
      setGovernmentPhotoIdStatus(
        selectedCandidate.government_photo_id_status || 'Pending',
      );
      setDocumentStatus(selectedCandidate.document_status || 'Pending');
    } else {
      // Reset form when adding new candidate
      resetForm();
    }
  }, [selectedCandidate, isOpen]);

  const handleAddCandidate = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);
    formData.append('zip_code', zipCode);
    formData.append('dob', dob);
    formData.append('security_number', securityNumber);
    formData.append('front_side', frontSide);
    formData.append('back_side', backSide);
    formData.append('additional_documents', additionalDocuments);
    formData.append('image', image);

    try {
      await addCandidate(formData, token);
      Swal.fire({
        title: 'Success!',
        text: 'Candidate added successfully!',
        icon: 'success',
        confirmButtonColor: '#082463',
      });
      onSuccess(); // Refresh candidates list after adding
      onClose();
      resetForm();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonColor: '#f00',
      });
      onClose();
    }
  };

  const handleUpdateCandidate = async (event) => {
    event.preventDefault();

    try {
      await updateCandidate(
        selectedCandidate._id,
        personalDetailsStatus,
        governmentPhotoIdStatus,
        documentStatus,
        token,
      );
      Swal.fire({
        title: 'Success!',
        text: 'Candidate status updated successfully!',
        icon: 'success',
        confirmButtonColor: '#082463',
      });
      onSuccess(); // Refresh candidates list after updating
      onClose();
      resetForm();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update candidate status',
        icon: 'error',
        confirmButtonColor: '#f00',
      });
      onClose();
    }
  };

  const resetForm = () => {
    // Reset form fields for adding a new candidate
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setConfirmPassword('');
    setZipCode('');
    setDob('');
    setSecurityNumber('');
    setFrontSide(null);
    setBackSide(null);
    setAdditionalDocuments(null);
    setImage(null);
  };

  return (
    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="800px">
        <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
          {selectedCandidate ? 'Update Candidate Status' : 'Add New Candidate'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form
            onSubmit={
              selectedCandidate ? handleUpdateCandidate : handleAddCandidate
            }
          >
            {selectedCandidate ? (
              <>
                {/* Fields for updating status */}
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
              </>
            ) : (
              <>
                {/* Fields for adding new candidate */}
                <HStack spacing="24px" alignItems="flex-start">
                  <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Enter first name"
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Enter last name"
                      required
                    />
                  </FormControl>
                </HStack>

                <HStack spacing="24px" alignItems="flex-start">
                  <FormControl>
                    <FormLabel mt="15px">Email</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel mt="15px">Phone</FormLabel>
                    <Input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter phone number"
                      required
                    />
                  </FormControl>
                </HStack>

                <HStack spacing="24px" alignItems="flex-start">
                  <FormControl>
                    <FormLabel mt="15px">Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handlePasswordToggle}
                        >
                          {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  <FormControl>
                    <FormLabel mt="15px">Confirm Password</FormLabel>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          h="1.75rem"
                          size="sm"
                          onClick={handleConfirmPasswordToggle}
                        >
                          {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </HStack>
                <HStack spacing="24px" alignItems="flex-start">
                  <FormControl>
                    <FormLabel mt="15px">Candidate Image</FormLabel>
                    <Input
                      type="file"
                      pt="5px"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel mt="15px">Date of Birth</FormLabel>
                    <Input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                    />
                  </FormControl>
                </HStack>

                <HStack spacing="24px" alignItems="flex-start">
                  <FormControl>
                    <FormLabel mt="15px">Zip Code</FormLabel>
                    <Input
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="Enter zip code"
                      required
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel mt="15px">Security Number</FormLabel>
                    <Input
                      value={securityNumber}
                      onChange={(e) => setSecurityNumber(e.target.value)}
                      placeholder="Enter security number"
                      required
                    />
                  </FormControl>
                </HStack>

                <HStack spacing="24px" alignItems="flex-start">
                  <FormControl>
                    <FormLabel mt="15px">Front Side Document</FormLabel>
                    <Input
                      type="file"
                      pt="5px"
                      onChange={(e) => setFrontSide(e.target.files[0])}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel mt="15px">Back Side Document</FormLabel>
                    <Input
                      type="file"
                      pt="5px"
                      onChange={(e) => setBackSide(e.target.files[0])}
                      required
                    />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel mt="15px">Additional Documents</FormLabel>
                  <Input
                    type="file"
                    pt="5px"
                    onChange={(e) => setAdditionalDocuments(e.target.files[0])}
                    required
                  />
                </FormControl>
              </>
            )}
          </form>
        </ModalBody>
        <ModalFooter>
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
            onClick={
              selectedCandidate ? handleUpdateCandidate : handleAddCandidate
            }
          >
            {selectedCandidate ? 'Update Status' : 'Add Candidate'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CandidateModal;
