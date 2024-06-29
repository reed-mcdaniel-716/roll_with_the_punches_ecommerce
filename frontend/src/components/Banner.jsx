import React from 'react';
import { Flex, Heading, Highlight } from '@chakra-ui/react';

const Banner = () => {
  return (
    <Flex direction={'column'} align={'center'} justify={'center'}>
      <Heading color="whiteAlpha.900" as="h1" size="3xl">
        Roll with the Punches
      </Heading>
      <br />
      <Heading color="whiteAlpha.900" as="h2" size="xl">
        <Highlight
          query="Premier Boxing Gear"
          styles={{
            px: '2',
            py: '1',
            rounded: 'full',
            bg: 'whiteAlpha.900',
            color: 'brand.rich_black',
          }}
        >
          Your Home For Premier Boxing Gear
        </Highlight>
      </Heading>
    </Flex>
  );
};

export default Banner;
