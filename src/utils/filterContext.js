
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export function useFilterContext() {
  return useContext(FilterContext);
}

export function FilterProvider({ children }) {
  const [selectedFilter, setSelectedFilter] = useState('recommended');

  const updateFilter = (newFilter) => {
    setSelectedFilter(newFilter);
  };

  const contextValue = {
    selectedFilter,
    updateFilter,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}
