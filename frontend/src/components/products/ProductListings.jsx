import { getAllProducts } from '../../api/api';
import { useState, useEffect } from 'react';
import { SimpleGrid, Select } from '@chakra-ui/react';
import ProductCard from './ProductCard';

const ProductListings = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  // initial data load of products
  useEffect(() => {
    async function loadProducts() {
      const products = await getAllProducts();
      setAllProducts(products);
      setProducts(products);
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

  return (
    <>
      <Select
        alt="Select a product category"
        onChange={handleOnChange}
        bg="whiteAlpha.900"
        size="lg"
      >
        {productOptions}
      </Select>
      <SimpleGrid columns={3} spacing={4}>
        {productCards}
      </SimpleGrid>
    </>
  );
};

export default ProductListings;
