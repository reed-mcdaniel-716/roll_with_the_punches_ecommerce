import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Button,
  Container,
  Center,
  Checkbox,
  VStack,
  List,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Banner from '../components/Banner';
import { UserContext } from '../context/UserContext';
import CheckoutItem from '../components/products/CheckoutItem';
import { getUserCarts, checkout } from '../api/api';

const CheckoutPage = () => {
  const { auth } = useContext(UserContext);
  const currentUser = auth?.user;

  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutAttempted, setCheckoutAttempted] = useState(false);
  const [successfulCheckout, setSuccessfulCheckout] = useState(false);
  const [unsuccessfulCheckout, setUnsuccessfulCheckout] = useState(false);
  const [isGift, setIsGift] = useState(false);

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
    // eslint-disable-next-line react/jsx-key
    return <CheckoutItem key={cart.id} cart={cart}></CheckoutItem>;
  });

  const handleOnClick = async e => {
    e.preventDefault();
    const checkout_result = await checkout(currentUser.id, isGift);
    if (checkout_result.id) {
      setSuccessfulCheckout(true);
      setCheckoutAttempted(true);
    } else {
      setUnsuccessfulCheckout(true);
      setCheckoutAttempted(true);
    }
  };

  if (isLoading) {
    return (
      <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
        <Center>
          <Spinner color="whiteAlpha.900" />
        </Center>
      </Container>
    );
  }

  if (!isLoading && !checkoutAttempted && carts.length === 0) {
    return (
      <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
        <Center>
          <Text color="whiteAlpha.900" fontSize={'2xl'}>
            {' '}
            No items to checkout. Head to Home to continue shopping.
          </Text>
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
            <Checkbox
              color="whiteAlpha.900"
              isChecked={isGift}
              onChange={e => setIsGift(e.target.checked)}
            >
              Gift order
            </Checkbox>
            <Button
              _hover={{ bg: 'brand.rich_black', color: 'whiteAlpha.900' }}
              onClick={handleOnClick}
            >
              Checkout
            </Button>
          </VStack>
        </Center>
      </Container>
    );
  }

  return (
    <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
      <Center>
        <VStack>
          {unsuccessfulCheckout && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Checkout was not successful</AlertTitle>
              <AlertDescription>
                Please refresh the page and try again
              </AlertDescription>
            </Alert>
          )}
          {successfulCheckout && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>Checkout was successful</AlertTitle>
              <AlertDescription>
                Head to Home to ontinue shopping
              </AlertDescription>
            </Alert>
          )}
        </VStack>
      </Center>
    </Container>
  );
};

export default CheckoutPage;
