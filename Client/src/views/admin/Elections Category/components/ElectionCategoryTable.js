import React, { useState } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Icon, Image, Alert, AlertIcon } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import deleteElectionCategory from '../../../../action/ElectionsCategory-API/deleteElectionCategory';

const ElectionCategoryTable = ({ electionsCat, onEdit,parentElections, onDelete, token }) => {

  const [isError, setIsError] = useState(false);
  
  const handleDelete = async (electionCatId) => {
    if (window.confirm('Are you sure you want to delete this election?')) {
      const result = await deleteElectionCategory(electionCatId, token);
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

  const getParentElectionName = (electionId) => {
    const parentElection = parentElections.find(e => e._id === electionId);
    return parentElection ? parentElection.name : 'N/A'; // Return 'N/A' if not found
  };

  return (
    <TableContainer position="relative" top="80px" className='categoryTable' overflowX="visible" overflowY="visible">
      {isError && (
         <Alert marginBottom="20px" status='success' variant='left-accent'>
         <AlertIcon />
         Election Deleted Successfully!
       </Alert>
      )}
      <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
        Elections Category List
      </Text>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>NAME</Th>
            <Th>Description</Th>
            <Th padding="0.75rem 0rem">Image</Th>
            <Th>Election Category</Th>
            <Th isNumeric>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {electionsCat.map((electionCat, index) => (
            <Tr key={index}>
              <Td>{electionCat.name}</Td>
              <Td>{electionCat.description}</Td>
              <Td padding="15px 0px"><Image src={electionCat.image} alt={`${electionCat.name} image`} boxSize="50px" borderRadius="10px" objectFit="cover"/></Td>
              <Td>{getParentElectionName(electionCat.election_id)}</Td> {/* Get parent election name */}
              <Td isNumeric>
                <button onClick={() => onEdit(electionCat)}>
                  <Icon as={TbEdit} />
                </button>
                <button 
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDelete(electionCat._id)} // Handle delete
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

export default ElectionCategoryTable;

