import React, { useState } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Icon, Image, Alert, AlertIcon ,Flex, Box, Button} from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import deleteElectionCategory from '../../../../action/ElectionsCategory-API/deleteElectionCategory';
import Swal from 'sweetalert2';

const ElectionCategoryTable = ({ electionsCat, onEdit,parentElections, onDelete, token,openModal }) => {
  
  const handleDelete = async (electionCatId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#082463",
      cancelButtonColor: "#f00",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteElectionCategory(electionCatId, token); // Your delete function call
        if (response.success) {
          Swal.fire({
            title: "Success!",
            text: response.message,
            icon: "success",
            confirmButtonColor: "#082463",
          });
          onDelete(); // Call onDelete to refresh the list
        } else {
          Swal.fire({
            title: "Error!",
            text: response.message,
            icon: "error",
            confirmButtonColor: "#f00",
          });
        }
      }
    });
    
  };

  const getParentElectionName = (electionId) => {
    const parentElection = parentElections.find(e => e._id === electionId);
    return parentElection ? parentElection.name : 'N/A'; // Return 'N/A' if not found
  };

  return (
    <TableContainer position="relative" top="80px" className='categoryTable' overflowX="visible" overflowY="visible">
      <Flex
        maxW="100%"
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="center"
        justifyContent="end"
        className='mainBoxTable'
      >
        <Box>
          <Button
            onClick={openModal}
            bg="#082463"
            color="#fff"
            borderRadius="5px"
            _hover={{ bg: '#CF2B28' }}
            _active={{ bg: '#082463' }}
            _focus={{ bg: '#082463' }}
          >
            Add Election Category +
          </Button>
        </Box>
      </Flex>
      <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
        Elections Category List
      </Text>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>NAME</Th>           
            <Th padding="0.75rem 0rem">Image</Th>
            <Th>Election Category</Th>
            <Th>Description</Th>
            <Th isNumeric>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {electionsCat.map((electionCat, index) => (
            <Tr key={index}>
              <Td>{electionCat.name}</Td>
              <Td padding="15px 0px"><Image src={electionCat.image} alt={`${electionCat.name} image`} boxSize="50px" borderRadius="10px" objectFit="cover"/></Td>
              <Td>{getParentElectionName(electionCat.election_id)}</Td>              
              <Td>
              <Text                   
                  sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: '4',
                    whiteSpace: 'normal',
                    wordBreak:"break-word"
                  }}
                >
                {electionCat.description}
                </Text>
                </Td>
              
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

