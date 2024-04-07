import { useRouteError } from "react-router-dom";
import { Container, VStack, Text } from "@chakra-ui/react";

const ErrorPage = () => {
    const error = useRouteError();
    console.log(error);

    return (
        <Container bg='gray.800' maxWidth="100%" minHeight="100vh" color='gray.300'>
            <VStack>
                <Text>Error</Text>
                <Text>{error.statusText || error.message}</Text>
            </VStack>
        </Container>
    )
}

export default ErrorPage;