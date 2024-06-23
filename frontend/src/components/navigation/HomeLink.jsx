import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

const HomeLink = () => {
  return (
    <ChakraLink
      as={ReactRouterLink}
      to="/"
      color="brand.rich_black"
      fontSize="xl"
      fontWeight="semibold"
      padding={2}
    >
      Home
    </ChakraLink>
  );
};

export default HomeLink;
