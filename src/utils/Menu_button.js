import React, { useState, useContext } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { UseSelector } from 'react-redux/es/hooks/useSelector';
//
import { CounterContext } from "../utils/itemNumContext";


function AddRemoveButton({ onAdd, onRemove }) {
  const { increment, decrement } = useContext(CounterContext);
  const [count, setCount] = useState(0);

  const handleAddItem = () => {
    setCount(count + 1);
    onAdd();
    increment();
  };

  const handleRemoveItem = () => {
    if (count > 0) {
      setCount(count - 1);
      onRemove();
      decrement();
    }
  };
  // const cartItems = useSelector(store=>store.cart.items)
  return (
    <div className="flex flex-wrap border-2 rounded-md hover:shadow-md">
      <Button
        size='small'
        variant="text"
        color="secondary"
        onClick={handleRemoveItem}
        startIcon={<RemoveIcon />}
        disabled={count === 0}
      >
      </Button>
      <p>{count}</p>
      <Button
        size='small'
        variant="text"
        color="primary"
        onClick={handleAddItem}
        startIcon={<AddIcon />}
      >
      </Button>
    </div>
  );
}

export default AddRemoveButton;
