import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Image,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const randomNumber = Math.round(Math.random());
  const randomImage =
    randomNumber === 0
      ? '/images/zachary-kadolph-front.jpg'
      : '/images/zachary-kadolph-profile.jpg';

  const handleOnClick = e => {
    e.preventDefault();
    navigate(`/products/${product.id}`);
  };

  return (
    <Card color="brand.rich_black" bg="whiteAlpha.900">
      <CardHeader mx="auto">
        <Heading as="h4">{product.name}</Heading>
      </CardHeader>
      <CardBody mx="auto">
        <Image
          src={randomImage}
          alt="boxer in the ring"
          boxSize="12rem"
          objectFit="cover"
        />
      </CardBody>
      <CardFooter mx="auto">
        <Button
          bg="brand.rich_black"
          color="whiteAlpha.900"
          _hover={{ bg: 'whiteAlpha.900', color: 'brand.rich_black' }}
          onClick={handleOnClick}
        >
          More details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
