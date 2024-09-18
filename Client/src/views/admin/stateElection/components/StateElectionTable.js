import React from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text,Icon ,Image} from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";


const StateElectionTable = ({ stateElections, handleEditStateElection, handleDeleteStateElection }) => {
  return (
    <TableContainer position="relative" top="80px">
      <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
        State Election List
      </Text>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>NAME</Th>
            <Th>Image</Th>
            <Th isNumeric>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stateElections.map((user) => (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td><Image src={user.image} alt={user.name} boxSize="50px" borderRadius="10px" /> {/* Render Image */}</Td>
              <Td isNumeric>
                <button onClick={() => handleEditStateElection(user)}><Icon as={TbEdit} /></button>
                <button style={{marginLeft:"10px",}} onClick={() => handleDeleteStateElection(user.id)}><Icon as={MdOutlineDeleteOutline} /></button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default StateElectionTable;