import React from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text,Icon } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";


const UserTable = ({ users, handleEditUser, handleDeleteUser }) => {
  return (
    <TableContainer position="relative" top="80px">
      <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
        User List
      </Text>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>NAME</Th>
            <Th>PHONE NO.</Th>
            <Th>Email</Th>
            <Th isNumeric>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.phone}</Td>
              <Td>{user.email}</Td>
              <Td isNumeric>
                <button onClick={() => handleEditUser(user)}><Icon as={TbEdit} /></button>
                <button style={{marginLeft:"10px",}} onClick={() => handleDeleteUser(user.id)}><Icon as={MdOutlineDeleteOutline} /></button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;