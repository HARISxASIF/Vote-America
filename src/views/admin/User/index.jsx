import React, { useEffect, useState } from 'react';
// import { Box, Button, Flex } from '@chakra-ui/react';
import { fetchUsers } from '../../../action/User-API/getUsers'; // Replace API fetch function
import UserTable from './components/USerTable';
import UserModal from './components/UserModal';

const UserData = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem('authToken');

  const getUsers = async () => {
    try {
      const data = await fetchUsers(); // Replace API call with users API
      setUsers(data.users); // Update to use `users` array from API data
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <div>
      <UserTable 
        users={users}  // Pass users to the table component
        onEdit={handleEdit} 
        onDelete={getUsers} 
        token={token} 
        openModal={() => setIsModalOpen(true)}
      />
      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(null);
        }}
        onSuccess={getUsers}
        selectedUser={selectedUser}  // Update to use selectedUser
      />
    </div>
  );
};

export default UserData;