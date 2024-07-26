// CounterContext.js
import React, { createContext, useState } from 'react';

// Create a context for the counter
export const CounterContext = createContext();

// Create a provider component
export const CounterProvider = ({ children }) => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);

    return (
        <CounterContext.Provider value={{ count, increment, decrement }}>
            {children}
        </CounterContext.Provider>
    );
};
