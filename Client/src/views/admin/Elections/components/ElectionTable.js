import React from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text,Icon ,Image} from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";




const ElectionTable = ({ elections}) => {
  return (
    <TableContainer position="relative" top="80px">
      <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
        Elections List
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
          {elections.map((election, index) => (
            <Tr key={index}>
              <Td>{election.name}</Td>
              <Td><Image src={election.image} alt={`${election.name} image`} boxSize="50px" borderRadius="10px" /></Td>
              <Td><Image src={election.icon} alt={`${election.name} icon`} boxSize="50px" borderRadius="10px" /></Td>
              <Td isNumeric>
                <button><Icon as={TbEdit} /></button>
                <button style={{marginLeft:"10px",}}><Icon as={MdOutlineDeleteOutline} /></button>
              </Td>
              {/* <Td isNumeric>
                <button onClick={() => handleEditLocalElection(user)}><Icon as={TbEdit} /></button>
                <button style={{marginLeft:"10px",}} onClick={() => handleDeleteLocalElection(user.id)}><Icon as={MdOutlineDeleteOutline} /></button>
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ElectionTable;