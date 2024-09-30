import React from 'react';
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Text, Icon, Image, Flex, Box, Button } from '@chakra-ui/react';
import { TbEdit } from "react-icons/tb";

const UserTable = ({ users, onEdit, openModal }) => {

  return (
    <TableContainer position="relative" top="80px" className='userTable'>
      {/* <Flex
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
            Add User +
          </Button>
        </Box>
      </Flex> */}
      <Text color="#082463" fontWeight="600" fontSize="22px" mb="15px">
        User List
      </Text>
      <Table variant="striped" colorScheme="blackAlpha">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Image</Th>
            <Th
            whiteSpace= 'normal'
            >Personal Details Status</Th>
            <Th 
            whiteSpace= 'normal'
            >Government Photo ID Status</Th>
            <Th>Candidate ID</Th>
            <Th isNumeric>ACTIONS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              <Td>{user.first_name}</Td>
              <Td>{user.last_name}</Td>
              <Td>{user.email}</Td>
              <Td>{user.phone}</Td>
              <Td>
                <Image
                  src={user.image}
                  alt={`${user.first_name} image`}
                  boxSize="50px"
                  borderRadius="10px"
                  objectFit="cover"
                />
              </Td>
              <Td>{user.personal_details_status}</Td>
              <Td>{user.government_photo_id_status}</Td>
              <Td>{user.candidate_id}</Td>
              <Td isNumeric>
                <button onClick={() => onEdit(user)}>
                  <Icon as={TbEdit} />
                </button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
