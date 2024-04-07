const API_ENDPOINT = 'http://localhost:4000'

export const getAllProducts = async () => {
    const resp = await fetch(`${API_ENDPOINT}/products`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
    
      const products = await resp.json();
      return products;
}