import { Flex, Spacer } from '@chakra-ui/react';
import HomeLink from './HomeLink';
import CheckoutLink from './CheckoutLink';
import ProfileLink from './ProfileLink';

const NavBar = () => {
  return (
    <Flex p={2} as="nav" bg="whiteAlpha.900" alignItems="center">
      <HomeLink />
      <Spacer />
      <CheckoutLink />
      <Spacer />
      <ProfileLink />
    </Flex>
  );
};
export default NavBar;
