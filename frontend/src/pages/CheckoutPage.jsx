import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Center,
  VStack,
  List,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Banner from '../components/Banner';
import { UserContext } from '../context/UserContext';
import CheckoutItem from '../components/products/CheckoutItem';
import { getUserCarts } from '../api/api';

const CheckoutPage = () => {
  const { auth } = useContext(UserContext);
  const currentUser = auth?.user;

  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutAttempted, setCheckoutAttempted] = useState(false);
  const [successfulCheckout, setSuccessfulCheckout] = useState(false);
  const [unsuccessfulCheckout, setUnsuccessfulCheckout] = useState(false);

  // initial data load of carts
  useEffect(() => {
    async function loadCarts() {
      const carts = Object.values(await getUserCarts(currentUser.id));
      setCarts(carts);
      setIsLoading(false);
    }
    loadCarts();
  }, []);

  const cartItems = carts.map(cart => {
    return <CheckoutItem key={cart.id} cart={cart}></CheckoutItem>;
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

  if (!checkoutAttempted) {
    return (
      <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
        <Center>
          <VStack>
            <Banner />
            <Text
              fontSize={'2xl'}
              color="whiteAlpha.900"
              margin={6}
              align={'center'}
            >
              Review your cart
            </Text>
            <List>{cartItems}</List>
            <Button
              _hover={{ bg: 'brand.rich_black', color: 'whiteAlpha.900' }}
            >
              Checkout
            </Button>
          </VStack>
        </Center>
      </Container>
    );
  }
};

export default CheckoutPage;
