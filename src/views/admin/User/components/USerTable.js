import React, { useState } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Icon, Image, Flex, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import showUser from 'action/User-API/showUser';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa6';
import { FaEye } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import deleteUser from 'action/User-API/deleteUser';
import Swal from 'sweetalert2';
import defaultAvatar from "../../../../assets/img/avatars/defaultAvatar.jpg";
import defaultImage from "../../../../assets/img/avatars/defaultImage.jpg"


const UserTable = ({ users, onEdit, openModal,token, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsNewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  

  const handleCloseNewModal = () => {
    setIsNewModalOpen(false);
    setSelectedImage('');
  };

  const handleShow = async (userId) => {
    const response = await showUser(userId, token);
    if (response.success) {
      setSelectedUser(response.data.candidate);
      setIsModalOpen(true);
    } else {
      console.error('Failed to fetch user data');
    }
  };


  const handleDelete = async (userId) => {
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
        const response = await deleteUser(userId, token); // Your delete function call
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
              <Th>Date of Birth</Th>
              <Th>Security Number</Th>
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
                        src={user.image ? user.image : defaultAvatar }
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
                {/* <Td>
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
                <Td>{user.government_photo_id_status}</Td> */}
                <Td>{user.dob ? user.dob : "null"}</Td>
                <Td>{user.security_number ? user.security_number : "null"}</Td>
                <Td isNumeric>
                  <button
                    onClick={() => handleShow(user._id)} // Handle delete
                  >
                    <Icon as={FaEye} />
                  </button>
                  <button 
                  style={{ marginLeft: '12px' }}
                  onClick={() => onEdit(user)}>
                    <Icon as={TbEdit} />
                  </button>
                  <button
                    style={{ marginLeft: '10px' }}
                    onClick={() => handleDelete(user._id)} // Handle delete
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
              <Image src={selectedImage ? selectedImage : defaultImage} alt="Document Image" width="100%" borderRadius="10px" objectFit="contain" />
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
          </ModalContent>
        </Modal>

      {/* Modal for displaying the User Details */}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="950px" borderRadius="10px">
          {/* <ModalHeader textAlign="center">Candidate Details</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody padding="0" borderRadius="10px">
            {selectedUser && (
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
                      src={selectedUser.image ? selectedUser.image : defaultAvatar}
                      alt={`${selectedUser.first_name} image`}
                      boxSize="150px"
                      borderRadius="10px"
                      objectFit="cover"
                      color="#fff"
                    />

                    <Text
                      display="inline-block"
                      color="#fff"
                      fontSize="24px"
                      fontWeight="600"
                      mt="10px"
                      mb="10px"
                    >
                      {selectedUser.first_name}{' '}
                      {selectedUser.last_name}
                    </Text>
                    {/* <Text color="#fff">
                      <FaQuoteLeft
                        style={{
                          display: 'inline-block',
                          marginRight: '5px',
                          position: 'relative',
                          bottom: '1px',
                        }}
                      />
                      {selectedUser.bio}
                      <FaQuoteRight
                        style={{
                          display: 'inline-block',
                          marginLeft: '5px',
                          position: 'relative',
                          bottom: '1px',
                        }}
                      />
                    </Text> */}
                  </Box>

                  <Box className="candidateBox" padding="15px 15px 35px">
                    <Text className="candidateHeading">User Details</Text>
                    <hr></hr>
                    <Flex>
                      <Text flex="1" padding="10px">
                        <strong>Email:</strong> {selectedUser.email}
                      </Text>
                      <Text flex="1" padding="10px">
                        <strong>Phone:</strong> {selectedUser.phone}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text flex="1" padding="10px">
                        <strong>Date of Birth:</strong> {selectedUser.dob ? selectedUser.dob : "null"}
                      </Text>

                      <Text flex="1" padding="10px">
                        <strong>Zip Code:</strong> {selectedUser.zip_code ? selectedUser.zip_code : "null"}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text flex="1" padding="10px">
                        <strong>Security Number:</strong>{' '}
                        {selectedUser.security_number ? selectedUser.security_number : "null"}
                      </Text>

                      <Text
                        flex="1"
                        padding="10px"
                        color={
                          selectedUser.personal_details_status ===
                          'Approved'
                            ? '#00a300'
                            : selectedUser.personal_details_status ===
                              'Pending'
                            ? '#d2d200'
                            : selectedUser.personal_details_status ===
                              'Rejected'
                            ? 'red'
                            : 'black' // default color in case the status doesn't match any of the conditions
                        }
                        fontWeight="600"
                      >
                        <strong>Personal Details Status:</strong>{' '}
                        {selectedUser.personal_details_status}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text
                        flex="1"
                        padding="10px"
                        color={
                          selectedUser.government_photo_id_status ===
                          'Approved'
                            ? '#00a300'
                            : selectedUser.government_photo_id_status ===
                              'Pending'
                            ? '#d2d200'
                            : selectedUser.government_photo_id_status ===
                              'Rejected'
                            ? 'red'
                            : 'black' // default color in case the status doesn't match any of the conditions
                        }
                        fontWeight="600"
                      >
                        <strong>Government ID Status:</strong>{' '}
                        {selectedUser.government_photo_id_status}
                      </Text>

                      <Text
                        flex="1"
                        padding="10px"
                        color={
                          selectedUser.document_status === 'Approved'
                            ? '#00a300'
                            : selectedUser.document_status === 'Pending'
                            ? '#d2d200'
                            : selectedUser.document_status === 'Rejected'
                            ? 'red'
                            : 'black' // default color in case the status doesn't match any of the conditions
                        }
                        fontWeight="600"
                      >
                        <strong>Document Status:</strong>{' '}
                        {selectedUser.document_status}
                      </Text>
                    </Flex>
                    <Flex>
                      <Box flex="1" padding="10px">
                        <strong>Document Front Side:</strong>
                        <Image
                          src={selectedUser.front_side ? selectedUser.front_side : defaultImage}
                          alt={`front document`}
                          boxSize="100px"
                          borderRadius="10px"
                          objectFit="cover"
                          mt="10px"
                          onClick={() => handleImageClick(selectedUser.front_side)}
                        />
                      </Box>

                      <Box flex="1" padding="10px">
                        <strong>Document Back Side:</strong>
                        <Image
                          src={selectedUser.back_side ? selectedUser.back_side : defaultImage}
                          alt={`back document`}
                          boxSize="100px"
                          borderRadius="10px"
                          objectFit="cover"
                          mt="10px"
                          onClick={() => handleImageClick(selectedUser.back_side)}
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

export default UserTable;
