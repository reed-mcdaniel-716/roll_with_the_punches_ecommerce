import React from 'react';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Flex, Link as ChakraLink, Text } from '@chakra-ui/react';

const ProfileLink = () => {
  return (
    <>
      <ChakraLink
        as={ReactRouterLink}
        to="/profile"
        color="brand.rich_black"
        fontSize="xl"
        fontWeight="semibold"
        padding={2}
      >
        <Flex alignItems="center">
          <HiOutlineUserCircle /> <Text padding={2}>Profile</Text>
        </Flex>
      </ChakraLink>
    </>
  );
};

export default ProfileLink;
