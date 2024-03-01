import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

interface SearchContextProps {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

const SearchContext = createContext<SearchContextProps>({ search: '', setSearch: () => null });

export const SearchProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [search, setSearch] = useState<SearchContextProps['search']>('');

  return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
};

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch Context used outside of its Provider!');
  }

  return context;
};
