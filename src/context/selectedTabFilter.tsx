import React, { Dispatch, SetStateAction, useState } from 'react';

const SelectedTabFilterContext = React.createContext<{
  selectedTabFilter: string;
  setSelectedTabFilter: Dispatch<SetStateAction<string>>;
}>({ selectedTabFilter: '', setSelectedTabFilter: () => null });

export const SelectedTabFilterProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [selectedTabFilter, setSelectedTabFilter] = useState('all reviews');

  return (
    <SelectedTabFilterContext.Provider value={{ selectedTabFilter, setSelectedTabFilter }}>
      {children}
    </SelectedTabFilterContext.Provider>
  );
};

export const useSelectedTabFilter = () => {
  const result = React.useContext(SelectedTabFilterContext);

  if (!result) {
    throw new Error('Context used outside of its Provider!');
  }

  return result;
};
