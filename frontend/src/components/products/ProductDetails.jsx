import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../api/api';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Center,
  Container,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import ItemCounter from './ItemCounter';
import { manageCart } from '../../api/api';
import { UserContext } from '../../context/UserContext';

const ProductDetails = () => {
  const { auth } = useContext(UserContext);
  const currentUser = auth?.user;
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [successfulCartUpdate, setSuccessfulCartUpdate] = useState(false);
  const [unsuccessfulCartUpdate, setUnsuccessfulCartUpdate] = useState(false);

  useEffect(() => {
    async function getProduct(product_id) {
      const prod = await getProductById(product_id);
      setProduct(prod);
      setIsLoading(false);
    }
    getProduct(id);
  }, [id]);

  const handleOnClick = async e => {
    e.preventDefault();
    const cart_result = await manageCart(currentUser.id, id, count);
    if (cart_result.id) {
      setSuccessfulCartUpdate(true);
    } else {
      setUnsuccessfulCartUpdate(true);
    }
  };

  if (isLoading) {
    return (
      <Container bg="brand.rich_black" maxWidth="100%" minHeight="100vh">
        <Center>
          <Spinner color="whiteAlpha.900" />
        </Center>
      </Container>
    );
  }

  return (
    <Center>
      <VStack>
        {unsuccessfulCartUpdate && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Cart was not updated successfully</AlertTitle>
            <AlertDescription>
              Please refresh the page and try again
            </AlertDescription>
          </Alert>
        )}
        {successfulCartUpdate && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Cart was updated successfully</AlertTitle>
            <AlertDescription>
              Continue shopping or head to checkout
            </AlertDescription>
          </Alert>
        )}
        <Card
          bg="whiteAlpha.900"
          my={8}
          align="center"
          borderWidth={4}
          borderColor="brand.vista_blue"
        >
          <CardHeader>
            <Heading color="brand.magenta_dye" as="h1" size="xl">
              Name: {product.name}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text fontSize="xl" as="b">
              Category: {product.category}
            </Text>
            <br />
            <Text fontSize="xl" as="b">
              Brand: {product.brand}
            </Text>
            <br />
            <Text fontSize="xl" as="b">
              Size: {product.size}
            </Text>
            <br />
            <Text fontSize="xl" as="b">
              Color: {product.color}
            </Text>
            <br />
            <Text fontSize="xl" as="b">
              Price: {product.price}
            </Text>
            <br />
            <Text fontSize="xl" as="b">
              Description: {product.description}
            </Text>
          </CardBody>
          <CardFooter>
            <ItemCounter count={count} setCount={setCount} />
            <Button
              bg="brand.magenta_dye"
              color="whiteAlpha.900"
              _hover={{ bg: 'whiteAlpha.900', color: 'brand.magenta_dye' }}
              ml={4}
              onClick={handleOnClick}
            >
              Add to cart
            </Button>
          </CardFooter>
        </Card>
      </VStack>
    </Center>
  );
};

export default ProductDetails;
