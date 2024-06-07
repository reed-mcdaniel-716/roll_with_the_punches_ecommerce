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
  Spinner,
} from '@chakra-ui/react';
import Banner from '../components/Banner';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const LoginPage = () => {
  const handleOnClick = e => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_SERVER_URL}/auth/google`;
    window.open(url, '_self');
  };

  const { auth, isLoading } = useContext(UserContext);

  console.log('isLoading in PrivateRoute:', isLoading);
  console.log('auth in PrivateRoute:', auth);

  if (isLoading) {
    return <Spinner color="whiteAlpha.900" />;
  }

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
                <Button onClick={handleOnClick}>Google Login</Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Center>
    </Container>
  );
};

export default LoginPage;
