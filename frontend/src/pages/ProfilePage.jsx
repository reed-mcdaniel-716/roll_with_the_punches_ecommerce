import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Card,
  CardHeader,
  CardBody,
  Center,
  Container,
  Heading,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import Banner from '../components/Banner';
import { deleteAccount, logout, getOrdersForUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import OrderHistoryItem from '../components/products/OrderHistoryItem';

const ProfilePage = () => {
  const { auth, setAuth } = useContext(UserContext);
  const currentUser = auth?.user;
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = async e => {
    e.preventDefault();
    const logoutResp = await logout();
    setAuth(logoutResp);
    navigate('/login');
  };

  const handleDeleteAccount = async e => {
    e.preventDefault();
    const deleteAcctResp = await deleteAccount();
    setAuth(deleteAcctResp);
    navigate('/login');
  };

  useEffect(() => {
    async function loadOrders() {
      const orders = Object.values(await getOrdersForUser(currentUser.id));
      setOrders(orders);
      setIsLoading(false);
    }
    loadOrders();
  }, []);

  const orderItems = orders.map(order => {
    // eslint-disable-next-line react/jsx-key
    return <OrderHistoryItem key={order.id} order={order}></OrderHistoryItem>;
  });

  if (isLoading) {
    return (
      <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
        <Center>
          <Spinner color="whiteAlpha.900" />
        </Center>
      </Container>
    );
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
          <Card
            bg="brand.rich_black"
            my={4}
            align="center"
            borderWidth={4}
            borderColor="whiteAlpha.900"
            maxW="md"
          >
            <CardHeader>
              <Heading color="whiteAlpha.900" as="h3" size="xl">
                Order History
              </Heading>
            </CardHeader>
            <CardBody>
              <Accordion
                defaultIndex={[0]}
                allowMultiple
                color="whiteAlpha.900"
              >
                {orderItems}
              </Accordion>
            </CardBody>
          </Card>
        </VStack>
      </Center>
    </Container>
  );
};

export default ProfilePage;
