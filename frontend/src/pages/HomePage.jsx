import React, { useContext } from 'react';
import { Center, Container, Heading, VStack } from '@chakra-ui/react';
import Banner from '../components/Banner';
import ProductListings from '../components/products/ProductListings';
import { UserContext } from '../context/UserContext';

const HomePage = () => {
  const { auth } = useContext(UserContext);
  const currentUser = auth?.user;
  return (
    <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
      <Center>
        <VStack>
          <Banner />
          <Heading as="h3" color="whiteAlpha.900" margin={6}>
            Welcome {currentUser.username}, let's get you some gear
          </Heading>
          <ProductListings />
        </VStack>
      </Center>
    </Container>
  );
};

export default HomePage;
