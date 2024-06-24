/* eslint-disable no-undef */
// Auth
export const logout = async () => {
  const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // from MDN: Browsers should not send credentials in preflight requests irrespective of this setting.
    credentials: 'omit',
  });

  const auth = await resp.json();
  return auth;
};

export const deleteAccount = async () => {
  const resp = await fetch(`${process.env.REACT_APP_SERVER_URL}/users/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // from MDN: Browsers should not send credentials in preflight requests irrespective of this setting.
    credentials: 'include',
  });

  const accountDeletion = await resp.json();
  return accountDeletion;
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

  const cart_result = await resp.json();
  return cart_result;
};

export const getUserCarts = async user_id => {
  const resp = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/carts/${user_id}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  );

  const carts = await resp.json();
  return carts;
};
