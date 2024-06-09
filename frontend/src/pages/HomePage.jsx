import { Center, Container, Heading, VStack } from '@chakra-ui/react';
import Banner from '../components/Banner';
import ProductListings from '../components/products/ProductListings';

const HomePage = ({ user }) => {
  return (
    <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
      <Center>
        <VStack>
          <Banner />
          <Heading as="h3" color="whiteAlpha.900" margin={6}>
            Welcome {user.username}, let's get you some gear
          </Heading>
          <ProductListings />
        </VStack>
      </Center>
    </Container>
  );
};

export default HomePage;
