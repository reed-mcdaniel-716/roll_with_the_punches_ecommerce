import { getAllProducts } from '../api/api';
import { useState, useEffect } from 'react';
import { Container, UnorderedList, ListItem } from '@chakra-ui/react';

const ProductListings = () => {
  const [products, setProducts] = useState([]);
  // initial data load of products
  useEffect(() => {
    async function loadProducts() {
      const products = await getAllProducts();
      setProducts(products);
    }
    loadProducts();
  }, []);
  const productItems = products.map((product, idx) => {
    return <ListItem key={idx}>{JSON.stringify(product, null, 2)}</ListItem>;
  });
  return (
    <Container
      bg="brand.rich_black"
      maxWidth="100%"
      minHeight="100vh"
      color="whiteAlpha.900"
    >
      <UnorderedList spacing={3}>{productItems}</UnorderedList>
    </Container>
  );
};

export default ProductListings;
