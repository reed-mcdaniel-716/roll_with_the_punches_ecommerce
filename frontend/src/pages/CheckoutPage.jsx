import React, { useContext, useEffect, useState } from 'react';
import { Container, Center, VStack, Heading, List } from '@chakra-ui/react';
import Banner from '../components/Banner';
import { UserContext } from '../context/UserContext';
import CheckoutItem from '../components/products/CheckoutItem';
import { getUserCarts } from '../api/api';

const CheckoutPage = () => {
  const { auth } = useContext(UserContext);
  const currentUser = auth?.user;

  const [carts, setCarts] = useState([]);
  const [checkedOut, setCheckedOut] = useState(false);

  // initial data load of carts
  useEffect(() => {
    async function loadCarts() {
      const carts = await getUserCarts(currentUser.id);
      setCarts(carts);
    }
    loadCarts();
  }, []);

  const cartItems = carts.map(cart => {
    return <CheckoutItem key={cart.id} cart={cart}></CheckoutItem>;
  });

  return (
    <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
      <Center>
        <VStack>
          <Banner />
          <Heading as="h3" color="whiteAlpha.900" margin={6}>
            Welcome {currentUser.username}, let's get you some gear
          </Heading>
          <Heading as="h4" color="whiteAlpha.900" margin={6}>
            Check your cart and head back to the product pages if you'd like to
            make updates
          </Heading>
          <List>{cartItems}</List>
        </VStack>
      </Center>
    </Container>
  );
};

export default CheckoutPage;
