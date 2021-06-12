import { ToastContainer } from 'react-toastify';

import { Navbar } from '~/components';

import { Routes } from './routes';

function App() {
  return (
    <>
      <Navbar />
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
