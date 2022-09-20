import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, getCsrfToken } from 'next-auth/react';
import TextInput from '../../components/common/TextInput/TextInput';
import Loading from '../../components/common/Loading/Loading';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const defaultValues = {
    email: '',
    password: '',
  };
  const router = useRouter();
  const { status } = useSession();
  const onSubmit = async (data) => {
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    setLoading(false);
    if (res?.error) {
      setError(res.error);
    } else {
      setError(null);
    }
  };
  const userForm = useForm({ defaultValues });
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/admin/company');
    }
  }, [status]);

  return (
    <>
      {status === 'unauthenticated' ? (
        <div class="app-container app-theme-white body-tabs-shadow">
          <div class="app-container">
            <div class="h-100">
              <div class="h-100 g-0 row">
                <div
                  class="d-none d-lg-block col-lg-4"
                  style={{
                    backgroundImage: `url(/img/abstract3.jpg)`,
                    backgroundRepeat: `no-repeat`,
                    backgroundSize: 'cover',
                  }}></div>
                <div class="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-8">
                  <div class="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                    <div class="app-logo logo-src" style={{ background: 'url(/img/logo-inverse.png)', backgroundRepeat: 'no-repeat' }}></div>
                    <h4 class="mb-0">
                      <span class="d-block">Добро пожаловать,</span>
                      <span>Для авторизации введите почту и пароль.</span>
                    </h4>

                    <div class="divider row"></div>
                    <div>
                      <form class="">
                        <div class="">
                          <div class="col-md-6">
                            <div class="position-relative mb-3">
                              <TextInput name="email" form={userForm} label="Email" rules={{ required: true }} noSpace white />
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="position-relative mb-3">
                              <TextInput name="password" form={userForm} label="Пароль" rules={{ required: true }} noSpace white />
                            </div>
                          </div>
                        </div>
                        <div class="divider row"></div>
                        <div class="d-flex align-items-center">
                          <span className="text-danger">{error && error}</span>
                          <div class="ms-auto">
                            <button onClick={userForm.handleSubmit(onSubmit)} class="btn btn-primary btn-lg">
                              Войти
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading && <Loading />}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default LoginPage;
