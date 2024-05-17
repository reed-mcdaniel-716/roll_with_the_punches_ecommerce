import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, HStack } from '@chakra-ui/react';

const NavBar = () => {
  return (
    <HStack spacing={10} as="nav" bg="whiteAlpha.900">
      <ChakraLink
        as={ReactRouterLink}
        to="/"
        color="brand.rich_black"
        fontSize="xl"
        fontWeight="semibold"
        padding={4}
      >
        Home
      </ChakraLink>
    </HStack>
  );
};
export default NavBar;
