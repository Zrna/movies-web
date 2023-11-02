import { ToastContainer } from 'react-toastify';

import { Navbar } from '~/components';
import { Routes } from '~/routes';

import { SearchProvider, SelectedTabFilterProvider } from './context';

function App() {
  return (
    <SelectedTabFilterProvider>
      <SearchProvider>
        <Navbar />
        <Routes />
        <ToastContainer />
      </SearchProvider>
    </SelectedTabFilterProvider>
  );
}

export default App;
