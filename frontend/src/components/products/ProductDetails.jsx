import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../api/api';

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

  return <p>{JSON.stringify(product, null, 2)}</p>;
};

export default ProductDetails;
