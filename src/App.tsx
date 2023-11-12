import { ToastContainer } from 'react-toastify';

import { Navbar } from '~/components';
import { Routes } from '~/routes';
import { FlexLayout } from '~/ui';

import { SearchProvider, SelectedTabFilterProvider } from './context';

function App() {
  return (
    <SelectedTabFilterProvider>
      <SearchProvider>
        <FlexLayout flexDirection="column" sx={{ maxWidth: '1920px', margin: '0 auto' }}>
          <Navbar />
          <FlexLayout flexDirection="column" sx={{ maxWidth: '1320px', margin: '0 auto' }}>
            <Routes />
          </FlexLayout>
          <ToastContainer />
        </FlexLayout>
      </SearchProvider>
    </SelectedTabFilterProvider>
  );
}

export default App;
