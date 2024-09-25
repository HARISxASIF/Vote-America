import React, { useState } from 'react';
// Formik Imports
import { useFormik } from 'formik';

// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import DefaultAuth from 'layouts/auth/Default';
// Assets
import illustration from 'assets/img/layout/logoBanner.png';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { login } from 'action/login';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
function SignIn() {
  // Chakra color mode

  const navigate = useNavigate();
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  // const [show, setShow] = React.useState(false);

  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Enter Your Email'),
      password: Yup.string().required('Enter Your Password'),
    }),

    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      // resetForm();
    },
  });
  const handleSubmit = async (initialValues) => {
    // const {email, password} = {...initialValues}

    const res = await login(initialValues);
    // console.log(res, ':res');

    if (res.status_code === 200) {
      navigate('/admin');
    } else {
      setIsError(true);
    }
  };
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      
      <Flex
        maxW={{ base: '100%', md: 'max-content' }}
        w="100%"
        mx={{ base: 'auto', lg: '0px' }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: '30px', md: '60px' }}
        px={{ base: '25px', md: '0px' }}
        mt={{ base: '40px', md: '14vh' }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: 'auto', lg: 'unset' }}
          me="auto"
          mb={{ base: '20px', md: 'auto' }}
        >
          <form
            onSubmit={formik.handleSubmit}
            className="py-4 pl-6 trademark-registration-modal "
          >
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="1rem"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              name="email"
              value={formik.email}
              onChange={formik.handleChange}
              variant="auth"
              fontSize="1rem"
              ms={{ base: '0px', md: '0px' }}
              type="email"
              placeholder="Enter Your Email Address"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            {formik.touched.email && formik.errors.email ? (
              <span className="error">{formik.errors.email}</span>
            ) : null}
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="1rem"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              name="password"
              value={formik.password}
              onChange={formik.handleChange}
              variant="auth"
              fontSize="1rem"
              ms={{ base: '0px', md: '0px' }}
              type="password"
              placeholder="Enter Your Email Address"
              mb="24px"
              fontWeight="500"
              size="lg"
            />
            {formik.touched.password && formik.errors.password ? (
              <span className="error">{formik.errors.password}</span>
            ) : null}
            <Button
              fontSize="1rem"
              type="submit"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              bg="#082463"
              _hover={{ bg: '#CF2B28' }}
              _active={{ bg: '#082463' }}
              _focus={{ bg: '#082463' }}
            >
              Sign In
            </Button>
          </form>
          {isError && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Sign In Failed</AlertTitle>
          <AlertDescription>
            Invalid Email or Password
          </AlertDescription>
        </Alert>
      )}
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            {/* <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Not registered yet?
              <NavLink to='/auth/sign-up'>
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Create an Account
                </Text>
              </NavLink>
            </Text> */}
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
