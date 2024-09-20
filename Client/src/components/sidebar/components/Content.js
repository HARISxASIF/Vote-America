// chakra imports
import { Box, Flex, Stack,Button,Icon} from "@chakra-ui/react";
import {
  MdLock,
} from 'react-icons/md';

import { useNavigate } from 'react-router-dom';

//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import SidebarCard from "components/sidebar/components/SidebarCard";
import React from "react";


// FUNCTIONS

function SidebarContent(props) {

  const navigate = useNavigate();

  // Logout Function
  const handleLogout = () => {
  localStorage.removeItem('authToken');
  navigate('/auth'); // Redirect to login
  };

  const { routes } = props;
  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
          <Button  
          onClick={handleLogout}
          bg="#082463"
          color="#fff"
          borderRadius="5px"
          marginTop="15px"
          marginLeft="10px"
          _hover={{ bg: '#CF2B28' }}
          _active={{ bg: '#082463' }}
          _focus={{ bg: '#082463' }}
          >
            <Icon as={MdLock} width="20px" height="20px" color="#fff" marginRight="7px" />
            Log Out
          </Button>
        </Box>
      </Stack>

      <Box
        mt='60px'
        mb='40px'
        borderRadius='30px'>
        
      </Box>
    </Flex>
  );
}

export default SidebarContent;
