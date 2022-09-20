import { Provider } from 'react-redux';
import MainLayout from '../components/common/MainLayout/MainLayout';
import { store } from '../redux/store';
import { PrismaClient } from '@prisma/client';
import '../styles/style.scss';
import axios from 'axios';
import { appWithTranslation } from 'next-i18next';
import { SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import AxiosInterceptor from '../components/AxiosInterceptor';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  return (
    <Provider store={store}>
      {router.pathname.startsWith('/admin') || router.pathname.startsWith('/login') ? (
        router.pathname === '/login' ? (
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        ) : (
          <SessionProvider session={session}>
            <AxiosInterceptor>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </AxiosInterceptor>
          </SessionProvider>
        )
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}
export default appWithTranslation(MyApp);
