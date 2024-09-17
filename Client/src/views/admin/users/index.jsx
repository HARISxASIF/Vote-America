'use client';

// Chakra imports
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
} from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';
import { getUser } from 'action/getUser';

// Assets

// Custom components
import React, { useEffect, useState } from 'react';

export default function UsersData() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', phone: '098-765-4321' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  // Add a new user
  const handleAddUser = () => {
    setUsers([
      ...users,
      { id: Date.now(), name: newUser.name, phone: newUser.phone },
    ]);
    setNewUser({ name: '', phone: '' });
    onClose();
  };

  // Edit user data
  const handleManageUser = () => {
    onOpen();
    setIsEditing(false);
    setCurrentUser(null);
  };

  // Edit user data
  const handleEditUser = (user) => {
    onOpen();
    setIsEditing(true);
    setCurrentUser(user);
    setNewUser(user);
  };

  // Update the edited user
  const handleUpdateUser = () => {
    setUsers(
      users.map((user) =>
        user.id === currentUser.id
          ? { ...currentUser, name: newUser.name, phone: newUser.phone }
          : user,
      ),
    );
    setIsEditing(false);
    setNewUser({ name: '', phone: '' });
    setCurrentUser(null);
    onClose();
  };

  // Delete a user
  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  useEffect(() => {
    const response = getUser();
    console.log('response', response);
  }, []);

  return (
    <div style={{ position: 'relative', top: '80px' }}>
      <Flex
        maxW="100%"
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="center"
        justifyContent="end"
      >
        <Box>
          <Button
            onClick={() => handleManageUser()}
            bg="#082463"
            color="#fff"
            borderRadius="5px"
            _hover={{ bg: '#CF2B28' }}
            _active={{ bg: '#082463' }}
            _focus={{ bg: '#082463' }}
          >
            Add User +
          </Button>
        </Box>
      </Flex>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {isEditing ? (
            <ModalHeader>Update User</ModalHeader>
          ) : (
            <ModalHeader fontSize="22px" color="#082463" fontWeight="700">
              Add User
            </ModalHeader>
          )}

          <ModalCloseButton />
          <ModalBody>
            <FormLabel>First name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Enter name"
              value={newUser.name}
              onChange={handleInputChange}
            />

            <FormLabel mt="15px">Phone No.</FormLabel>
            <Input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              value={newUser.phone}
              onChange={handleInputChange}
            />
            {isEditing ? (
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
                onClick={handleUpdateUser}
              >
                Update User
              </Button>
            ) : (
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
                onClick={handleAddUser}
              >
                Add User
              </Button>
            )}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>

      {/* User List
      <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone No</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.phone}</td>
              <td>
                <button onClick={() => handleEditUser(user)}>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <TableContainer position="relative" top="80px">
        <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
          User List
        </Text>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th>NAME</Th>
              <Th>PHONE NO.</Th>
              <Th isNumeric>ACTIONS</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}>
                <Td>{user.name}</Td>
                <Td>{user.phone}</Td>
                <Td isNumeric>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
