/* eslint-disable no-undef */
const baseUrl =
  process.env.REACT_APP_NODE_ENV === 'dev'
    ? process.env.REACT_APP_LOCAL_SERVER_URL
    : process.env.REACT_APP_SERVER_URL;

// Auth
export const logout = async () => {
  const resp = await fetch(`${baseUrl}/auth/logout`, {
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
  const resp = await fetch(`${baseUrl}/users/delete`, {
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
  const resp = await fetch(`${baseUrl}/products`, {
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
  const resp = await fetch(`${baseUrl}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const product = await resp.json();
  return product;
};

export const manageCart = async (user_id, product_id, quantity) => {
  const resp = await fetch(`${baseUrl}/carts/manage`, {
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
  const resp = await fetch(`${baseUrl}/carts/${user_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const carts = await resp.json();
  return carts;
};

export const checkout = async (user_id, is_gift) => {
  const resp = await fetch(`${baseUrl}/checkout/${user_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ is_gift }),
  });

  const checkout_result = await resp.json();
  return checkout_result;
};

export const getOrdersForUser = async user_id => {
  const resp = await fetch(`${baseUrl}/orders/${user_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const orders = await resp.json();
  return orders;
};
