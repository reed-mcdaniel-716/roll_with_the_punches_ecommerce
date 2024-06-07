import { Center, Container, Heading, VStack } from '@chakra-ui/react';
import Banner from '../components/Banner';

const HomePage = ({ user }) => {
  return (
    <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
      <Center>
        <VStack>
          <Banner />
          <Heading as="h3" color="whiteAlpha.900">
            You are home{`${JSON.stringify(user)}`}
          </Heading>
        </VStack>
      </Center>
    </Container>
  );
};

export default HomePage;
