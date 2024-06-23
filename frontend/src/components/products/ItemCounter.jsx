import React from 'react';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ItemCounter = ({ count, setCount }) => {
  const handleOnChange = (_valueAsString, valueAsNumber) => {
    setCount(valueAsNumber);
  };
  return (
    <NumberInput
      defaultValue={0}
      min={0}
      max={20}
      size="lg"
      value={count}
      onChange={handleOnChange}
      aria-label="product count"
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

ItemCounter.PropTypes = {
  firstname: PropTypes.string.isRequired,
};

export default ItemCounter;
