import {
  Center,
  Container,
  Heading,
  Highlight,
  VStack,
} from '@chakra-ui/react';

const LoginPage = () => {
  return (
    <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
      <Center>
        <VStack>
          <Heading color="whiteAlpha.900" as="h1" size="3xl">
            Login
          </Heading>
        </VStack>
      </Center>
    </Container>
  );
};

export default LoginPage;
