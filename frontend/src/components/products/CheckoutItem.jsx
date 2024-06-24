import React, { useEffect, useState } from 'react';
import {
  Button,
  Center,
  Container,
  HStack,
  ListIcon,
  ListItem,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { getProductById } from '../../api/api';
import PropTypes from 'prop-types';

const CheckoutItem = ({ cart }) => {
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
    <ListItem key={cart.id} my={4}>
      <HStack spacing={2}>
        <ListIcon as={CheckIcon} color="green.500" />
        <Text color="whiteAlpha.900">
          {product.name}: {cart.quantity}
        </Text>
        <Button
          _hover={{ bg: 'brand.rich_black', color: 'whiteAlpha.900' }}
          onClick={handleOnClick}
        >
          Update
        </Button>
      </HStack>
    </ListItem>
  );
};

CheckoutItem.propTypes = {
  cart: PropTypes.object,
};

export default CheckoutItem;
