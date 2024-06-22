import { useContext, useEffect, useState } from 'react';
import { Container, Center, VStack, Heading, List } from '@chakra-ui/react';
import Banner from '../components/Banner';
import { UserContext } from '../context/UserContext';
import CheckoutItem from '../components/products/CheckoutItem';

const CheckoutPage = () => {
  const { auth } = useContext(UserContext);
  const currentUser = auth?.user;

  const [carts, setCarts] = useState([]);
  const [checkedOut, setCheckedOut] = useState(false);

  // initial data load of carts
  useEffect(() => {
    async function loadCarts() {
      const carts = await getCarts(currentUser.id);
      setCarts(carts);
    }
    loadCarts();
  }, []);

  const cartItems = carts.map(cart => {
    return <CheckoutItem cart={cart}></CheckoutItem>;
  });

  return (
    <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
      <Center>
        <VStack>
          <Banner />
          <Heading as="h3" color="whiteAlpha.900" margin={6}>
            Welcome {currentUser.username}, let's get you some gear
          </Heading>
          <List>{cartItems}</List>
        </VStack>
      </Center>
    </Container>
  );
};

export default CheckoutPage;
