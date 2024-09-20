import React from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text,Icon ,Image} from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";


const LocalElectionTable = ({ localElections, handleEditLocalElection, handleDeleteLocalElection }) => {
  return (
    <TableContainer position="relative" top="80px">
      <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
        Local Elections List
      </Text>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>NAME</Th>
            <Th>Image</Th>
            <Th>Icon</Th>
            <Th isNumeric>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {localElections.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td><Image src={user.image} alt={user.name} boxSize="50px" borderRadius="10px" /></Td>
              <Td><Image src={user.icon} alt={user.name} boxSize="50px" borderRadius="10px" /></Td>
              <Td isNumeric>
                <button onClick={() => handleEditLocalElection(user)}><Icon as={TbEdit} /></button>
                <button style={{marginLeft:"10px",}} onClick={() => handleDeleteLocalElection(user.id)}><Icon as={MdOutlineDeleteOutline} /></button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default LocalElectionTable;