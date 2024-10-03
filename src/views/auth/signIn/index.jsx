import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Flex, FormLabel, Heading, Input, Text, useColorModeValue, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import DefaultAuth from 'layouts/auth/Default';
import illustration from 'assets/img/layout/logoBanner.png';
import { useNavigate } from 'react-router-dom';
import { login } from 'action/Login API/login';

function SignIn({ setIsAuthenticated,isAuthenticated }) {
  const navigate = useNavigate();
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = 'gray.400';
  const brandStars = useColorModeValue('brand.500', 'brand.400');

  const [isError, setIsError] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Enter Your Email'),
    password: Yup.string().required('Enter Your Password'),
  });

  // Redirect if token is already in localStorage
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/admin');
  //   }
  // }, [isAuthenticated, navigate]);

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsError(false);
    const res = await login(values);

    if (res.status_code === 200) {

      localStorage.setItem('authToken', res.token);
      navigate('/admin');
      setIsAuthenticated(true);    
      
    } else {
      setIsError(true);
    }

    setSubmitting(false);
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
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
                <Field
                  as={Input}
                  name="email"
                  variant="auth"
                  fontSize="1rem"
                  ms={{ base: '0px', md: '0px' }}
                  type="email"
                  placeholder="Enter Your Email Address"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                />
                <ErrorMessage name="email" component="div" style={{ color: 'red', marginBottom: '10px' }} />

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
                <Field
                  as={Input}
                  name="password"
                  variant="auth"
                  fontSize="1rem"
                  ms={{ base: '0px', md: '0px' }}
                  type="password"
                  placeholder="Enter Your Password"
                  mb="24px"
                  fontWeight="500"
                  size="lg"
                />
                <ErrorMessage name="password" component="div" style={{ color: 'red', marginBottom: '10px' }} />

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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </Form>
            )}
          </Formik>

          {isError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Sign In Failed</AlertTitle>
              <AlertDescription>
                Invalid Email or Password
              </AlertDescription>
            </Alert>
          )}
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
