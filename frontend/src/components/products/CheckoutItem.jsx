import { ListItem } from '@chakra-ui/react';

const CheckoutItem = ({ cart }) => {
  return <ListItem>{cart.id}</ListItem>;
};

export default CheckoutItem;
