import React from 'react';
import PropTypes from 'prop-types';
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
const OrderHistoryItem = ({ order }) => {
  return (
    <AccordionItem color="whiteAlpha.900">
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {order.id}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={2}>
        Order placed date: {new Date(order.order_date).toDateString()}
        <br />
        Total: {order.total_cost}
        <br />
        Gift: {JSON.stringify(order.is_gift)}
      </AccordionPanel>
    </AccordionItem>
  );
};

OrderHistoryItem.propTypes = {
  order: PropTypes.object,
};

export default OrderHistoryItem;
