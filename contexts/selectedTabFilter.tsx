import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

interface SelectedTabFilterContextProps {
  selectedTabFilter: string;
  setSelectedTabFilter: Dispatch<SetStateAction<string>>;
}

const SelectedTabFilterContext = createContext<SelectedTabFilterContextProps>({
  selectedTabFilter: '',
  setSelectedTabFilter: () => null,
});

export const SelectedTabFilterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [selectedTabFilter, setSelectedTabFilter] =
    useState<SelectedTabFilterContextProps['selectedTabFilter']>('all reviews');

  return (
    <SelectedTabFilterContext.Provider value={{ selectedTabFilter, setSelectedTabFilter }}>
      {children}
    </SelectedTabFilterContext.Provider>
  );
};

export const useSelectedTabFilter = () => {
  const context = useContext(SelectedTabFilterContext);

  if (!context) {
    throw new Error('useSelectedTabFilter Context used outside of its Provider!');
  }

  return context;
};
