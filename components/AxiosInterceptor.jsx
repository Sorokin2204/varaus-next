import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const axiosCustom = axios.create({
  //   baseURL: `${window.location.origin + '/api'}`,
});

const AxiosInterceptor = ({ children }) => {
  const { push, locale } = useRouter();
  useEffect(() => {
    // axios.interceptors.request.use((config) => {
    //   config.headers['locale'] = locale;
    //   return config;
    // });
    console.log('lOCALE CHANGE', locale);
    const eventHandlerFn = (config) => {
      config.headers['locale'] = locale;
      return config;
    };

    const interce = axiosCustom.interceptors.request.use(eventHandlerFn);
    return () => {
      axiosCustom.interceptors.request.eject(interce);
    };
  }, [locale]);

  return children;
};

export default AxiosInterceptor;
export { axiosCustom };
