// Auth
export const login = async () => {};
export const logout = async () => {};
export const authWithGoogle = async () => {};

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
