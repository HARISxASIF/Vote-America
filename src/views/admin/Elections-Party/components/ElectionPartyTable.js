// import React, { useState } from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Icon, Image, Flex, Box, Button } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import deleteElectionParty from '../../../../action/ElectionsParty-API/deleteElectionParty';
import Swal from 'sweetalert2'
import ElectionCategoryList from 'components/scrollableList/ScrollableList';

const ElectionPartyTable = ({ electionsParty, onEdit, parentElections, onDelete, token,openModal }) => {
  
  const handleDelete = async (partyId) => {
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
        const result = await deleteElectionParty(partyId, token); // Your delete function call
        if (result.success) {
          Swal.fire({
            title: "Success!",
            text: result.message,
            icon: "success",
            confirmButtonColor: "#082463",
          });
          onDelete(); // Call onDelete to refresh the list
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

  const getParentElectionName = (election_category_id) => {
    if (!Array.isArray(election_category_id)) {
      election_category_id = [election_category_id]; // Normalize to array
    }
  
    return election_category_id
      .map((id) => {
        const parentElection = parentElections.find((e) => e._id === id);
        return parentElection ? parentElection.name : 'N/A';
      })
      .join(', ');
  };



  const ParentElectionCell = ({ electionCategoryIds }) => {
    return (
      <Td 
        wordBreak="break-all"
        whiteSpace="normal"
        width="300px"
      >
        <ElectionCategoryList categoryIds={getParentElectionName(electionCategoryIds)} />
      </Td>
    );
  };




  return (
    <TableContainer position="relative" top="80px" className='partyTable'>
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
            Add Election Party +
          </Button>
        </Box>
      </Flex>
      <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
        Elections Party List
      </Text>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>NAME</Th>
            <Th>Icon</Th>
            <Th>Election Category</Th>
            <Th>Description</Th>
            <Th isNumeric>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {electionsParty.map((party, index) => (
            <Tr key={index}>
              <Td>{party.name}</Td>
              <Td padding="0px" width="120px"><Image src={party.icon} alt={`${party.name} icon`} height="auto" borderRadius="10px" objectFit="none" width="100%" /></Td>
              <Td>
                <ElectionCategoryList 
                  categoryIds={party.election_category_id} 
                  parentElections={parentElections} 
                />
              </Td>
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
                  {party.description}
                </Text>
              </Td>
              <Td isNumeric>
                <button onClick={() => onEdit(party)}>
                  <Icon as={TbEdit} />
                </button>
                <button 
                  style={{ marginLeft: "10px" }}
                  onClick={() => handleDelete(party._id)} 
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

export default ElectionPartyTable;
