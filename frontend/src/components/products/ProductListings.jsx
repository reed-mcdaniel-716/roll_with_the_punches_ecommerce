import { getAllProducts } from '../../api/api';
import { useState, useEffect } from 'react';
import { Container, SimpleGrid } from '@chakra-ui/react';
import ProductCard from './ProductCard';

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

  const productCards = products.map((product, idx) => {
    return <ProductCard key={idx} product={product} />;
  });

  return (
    <SimpleGrid columns={3} spacing={4}>
      {productCards}
    </SimpleGrid>
  );
};

export default ProductListings;
