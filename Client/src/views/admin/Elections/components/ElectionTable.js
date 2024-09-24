import React, { useState } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Icon, Image, Alert, AlertIcon } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import deleteElection from '../../../../action/Election-API/deleteElection';

const ElectionTable = ({ elections, onEdit, onDelete, token }) => {

  const [isError, setIsError] = useState(false);
  
  const handleDelete = async (electionId) => {
    if (window.confirm('Are you sure you want to delete this election?')) {
      const result = await deleteElection(electionId, token);
      if (result.success) {
        setIsError(true);
        setTimeout(() => {
          setIsError(false); // Hide alert after 3 seconds
        }, 3000);
        onDelete(); // Call onDelete to refresh the election list
      } else {
        alert(result.message);
      }
    }
  };

  return (
    <TableContainer position="relative" top="80px">
      {isError && (
         <Alert marginBottom="20px" status='success' variant='left-accent'>
         <AlertIcon />
         Election Deleted Successfully!
       </Alert>
      )}
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
              <Td><Image src={election.image} alt={`${election.name} image`} boxSize="50px" borderRadius="10px" objectFit="cover" /></Td>
              <Td><Image src={election.icon} alt={`${election.name} icon`} boxSize="50px" borderRadius="10px" objectFit="cover" /></Td>
              <Td isNumeric>
                <button onClick={() => onEdit(election)}>
                  <Icon as={TbEdit} />
                </button>
                <button 
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDelete(election._id)} // Handle delete
                >
                  <Icon as={MdOutlineDeleteOutline} />
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ElectionTable;
