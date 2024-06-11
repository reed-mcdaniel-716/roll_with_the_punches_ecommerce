import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../api/api';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Center,
  Heading,
} from '@chakra-ui/react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    async function getProduct(product_id) {
      const prod = await getProductById(product_id);
      setProduct(prod);
    }
    getProduct(id);
  }, [id]);

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
            {product.name}
          </Heading>
        </CardHeader>
        <CardBody></CardBody>
      </Card>
    </Center>
  );
};

export default ProductDetails;
