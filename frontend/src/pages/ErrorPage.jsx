import React from 'react';
import { Container, Heading, VStack } from '@chakra-ui/react';

const ErrorPage = () => {
  return (
    <>
      <Container
        bg="brand.rich_black"
        maxWidth="100%"
        minHeight="100vh"
        color="whiteAlpha.900"
      >
        <VStack>
          <Heading as="h1">Error 404</Heading>
        </VStack>
      </Container>
    </>
  );
};

export default ErrorPage;
