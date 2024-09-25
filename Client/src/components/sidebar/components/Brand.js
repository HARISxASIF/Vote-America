import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
// import { HorizonLogo } from "components/icons/Icons";  
import { HSeparator } from "components/separator/Separator";
import LogoImage  from "../../../assets/img/layout/brandLogo.svg";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      {/* <LogoImage h='26px' w='175px' my='32px' color={logoColor} /> */}
      <img
      src={LogoImage}
      alt=""
      style={{
        height: '100%',
      }}
      />
      <HSeparator mb='20px' mt="10px" />
    </Flex>
  );
}

export default SidebarBrand;
