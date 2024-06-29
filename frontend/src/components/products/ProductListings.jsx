import { getAllProducts } from '../../api/api';
import React, { useState, useEffect } from 'react';
import {
  Center,
  Container,
  SimpleGrid,
  Select,
  Spinner,
} from '@chakra-ui/react';
import ProductCard from './ProductCard';

const ProductListings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  // initial data load of products
  useEffect(() => {
    async function loadProducts() {
      const products = await getAllProducts();
      setAllProducts(products);
      setProducts(products);
      setIsLoading(false);
    }
    loadProducts();
  }, []);

  const handleOnChange = e => {
    const chosenCategory = e.target.value;
    if (chosenCategory === 'all') {
      setProducts(allProducts);
      return;
    }
    const filteredProducts = allProducts.filter(
      product => product.category === chosenCategory
    );
    setProducts(filteredProducts);
  };

  const productCategories = Array.from(
    new Set(allProducts.map(product => product.category))
  );

  const productOptions = productCategories.map(category => {
    return (
      <option value={category} key={category}>
        {category}
      </option>
    );
  });

  productOptions.unshift(
    <option value="all" key="all">
      All Products
    </option>
  );

  const productCards = products.map((product, idx) => {
    return <ProductCard key={idx} product={product} />;
  });

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
    <>
      <Select
        alt="Select a product category"
        onChange={handleOnChange}
        bg="whiteAlpha.900"
        size="lg"
        maxWidth={'max-content'}
      >
        {productOptions}
      </Select>
      <SimpleGrid minChildWidth={60}>{productCards}</SimpleGrid>
    </>
  );
};

export default ProductListings;
