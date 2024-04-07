import { getAllProducts } from "../api/api";
import { Container,UnorderedList, ListItem } from "@chakra-ui/react";

const ProductListings = async () => {
    const products = await getAllProducts();
    return (
        <Container>
            <UnorderedList>
                {products.map((product) => {
                    return <ListItem>{product}</ListItem>
                })}
            </UnorderedList>
        </Container>
    )

}

export default ProductListings;