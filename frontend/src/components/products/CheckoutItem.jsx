import React, { useEffect, useState } from 'react';
import {
  Button,
  Center,
  Container,
  ListIcon,
  ListItem,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/api';

const CheckoutItem = ({ cart, key }) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getProduct(product_id) {
      const prod = await getProductById(product_id);
      setProduct(prod);
      setIsLoading(false);
    }
    getProduct(cart.product_id);
  }, [cart.product_id]);

  const handleOnClick = e => {
    e.preventDefault();
    navigate(`/products/${cart.product_id}`);
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
    <ListItem key={key}>
      <ListIcon as={CheckIcon} color="green.500" />
      <Text>
        {product.name}: {cart.quantity}
      </Text>
      <Button onClick={handleOnClick}>Update</Button>
    </ListItem>
  );
};

export default CheckoutItem;
