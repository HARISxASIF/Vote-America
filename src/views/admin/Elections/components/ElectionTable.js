import React, { useState } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Icon, Image, Flex, Box, Button } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import deleteElection from '../../../../action/Election-API/deleteElection';
import Swal from 'sweetalert2';

const ElectionTable = ({ elections, onEdit, onDelete, token ,openModal }) => {
  
  const handleDelete = async (electionId) => {
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
        const result = await deleteElection(electionId, token); // Your delete function call
        if (result.success) {
          Swal.fire({
            title: "Success!",
            text: result.message,
            icon: "success",
            confirmButtonColor: "#082463",
          });
          onDelete(); // Call onDelete to refresh the election list
        } else {
          Swal.fire({
            title: "Error!",
            text: result.message,
            icon: "error",
            confirmButtonColor: "#f00",
          });
        }
      }
    });
    
  };

  return (
    <TableContainer position="relative" top="80px">
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
            onClick={openModal}
            bg="#082463"
            color="#fff"
            borderRadius="5px"
            _hover={{ bg: '#CF2B28' }}
            _active={{ bg: '#082463' }}
            _focus={{ bg: '#082463' }}
          >
            Add Election +
          </Button>
        </Box>
      </Flex>
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
