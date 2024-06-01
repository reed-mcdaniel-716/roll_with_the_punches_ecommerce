import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
  Container,
  Heading,
  VStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import Banner from '../components/Banner';

const LoginPage = () => {
  const handleOnClick = e => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
    window.open(url, '_self');
  };
  return (
    <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
      <Center>
        <VStack>
          <Banner />
          <Card
            bg="brand.rich_black"
            my={8}
            align="center"
            borderWidth={4}
            borderColor="whiteAlpha.900"
          >
            <CardHeader>
              <Heading color="whiteAlpha.900" as="h3" size="xl">
                Please login to continue to the site
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack>
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
                  href="http://localhost:4000/auth/google"
                  color="whiteAlpha.900"
                  fontSize="xl"
                  fontWeight="semibold"
                  padding={2}
                >
                  Login with Google
                </ChakraLink>
                <Button onClick={handleOnClick}>Login</Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Center>
    </Container>
  );
};

export default LoginPage;
