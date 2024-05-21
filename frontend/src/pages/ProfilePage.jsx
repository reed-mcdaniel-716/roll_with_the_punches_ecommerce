import {
  Center,
  Container,
  Heading,
  Highlight,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

const onLogoutClick = e => {};
const onLogoutKeyDown = e => {};

const onGoogleOAuthClick = e => {};
const onGoogleOAuthKeyDown = e => {};

const ProfilePage = () => {
  return (
    <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
      <Center>
        <VStack>
          <Heading color="whiteAlpha.900" as="h1" size="3xl">
            Welcome
          </Heading>
          <ChakraLink
            as={ReactRouterLink}
            to="/auth/login"
            color="whiteAlpha.900"
            fontSize="xl"
            fontWeight="semibold"
            padding={2}
          >
            Login
          </ChakraLink>
          <ChakraLink
            as={ReactRouterLink}
            to="/auth/logout"
            color="whiteAlpha.900"
            fontSize="xl"
            fontWeight="semibold"
            padding={2}
          >
            Logout
          </ChakraLink>
          {/*
          trying making this a button instead, with a function abstraction
          button/enter key > onWhatever > api function > server side handling >
          return resp > navigate to protected page on success in onWhatever
          */}
          <ChakraLink
            href="http://localhost:4000/auth/google"
            isExternal
            color="whiteAlpha.900"
            fontSize="xl"
            fontWeight="semibold"
            padding={2}
          >
            Login with Google
          </ChakraLink>
        </VStack>
      </Center>
    </Container>
  );
};

export default ProfilePage;
