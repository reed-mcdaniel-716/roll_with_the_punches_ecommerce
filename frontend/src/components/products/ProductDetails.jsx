import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../api/api';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Center,
  Container,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProduct(product_id) {
      const prod = await getProductById(product_id);
      setProduct(prod);
      setIsLoading(false);
    }
    getProduct(id);
  }, []);

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
        <CardFooter></CardFooter>
      </Card>
    </Center>
  );
};

export default ProductDetails;
