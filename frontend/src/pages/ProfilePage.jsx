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
          <ChakraLink
            as={ReactRouterLink}
            to="/auth/google"
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
