// Auth

// Products
export const getAllProducts = async () => {
  const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const products = await resp.json();
  return products;
};

export const getProductById = async id => {
  const resp = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/products/${id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const product = await resp.json();
  return product;
};

export const updateCart = async (product, quantity) => {
  // TODO: update current user cart
};
