import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Center,
  Container,
  Heading,
  VStack,
} from '@chakra-ui/react';
import Banner from '../components/Banner';
import { deleteAccount, logout } from '../api/api';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { auth, setAuth } = useContext(UserContext);
  const currentUser = auth?.user;
  const navigate = useNavigate();

  const handleLogout = async e => {
    e.preventDefault();
    const logoutResp = await logout();
    setAuth(logoutResp);
    navigate('/login');
  };

  const handleDeleteAccount = async e => {
    console.log('handleDeleteAccount called ...');
    e.preventDefault();
    const deleteAcctResp = await deleteAccount();
    setAuth(deleteAcctResp);
    navigate('/login');
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
                Hello {currentUser.username}
              </Heading>
            </CardHeader>
            <CardBody>
              <VStack>
                <Button
                  onClick={handleLogout}
                  _hover={{ bg: 'brand.rich_black', color: 'whiteAlpha.900' }}
                >
                  Logout
                </Button>
                <Button
                  _hover={{ bg: 'brand.rich_black', color: 'whiteAlpha.900' }}
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Center>
    </Container>
  );
};

export default ProfilePage;
