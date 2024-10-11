import React, { useState } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Icon, Image, Flex, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import deleteCandidate from 'action/Candidate-API/deleteCandidate';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import Swal from 'sweetalert2';

const CandidateTable = ({ candidates, onEdit, openModal,onDelete,token }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
  };

  const handleDelete = async (candidateId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#082463",
      cancelButtonColor: "#f00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteCandidate(candidateId, token); // Your delete function call
        if (response.success) {
          Swal.fire({
            title: "Success!",
            text: response.message,
            icon: "success",
            confirmButtonColor: "#082463",
          });
          onDelete(); // Call onDelete to refresh the list
        } else {
          Swal.fire({
            title: "Error!",
            text: response.message,
            icon: "error",
            confirmButtonColor: "#f00",
          });
        }
      }
    });
    
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
        className='mainBoxTable'
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
      <TableContainer position="relative" top="80px" className='userTable'>
        <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
          Candidates List
        </Text>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th whiteSpace='normal'>Document Front Side</Th>
              <Th whiteSpace='normal'>Document Back Side</Th>
              <Th whiteSpace='normal'>Additional Document</Th>
              <Th whiteSpace='normal'>Personal Details Status</Th>
              <Th whiteSpace='normal'>Government Photo ID Status</Th>
              <Th whiteSpace='normal'>Document Status</Th>
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
                        src={candidate.image}
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
                <Td>
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
                    onClick={() => handleImageClick(candidate.additional_documents)}
                  />
                </Td>
                <Td>{candidate.personal_details_status}</Td>
                <Td>{candidate.government_photo_id_status}</Td>
                <Td>{candidate.document_status}</Td>
                <Td isNumeric>
                  <button onClick={() => onEdit(candidate)}>
                    <Icon as={TbEdit} />
                  </button>
                  <button 
                  style={{ marginLeft: "10px" }}
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
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered
        
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
              <Image src={selectedImage} alt="Document Image" width="100%" borderRadius="10px" objectFit="contain" />
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </>
  );
};

export default CandidateTable;
