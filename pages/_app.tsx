import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'theme-ui';

import { Navbar } from '~/components';
import { SearchProvider, SelectedTabFilterProvider } from '~/contexts';
import { FlexLayout, theme } from '~/ui';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <SelectedTabFilterProvider>
          <SearchProvider>
            <Head>
              <meta charSet="utf-8" />
              <meta content="width=device-width, initial-scale=1" name="viewport" />
              <title>Moovier</title>
            </Head>
            <FlexLayout flexDirection="column" sx={{ maxWidth: '1920px', margin: '0 auto' }}>
              <Navbar />
              <FlexLayout flexDirection="column" sx={{ maxWidth: '1320px', margin: '0 auto' }}>
                <Component {...pageProps} />
              </FlexLayout>
              <ToastContainer />
            </FlexLayout>
          </SearchProvider>
        </SelectedTabFilterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
