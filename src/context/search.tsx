import React, { Dispatch, SetStateAction, useState } from 'react';

const SearchContext = React.createContext<{
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}>({ search: '', setSearch: () => null });

export const SearchProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [search, setSearch] = useState('');

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const result = React.useContext(SearchContext);

  if (!result) {
    throw new Error('Context used outside of its Provider!');
  }

  return result;
};
