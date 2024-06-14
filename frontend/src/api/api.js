// Auth
export const logout = async () => {
  const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // figure out if this should be here
    // credentials: 'include',
  });

  const result = await resp.json();
  return result;
};

// Products
export const getAllProducts = async () => {
  const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
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
      credentials: 'include',
    }
  );

  const product = await resp.json();
  return product;
};

export const manageCart = async (user_id, product_id, quantity) => {
  const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/carts/manage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ user_id, product_id, quantity }),
  });

  console.log('cart response raw:', JSON.stringify(resp));
  const cart_result = await resp.json();
  console.log('cart result:', JSON.stringify(cart_result));
  return cart_result;
};
