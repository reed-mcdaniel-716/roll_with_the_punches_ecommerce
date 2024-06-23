import React from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Link as ChakraLink, Text } from '@chakra-ui/react';

const CheckoutLink = () => {
  return (
    <>
      <ChakraLink
        as={ReactRouterLink}
        to="/checkout"
        color="brand.rich_black"
        fontSize="xl"
        fontWeight="semibold"
        padding={2}
      >
        <Flex alignItems="center">
          <HiOutlineShoppingCart /> <Text padding={2}>Checkout</Text>
        </Flex>
      </ChakraLink>
    </>
  );
};

export default CheckoutLink;
