import {
  Center,
  Container,
  Heading,
  Highlight,
  VStack,
} from '@chakra-ui/react';
import Banner from '../components/Banner';

const Home = () => {
  return (
    <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
      <Center>
        <Banner />
      </Center>
    </Container>
  );
};

export default Home;
