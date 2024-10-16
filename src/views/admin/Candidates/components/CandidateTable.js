import React, { useState } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Icon,
  Image,
  Flex,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { TbEdit } from 'react-icons/tb';
import deleteCandidate from 'action/Candidate-API/deleteCandidate';
import showCandidate from 'action/Candidate-API/showCandidate';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';
import defaultAvatar from "../../../../assets/img/avatars/defaultAvatar.jpg"
import defaultImage from "../../../../assets/img/avatars/defaultImage.jpg"


import Swal from 'sweetalert2';

const CandidateTable = ({ candidates, onEdit, openModal, onDelete, token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsNewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };
  

  const handleCloseNewModal = () => {
    setIsNewModalOpen(false);
    setSelectedImage('');
  };

  const handleDelete = async (candidateId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#082463',
      cancelButtonColor: '#f00',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteCandidate(candidateId, token); // Your delete function call
        if (response.success) {
          Swal.fire({
            title: 'Success!',
            text: response.message,
            icon: 'success',
            confirmButtonColor: '#082463',
          });
          onDelete(); // Call onDelete to refresh the list
        } else {
          Swal.fire({
            title: 'Error!',
            text: response.message,
            icon: 'error',
            confirmButtonColor: '#f00',
          });
        }
      }
    });
  };

  const handleShow = async (candidateId) => {
    const response = await showCandidate(candidateId, token);
    if (response.success) {
      setSelectedCandidate(response.data.candidate);
      setIsModalOpen(true);
    } else {
      console.error('Failed to fetch candidate data');
    }
  };

  return (
    <>
      <Flex
        maxW="100%"
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="center"
        justifyContent="end"
        className="mainBoxTable"
        position="relative"
        top="80px"
      >
        <Box>
          <Button
            onClick={openModal}
            bg="#082463"
            color="#fff"
            borderRadius="5px"
            _hover={{ bg: '#CF2B28' }}
            _active={{ bg: '#082463' }}
            _focus={{ bg: '#082463' }}
          >
            Add Candidate +
          </Button>
        </Box>
      </Flex>
      <TableContainer position="relative" top="80px" className="userTable">
        <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
          Candidates List
        </Text>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Date of Birth</Th>
              <Th>Security Number</Th>
              {/* <Th whiteSpace="normal">Document Front Side</Th>
              <Th whiteSpace="normal">Document Back Side</Th>
              <Th whiteSpace="normal">Additional Document</Th>
              <Th whiteSpace="normal">Personal Details Status</Th>
              <Th whiteSpace="normal">Government Photo ID Status</Th>
              <Th whiteSpace="normal">Document Status</Th> */}
              <Th isNumeric>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {candidates.map((candidate, index) => (
              <Tr key={index}>
                <Td>
                  <Flex alignItems="center">
                    <Box width="70px">
                      <Image
                        src={candidate.image ? candidate.image : defaultAvatar}
                        alt={`${candidate.first_name} image`}
                        boxSize="50px"
                        borderRadius="10px"
                        objectFit="cover"
                        marginRight="10px"
                      />
                    </Box>
                    <Box>
                      <Box>
                        {candidate.first_name}
                        <Box marginLeft="5px" display="inline-block">
                          {candidate.last_name}
                        </Box>
                      </Box>
                      <Box mt="5px">{candidate.email}</Box>
                    </Box>
                  </Flex>
                </Td>
                <Td>{candidate.phone}</Td>
                {/* <Td>
                  <Image
                    src={candidate.front_side}
                    alt={`${candidate.first_name} front side`}
                    boxSize="50px"
                    borderRadius="10px"
                    objectFit="cover"
                    cursor="pointer"
                    onClick={() => handleImageClick(candidate.front_side)}
                  />
                </Td>
                <Td>
                  <Image
                    src={candidate.back_side}
                    alt={`${candidate.first_name} back side`}
                    boxSize="50px"
                    borderRadius="10px"
                    objectFit="cover"
                    cursor="pointer"
                    onClick={() => handleImageClick(candidate.back_side)}
                  />
                </Td>
                <Td>
                  <Image
                    src={candidate.additional_documents}
                    alt={`${candidate.first_name} additionalDocument`}
                    boxSize="50px"
                    borderRadius="10px"
                    objectFit="cover"
                    cursor="pointer"
                    onClick={() =>
                      handleImageClick(candidate.additional_documents)
                    }
                  />
                </Td>
                <Td>{candidate.personal_details_status}</Td>
                <Td>{candidate.government_photo_id_status}</Td>
                <Td>{candidate.document_status}</Td> */}
                <Td>{candidate.dob ? candidate.dob : "null"}</Td> 
                <Td>{candidate.security_number ? candidate.security_number : "null"}</Td> 
                <Td isNumeric>
                  <button
                    onClick={() => handleShow(candidate._id)} // Handle delete
                  >
                    <Icon as={FaEye} />
                  </button>
                  <button
                    style={{ marginLeft: '12px' }}
                    onClick={() => onEdit(candidate)}
                  >
                    <Icon as={TbEdit} />
                  </button>
                  <button
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleDelete(candidate._id)} // Handle delete
                  >
                    <Icon as={MdOutlineDeleteOutline} />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Modal for displaying the image */}

      <Modal isOpen={isNewModalOpen} onClose={handleCloseNewModal} isCentered
        
        >
          <ModalOverlay />
          <ModalContent 
          maxWidth="700px"
          background= "transparent"
          boxShadow= "none"
          >
            <ModalCloseButton 
            bg="#f00"
            color="#fff"
            borderRadius="50%"
            height="35px"
            width="35px"
            right="10px"
            top="0px"
            />
            <ModalBody>
              <Image src={selectedImage ? selectedImage : defaultImage } alt="Document Image" width="100%" borderRadius="10px" objectFit="contain" />
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>

      {/* Modal for displaying the Candidate Details */}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="950px" borderRadius="10px">
          {/* <ModalHeader textAlign="center">Candidate Details</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody padding="0" borderRadius="10px">
            {selectedCandidate && (
              <>
                <Flex borderRadius="10px">
                  <Box
                    padding="15px"
                    backgroundColor="#082463"
                    borderTopLeftRadius="10px"
                    borderBottomLeftRadius="10px"
                    textAlign="center"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="column"
                    maxWidth="320px"
                    minWidth="320px"
                  >
                    <Image
                      src={selectedCandidate.image ? selectedCandidate.image : defaultAvatar}
                      alt={`${selectedCandidate.first_name} image`}
                      boxSize="150px"
                      borderRadius="10px"
                      objectFit="cover"
                    />

                    <Text
                      display="inline-block"
                      color="#fff"
                      fontSize="24px"
                      fontWeight="600"
                      mt="10px"
                      mb="10px"
                    >
                      {selectedCandidate.first_name}{' '}
                      {selectedCandidate.last_name}
                    </Text>
                    <Text color="#fff">
                      <FaQuoteLeft
                        style={{
                          display: 'inline-block',
                          marginRight: '5px',
                          position: 'relative',
                          bottom: '1px',
                        }}
                      />
                      {selectedCandidate.bio ? selectedCandidate.bio : "null"}
                      <FaQuoteRight
                        style={{
                          display: 'inline-block',
                          marginLeft: '5px',
                          position: 'relative',
                          bottom: '1px',
                        }}
                      />
                    </Text>
                  </Box>

                  <Box className="candidateBox" padding="15px 15px 35px">
                    <Text className="candidateHeading">Candidate Details</Text>
                    <hr></hr>
                    <Flex>
                      <Text flex="1" padding="10px">
                        <strong>Email:</strong> {selectedCandidate.email}
                      </Text>
                      <Text flex="1" padding="10px">
                        <strong>Phone:</strong> {selectedCandidate.phone}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text flex="1" padding="10px">
                        <strong>Date of Birth:</strong> {selectedCandidate.dob ? selectedCandidate.dob : "null"}
                      </Text>

                      <Text flex="1" padding="10px">
                        <strong>Zip Code:</strong> {selectedCandidate.zip_code ? selectedCandidate.zip_code : "null"}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text flex="1" padding="10px">
                        <strong>Security Number:</strong>{' '}
                        {selectedCandidate.security_number ? selectedCandidate.security_number : "null"}
                      </Text>

                      <Text
                        flex="1"
                        padding="10px"
                        color={
                          selectedCandidate.personal_details_status ===
                          'Approved'
                            ? '#00a300'
                            : selectedCandidate.personal_details_status ===
                              'Pending'
                            ? '#d2d200'
                            : selectedCandidate.personal_details_status ===
                              'Rejected'
                            ? 'red'
                            : 'black' // default color in case the status doesn't match any of the conditions
                        }
                        fontWeight="600"
                      >
                        <strong>Personal Details Status:</strong>{' '}
                        {selectedCandidate.personal_details_status}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text
                        flex="1"
                        padding="10px"
                        color={
                          selectedCandidate.government_photo_id_status ===
                          'Approved'
                            ? '#00a300'
                            : selectedCandidate.government_photo_id_status ===
                              'Pending'
                            ? '#d2d200'
                            : selectedCandidate.government_photo_id_status ===
                              'Rejected'
                            ? 'red'
                            : 'black' // default color in case the status doesn't match any of the conditions
                        }
                        fontWeight="600"
                      >
                        <strong>Government ID Status:</strong>{' '}
                        {selectedCandidate.government_photo_id_status}
                      </Text>

                      <Text
                        flex="1"
                        padding="10px"
                        color={
                          selectedCandidate.document_status === 'Approved'
                            ? '#00a300'
                            : selectedCandidate.document_status === 'Pending'
                            ? '#d2d200'
                            : selectedCandidate.document_status === 'Rejected'
                            ? 'red'
                            : 'black' // default color in case the status doesn't match any of the conditions
                        }
                        fontWeight="600"
                      >
                        <strong>Document Status:</strong>{' '}
                        {selectedCandidate.document_status}
                      </Text>
                    </Flex>
                    <Flex>
                      <Box flex="1" padding="10px">
                        <strong>Document Front Side:</strong>
                        <Image
                          src={selectedCandidate.front_side ? selectedCandidate.front_side : defaultImage}
                          alt={`front document`}
                          boxSize="100px"
                          borderRadius="10px"
                          objectFit="cover"
                          mt="10px"
                          onClick={() => handleImageClick(selectedCandidate.front_side)}
                        />
                      </Box>

                      <Box flex="1" padding="10px">
                        <strong>Document Back Side:</strong>
                        <Image
                          src={selectedCandidate.back_side ? selectedCandidate.back_side : defaultImage}
                          alt={`back document`}
                          boxSize="100px"
                          borderRadius="10px"
                          objectFit="cover"
                          mt="10px"
                          onClick={() => handleImageClick(selectedCandidate.back_side)}
                        />
                      </Box>
                    </Flex>
                  </Box>
                </Flex>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CandidateTable;
