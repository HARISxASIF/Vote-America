import React, { useState } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Icon, Image, Flex, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";

const UserTable = ({ users, onEdit, openModal }) => {
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

  return (
    <>
      <TableContainer position="relative" top="80px" className='userTable'>
        <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
          User List
        </Text>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th whiteSpace='normal'>Document Front Side</Th>
              <Th whiteSpace='normal'>Document Back Side</Th>
              <Th whiteSpace='normal'>Personal Details Status</Th>
              <Th whiteSpace='normal'>Government Photo ID Status</Th>
              <Th isNumeric>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={index}>
                <Td>
                  <Flex alignItems="center">
                    <Box width="70px">
                      <Image
                        src={user.image}
                        alt={`${user.first_name} image`}
                        boxSize="50px"
                        borderRadius="10px"
                        objectFit="cover"
                        marginRight="10px"
                      />
                    </Box>
                    <Box>
                      <Box>
                        {user.first_name}
                        <Box marginLeft="5px" display="inline-block">
                          {user.last_name}
                        </Box>
                      </Box>
                      <Box mt="5px">{user.email}</Box>
                    </Box>
                  </Flex>
                </Td>
                <Td>{user.phone}</Td>
                <Td>
                  <Image
                    src={user.front_side}
                    alt={`${user.first_name} front side`}
                    boxSize="50px"
                    borderRadius="10px"
                    objectFit="cover"
                    cursor="pointer"
                    onClick={() => handleImageClick(user.front_side)}
                  />
                </Td>
                <Td>
                  <Image
                    src={user.back_side}
                    alt={`${user.first_name} back side`}
                    boxSize="50px"
                    borderRadius="10px"
                    objectFit="cover"
                    cursor="pointer"
                    onClick={() => handleImageClick(user.back_side)}
                  />
                </Td>
                <Td>{user.personal_details_status}</Td>
                <Td>{user.government_photo_id_status}</Td>
                <Td isNumeric>
                  <button onClick={() => onEdit(user)}>
                    <Icon as={TbEdit} />
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

export default UserTable;
