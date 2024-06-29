import React, { useContext } from 'react';
import { Flex, Heading } from '@chakra-ui/react';
import Banner from '../components/Banner';
import ProductListings from '../components/products/ProductListings';
import { UserContext } from '../context/UserContext';

const HomePage = () => {
  const { auth } = useContext(UserContext);
  const currentUser = auth?.user;
  return (
    <Flex
      bg="brand.rich_black"
      direction={'column'}
      align={'center'}
      justify={'center'}
    >
      <Banner />
      <Heading as="h3" color="whiteAlpha.900" margin={6}>
        Welcome {currentUser.username}, let&apos;s get you some gear
      </Heading>
      <ProductListings />
    </Flex>
  );
};

export default HomePage;
