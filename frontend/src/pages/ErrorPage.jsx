import { useRouteError } from 'react-router-dom';
import { Container, Heading, VStack } from '@chakra-ui/react';

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <Container
      bg="brand.rich_black"
      maxWidth="100%"
      minHeight="100vh"
      color="whiteAlpha.900"
    >
      <VStack>
        <Heading as="h1">Error</Heading>
        <Heading as="h2">{error.statusHeading || error.message}</Heading>
      </VStack>
    </Container>
  );
};

export default ErrorPage;
