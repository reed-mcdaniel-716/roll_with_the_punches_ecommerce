import { Heading, Highlight, VStack } from '@chakra-ui/react';

const Banner = () => {
  return (
    <VStack>
      <Heading color="whiteAlpha.900" as="h1" size="3xl">
        Roll with the Punches
      </Heading>
      <Heading color="whiteAlpha.900" as="h2" size="2xl">
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
    </VStack>
  );
};

export default Banner;
