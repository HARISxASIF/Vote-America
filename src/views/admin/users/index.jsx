'use client';

// Chakra imports
import {
  Button,
  Box,
  Flex,

} from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';
import { getUser } from 'action/getUser';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal'; 
// Assets

// Custom components
import React, { useEffect, useState } from 'react';

export default function UsersData() {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', phone: '123-456-7890',email:'johndoe@gmail.com', },
    { id: 2, name: 'Jane Smith', phone: '098-765-4321',email:'janesmith@gmail.com', },
  ]);

  const [newUser, setNewUser] = useState({ name: '', phone: '',email:'' });
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
      { id: Date.now(), name: newUser.name, phone: newUser.phone,email:newUser.email },
    ]);
    setNewUser({ name: '', phone: '' , email:'' });
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
          ? { ...currentUser, name: newUser.name, phone: newUser.phone , email: newUser.email }
          : user,
      ),
    );
    setIsEditing(false);
    setNewUser({ name: '', phone: '' , email:'' });
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

      <UserModal
        isOpen={isOpen}
        onClose={onClose}
        isEditing={isEditing}
        newUser={newUser}
        handleInputChange={handleInputChange}
        handleAddUser={handleAddUser}
        handleUpdateUser={handleUpdateUser}
      />

      <UserTable users={users} handleEditUser={handleEditUser} handleDeleteUser={handleDeleteUser} />
    </div>
  );
}
