/* eslint-disable */
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue,Button } from "@chakra-ui/react";

export function SidebarLinks(props) {



  //   Chakra color mode
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "secondaryGray.600",
    "secondaryGray.600"
  );
  let activeIcon = useColorModeValue("brand.500", "white");
  let textColor = useColorModeValue("secondaryGray.500", "white");
  let brandColor = useColorModeValue("brand.500", "brand.400");

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routePath) => {
    return location.pathname === routePath;
  };

  // this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
  const createLinks = (routes) => {
    return routes
      .filter((route) => !route.isHidden) // Exclude hidden routes
      .map((route, index) => {
        if (route.category) {
          return (
            <>
              <Text
                fontSize={"md"}
                color={activeColor}
                fontWeight='bold'
                mx='auto'
                ps={{
                  sm: "10px",
                  xl: "16px",
                }}
                pt='18px'
                pb='12px'
                key={index}>
                {route.name}
              </Text>
              {createLinks(route.items)}
            </>
          );
        } else if (
          route.layout === "/admin" ||
          route.layout === "/auth" ||
          route.layout === "/rtl"
        ) {
          return (
            <NavLink key={index} to={route.layout + route.path}>
              {route.icon ? (
                <Box>
                  <HStack
                    spacing={activeRoute(route.layout + route.path) ? "22px" : "26px"}
                    py='5px'
                    ps='10px'>
                    <Flex w='100%' alignItems='center' justifyContent='center'>
                      <Box
                        color={
                          activeRoute(route.layout + route.path)
                            ? activeIcon
                            : textColor
                        }
                        me='18px'>
                        {route.icon}
                      </Box>
                      <Text
                        me='auto'
                        color={
                          activeRoute(route.layout + route.path)
                            ? activeColor
                            : textColor
                        }
                        fontWeight={
                          activeRoute(route.layout + route.path)
                            ? "bold"
                            : "normal"
                        }>
                        {route.name}
                      </Text>
                    </Flex>
                    <Box
                      h='36px'
                      w='4px'
                      bg={
                        activeRoute(route.layout + route.path)
                          ? "#082463"
                          : "transparent"
                      }
                      borderRadius='5px'
                    />
                  </HStack>
                </Box>
              ) : (
                <Box>
                  <HStack
                    spacing={activeRoute(route.layout + route.path) ? "22px" : "26px"}
                    py='5px'
                    ps='10px'>
                    <Text
                      me='auto'
                      color={
                        activeRoute(route.layout + route.path)
                          ? activeColor
                          : inactiveColor
                      }
                      fontWeight={
                        activeRoute(route.layout + route.path) ? "bold" : "normal"
                      }>
                      {route.name}
                    </Text>
                    <Box h='36px' w='4px' bg='#082463' borderRadius='5px' />
                  </HStack>
                </Box>
              )}
            </NavLink>
          );
        }
      });
  };
  
  
  //  BRAND
  return createLinks(routes);
}

export default SidebarLinks;
